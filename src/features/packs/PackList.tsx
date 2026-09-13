"use client";

import { useCallback, useState } from "react";
import { Badge, Button, ConfirmDialog, DataTable, LinkButton } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { ToolbarSelect } from "@/components/ui/Toolbar";
import { IconArchive, IconPencil, IconPlus, IconTrash } from "@/components/ui/icons";
import { useMutation } from "@/hooks/useMutation";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { formatMoney } from "@/lib/format";
import { PACK_STATUS_LABEL, PACK_STATUS_TONE } from "@/lib/labels";
import { packService } from "@/services";
import type { Pack } from "@/types/api";

const STATUS_OPTIONS = [
  { value: "", label: "Tous les statuts" },
  { value: "pending_validation", label: "En attente de validation" },
  { value: "published", label: "Publie" },
  { value: "archived", label: "Archive" },
];

export function PackList() {
  const [status, setStatus] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Pack | null>(null);

  const fetcher = useCallback((page: number, perPage: number) => packService.listMyPacks({ page, per_page: perPage, status: status || undefined }), [status]);
  const { items, meta, setPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const archiveMutation = useMutation((id: number) => packService.archivePack(id));
  const resubmitMutation = useMutation((id: number) => packService.resubmitPack(id));
  const deleteMutation = useMutation((id: number) => packService.deletePack(id));

  const columns: Array<Column<Pack>> = [
    {
      key: "title",
      header: "Pack",
      cell: (pack) => (
        <div className="min-w-0">
          <p className="truncate font-semibold">{pack.title}</p>
          {pack.status === "archived" && pack.rejection_reason ? (
            <p className="mt-0.5 truncate text-xs text-rose-600 dark:text-rose-400">Rejete : {pack.rejection_reason}</p>
          ) : null}
        </div>
      ),
    },
    { key: "status", header: "Statut", cell: (pack) => <Badge tone={PACK_STATUS_TONE[pack.status]}>{PACK_STATUS_LABEL[pack.status]}</Badge> },
    { key: "price", header: "Prix", cell: (pack) => formatMoney(pack.price), hideOnMobile: true },
    { key: "prompts", header: "Prompts", cell: (pack) => pack.prompts_count ?? 0, hideOnMobile: true },
    {
      key: "actions",
      header: "",
      className: "text-right",
      headerClassName: "text-right",
      cell: (pack) => (
        <div className="flex flex-wrap justify-end gap-1.5">
          {pack.status !== "published" ? (
            <LinkButton href={`/espace/mes-packs/${pack.id}/modifier`} variant="secondary" size="sm" icon={<IconPencil className="h-3.5 w-3.5" />} />
          ) : null}
          {pack.status === "published" ? (
            <Button
              variant="secondary"
              size="sm"
              isLoading={archiveMutation.isPending}
              onClick={async () => {
                if (await archiveMutation.run(pack.id)) reload();
              }}
              icon={<IconArchive className="h-3.5 w-3.5" />}
            >
              Archiver
            </Button>
          ) : null}
          {pack.status === "archived" ? (
            <Button
              size="sm"
              isLoading={resubmitMutation.isPending}
              onClick={async () => {
                if (await resubmitMutation.run(pack.id)) reload();
              }}
            >
              Soumettre a nouveau
            </Button>
          ) : null}
          <Button variant="danger" size="sm" onClick={() => setPendingDelete(pack)} icon={<IconTrash className="h-3.5 w-3.5" />} />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Mes packs"
        description="Lots de prompts groupes a prix unique."
        actions={
          <LinkButton href="/espace/mes-packs/nouveau" icon={<IconPlus className="h-4 w-4" />}>
            Nouveau pack
          </LinkButton>
        }
        columns={columns}
        rows={items}
        getRowKey={(pack) => String(pack.id)}
        isLoading={isLoading}
        error={error}
        onRetry={reload}
        emptyTitle="Vous n'avez pas encore cree de pack"
        toolbar={
          <ToolbarSelect label="Statut" value={status} onChange={(event) => setStatus(event.target.value)} className="w-52">
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </ToolbarSelect>
        }
        meta={meta}
        onPageChange={setPage}
      />

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete && (await deleteMutation.run(pendingDelete.id)) !== null) {
            setPendingDelete(null);
            reload();
          }
        }}
        title="Supprimer ce pack ?"
        confirmLabel="Supprimer"
        isPending={deleteMutation.isPending}
        error={deleteMutation.error}
      >
        Le pack « {pendingDelete?.title} » sera definitivement supprime.
      </ConfirmDialog>
    </>
  );
}
