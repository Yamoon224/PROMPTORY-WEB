"use client";

import { useCallback, useState } from "react";
import { Badge, Button, ConfirmDialog, DataTable, LinkButton } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { ToolbarSelect } from "@/components/ui/Toolbar";
import { IconArchive, IconCheckCircle, IconPencil, IconPlus, IconTrash } from "@/components/ui/icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMutation } from "@/hooks/useMutation";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSort } from "@/hooks/useSort";
import { formatMoney } from "@/lib/format";
import { PROMPT_STATUS_LABEL, PROMPT_STATUS_TONE } from "@/lib/labels";
import { promptService } from "@/services";
import type { Prompt } from "@/types/api";

const STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "Tous les statuts" },
  { value: "draft", label: "Brouillon" },
  { value: "pending_validation", label: "En attente de validation" },
  { value: "published", label: "Publie" },
  { value: "archived", label: "Archive" },
];

export function PromptList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [status, setStatus] = useState("");
  const { sort, setSort, sortParams } = useSort();
  const [pendingDelete, setPendingDelete] = useState<Prompt | null>(null);

  const fetcher = useCallback(
    (page: number, perPage: number) =>
      promptService.listMyPrompts({ page, per_page: perPage, search: debouncedSearch || undefined, status: status || undefined, ...sortParams }),
    [debouncedSearch, status, sortParams],
  );

  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const submitMutation = useMutation((id: number) => promptService.submitPrompt(id));
  const archiveMutation = useMutation((id: number) => promptService.archivePrompt(id));
  const unarchiveMutation = useMutation((id: number) => promptService.unarchivePrompt(id));
  const deleteMutation = useMutation((id: number) => promptService.deletePrompt(id));

  async function runAndReload(run: (id: number) => Promise<unknown>, id: number) {
    if (await run(id)) reload();
  }

  const columns: Array<Column<Prompt>> = [
    {
      key: "title",
      header: "Prompt",
      sortKey: "title",
      cell: (prompt) => (
        <div className="min-w-0">
          <p className="truncate font-semibold">{prompt.title}</p>
          {prompt.status === "draft" && prompt.rejection_reason ? (
            <p className="mt-0.5 truncate text-xs text-rose-600 dark:text-rose-400">Rejete : {prompt.rejection_reason}</p>
          ) : null}
        </div>
      ),
    },
    {
      key: "status",
      header: "Statut",
      cell: (prompt) => <Badge tone={PROMPT_STATUS_TONE[prompt.status]}>{PROMPT_STATUS_LABEL[prompt.status]}</Badge>,
    },
    {
      key: "price",
      header: "Prix",
      sortKey: "price",
      cell: (prompt) => (prompt.is_free ? "Gratuit" : formatMoney(prompt.price)),
      hideOnMobile: true,
    },
    {
      key: "stats",
      header: "Vues / telechargements",
      cell: (prompt) => `${prompt.views_count} / ${prompt.downloads_count}`,
      hideOnMobile: true,
    },
    {
      key: "actions",
      header: "",
      cell: (prompt) => (
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {prompt.status === "draft" ? (
            <>
              <LinkButton href={`/espace/mes-prompts/${prompt.id}/modifier`} variant="secondary" size="sm" icon={<IconPencil className="h-3.5 w-3.5" />}>
                Modifier
              </LinkButton>
              <Button
                size="sm"
                isLoading={submitMutation.isPending}
                onClick={() => runAndReload((id) => submitMutation.run(id), prompt.id)}
                icon={<IconCheckCircle className="h-3.5 w-3.5" />}
              >
                Soumettre
              </Button>
            </>
          ) : null}
          {prompt.status === "published" ? (
            <Button
              variant="secondary"
              size="sm"
              isLoading={archiveMutation.isPending}
              onClick={() => runAndReload((id) => archiveMutation.run(id), prompt.id)}
              icon={<IconArchive className="h-3.5 w-3.5" />}
            >
              Archiver
            </Button>
          ) : null}
          {prompt.status === "archived" ? (
            <Button
              variant="secondary"
              size="sm"
              isLoading={unarchiveMutation.isPending}
              onClick={() => runAndReload((id) => unarchiveMutation.run(id), prompt.id)}
            >
              Republier
            </Button>
          ) : null}
          {prompt.status === "draft" ? (
            <Button variant="danger" size="sm" onClick={() => setPendingDelete(prompt)} icon={<IconTrash className="h-3.5 w-3.5" />} />
          ) : null}
        </div>
      ),
      className: "text-right",
      headerClassName: "text-right",
    },
  ];

  return (
    <>
      <DataTable
        title="Mes prompts"
        description="Creation, edition et suivi du cycle de vie de vos prompts."
        actions={
          <LinkButton href="/espace/mes-prompts/nouveau" icon={<IconPlus className="h-4 w-4" />}>
            Nouveau prompt
          </LinkButton>
        }
        columns={columns}
        rows={items}
        getRowKey={(prompt) => String(prompt.id)}
        isLoading={isLoading}
        error={error}
        onRetry={reload}
        emptyTitle="Vous n'avez pas encore cree de prompt"
        emptyDescription="Publiez votre premier prompt pour commencer a le vendre ou le partager."
        search={{ value: search, onChange: setSearch, placeholder: "Rechercher un prompt…" }}
        toolbar={
          <ToolbarSelect label="Statut" value={status} onChange={(event) => setStatus(event.target.value)} className="w-52">
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </ToolbarSelect>
        }
        sort={sort}
        onSortChange={setSort}
        meta={meta}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
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
        title="Supprimer ce prompt ?"
        confirmLabel="Supprimer"
        isPending={deleteMutation.isPending}
        error={deleteMutation.error}
      >
        Le prompt « {pendingDelete?.title} » sera definitivement supprime.
      </ConfirmDialog>
    </>
  );
}
