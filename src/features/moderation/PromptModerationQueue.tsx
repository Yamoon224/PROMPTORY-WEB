"use client";

import { useCallback, useState } from "react";
import { Button, DataTable, Modal, TextareaField } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { IconCheckCircle, IconClose } from "@/components/ui/icons";
import { useMutation } from "@/hooks/useMutation";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { formatMoney } from "@/lib/format";
import { promptService } from "@/services";
import type { Prompt } from "@/types/api";

/** File d'attente de moderation des prompts soumis a validation. */
export function PromptModerationQueue() {
  const fetcher = useCallback((page: number, perPage: number) => promptService.listPendingPrompts({ page, per_page: perPage }), []);
  const { items, meta, setPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const approveMutation = useMutation((id: number) => promptService.approvePrompt(id));
  const [rejecting, setRejecting] = useState<Prompt | null>(null);

  const columns: Array<Column<Prompt>> = [
    { key: "title", header: "Prompt", cell: (prompt) => <span className="font-semibold">{prompt.title}</span> },
    { key: "creator", header: "Createur", cell: (prompt) => prompt.creator?.name ?? "—" },
    { key: "price", header: "Prix", cell: (prompt) => (prompt.is_free ? "Gratuit" : formatMoney(prompt.price)), hideOnMobile: true },
    {
      key: "content",
      header: "Contenu",
      cell: (prompt) => <span className="line-clamp-2 max-w-md text-xs text-[var(--muted)]">{prompt.content}</span>,
      hideOnMobile: true,
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      headerClassName: "text-right",
      cell: (prompt) => (
        <div className="flex justify-end gap-1.5">
          <Button
            size="sm"
            isLoading={approveMutation.isPending}
            onClick={async () => {
              if (await approveMutation.run(prompt.id)) reload();
            }}
            icon={<IconCheckCircle className="h-3.5 w-3.5" />}
          >
            Approuver
          </Button>
          <Button variant="danger" size="sm" onClick={() => setRejecting(prompt)} icon={<IconClose className="h-3.5 w-3.5" />}>
            Rejeter
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Prompts a valider"
        description="Approuvez ou rejetez les prompts soumis par les createurs."
        columns={columns}
        rows={items}
        getRowKey={(prompt) => String(prompt.id)}
        isLoading={isLoading}
        error={error}
        onRetry={reload}
        emptyTitle="Aucun prompt en attente de validation"
        meta={meta}
        onPageChange={setPage}
      />

      {rejecting ? (
        <RejectPromptModal
          prompt={rejecting}
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

function RejectPromptModal({ prompt, onClose, onRejected }: { prompt: Prompt; onClose: () => void; onRejected: () => void }) {
  const [reason, setReason] = useState("");
  const mutation = useMutation((input: { id: number; reason: string }) => promptService.rejectPrompt(input.id, input.reason));

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Rejeter ce prompt"
      description={`« ${prompt.title} » repassera en brouillon pour que son createur puisse le corriger.`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={mutation.isPending}
            onClick={async () => {
              if (reason.trim() && (await mutation.run({ id: prompt.id, reason: reason.trim() }))) onRejected();
            }}
          >
            Confirmer le rejet
          </Button>
        </>
      }
    >
      <TextareaField
        label="Motif du rejet"
        placeholder="Expliquez ce qui doit etre corrige"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        rows={3}
        required
        autoFocus
      />
    </Modal>
  );
}
