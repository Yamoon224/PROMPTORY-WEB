"use client";

import { useCallback, useState } from "react";
import { Button, DataTable, Modal, TextareaField } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { IconCheckCircle, IconClose } from "@/components/ui/icons";
import { useMutation } from "@/hooks/useMutation";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { formatMoney } from "@/lib/format";
import { packService } from "@/services";
import type { Pack } from "@/types/api";

/** File d'attente de moderation des packs. */
export function PackModerationQueue() {
  const fetcher = useCallback((page: number, perPage: number) => packService.listPendingPacks({ page, per_page: perPage }), []);
  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const approveMutation = useMutation((id: number) => packService.approvePack(id));
  const [rejecting, setRejecting] = useState<Pack | null>(null);

  const columns: Array<Column<Pack>> = [
    { key: "title", header: "Pack", cell: (pack) => <span className="font-semibold">{pack.title}</span> },
    { key: "creator", header: "Createur", cell: (pack) => pack.creator?.name ?? "—" },
    { key: "price", header: "Prix", cell: (pack) => formatMoney(pack.price), hideOnMobile: true },
    { key: "prompts", header: "Prompts", cell: (pack) => pack.prompts_count ?? 0, hideOnMobile: true },
    {
      key: "actions",
      header: "",
      className: "text-right",
      headerClassName: "text-right",
      cell: (pack) => (
        <div className="flex justify-end gap-1.5">
          <Button
            size="sm"
            isLoading={approveMutation.isPending}
            onClick={async () => {
              if (await approveMutation.run(pack.id)) reload();
            }}
            icon={<IconCheckCircle className="h-3.5 w-3.5" />}
          >
            Approuver
          </Button>
          <Button variant="danger" size="sm" onClick={() => setRejecting(pack)} icon={<IconClose className="h-3.5 w-3.5" />}>
            Rejeter
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Packs a valider"
        description="Approuvez ou rejetez les packs soumis par les createurs."
        columns={columns}
        rows={items}
        getRowKey={(pack) => String(pack.id)}
        isLoading={isLoading}
        error={error}
        onRetry={reload}
        emptyTitle="Aucun pack en attente de validation"
        meta={meta}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />

      {rejecting ? (
        <RejectPackModal
          pack={rejecting}
          onClose={() => setRejecting(null)}
          onRejected={() => {
            setRejecting(null);
            reload();
          }}
        />
      ) : null}
    </>
  );
}

function RejectPackModal({ pack, onClose, onRejected }: { pack: Pack; onClose: () => void; onRejected: () => void }) {
  const [reason, setReason] = useState("");
  const mutation = useMutation((input: { id: number; reason: string }) => packService.rejectPack(input.id, input.reason));

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Rejeter ce pack"
      description={`« ${pack.title} » sera archive pour que son createur puisse le corriger.`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={mutation.isPending}
            onClick={async () => {
              if (reason.trim() && (await mutation.run({ id: pack.id, reason: reason.trim() }))) onRejected();
            }}
          >
            Confirmer le rejet
          </Button>
        </>
      }
    >
      <TextareaField label="Motif du rejet" placeholder="Expliquez ce qui doit etre corrige" value={reason} onChange={(event) => setReason(event.target.value)} rows={3} required autoFocus />
    </Modal>
  );
}
