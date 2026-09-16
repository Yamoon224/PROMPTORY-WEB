"use client";

import { useCallback, useState } from "react";
import { Badge, Button, ConfirmDialog, DataTable, FormAlert, Modal, TextField, TextareaField } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { IconPencil, IconPlus, IconRobot, IconTrash } from "@/components/ui/icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMutation } from "@/hooks/useMutation";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSort } from "@/hooks/useSort";
import { ApiError, errorMessage } from "@/lib/api-client";
import { catalogService } from "@/services";
import type { IaModelInput } from "@/services/catalog-service";
import type { IaModel } from "@/types/api";

export function IaModelList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { sort, setSort, sortParams } = useSort();
  const [editing, setEditing] = useState<IaModel | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<IaModel | null>(null);

  const fetcher = useCallback(
    (page: number, perPage: number) => catalogService.listIaModels({ page, per_page: perPage, search: debouncedSearch || undefined, ...sortParams }),
    [debouncedSearch, sortParams],
  );

  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);
  const deleteMutation = useMutation((id: number) => catalogService.deleteIaModel(id));

  const columns: Array<Column<IaModel>> = [
    { key: "name", header: "Nom", sortKey: "name", cell: (model) => <span className="font-semibold">{model.name}</span> },
    { key: "status", header: "Statut", cell: (model) => <Badge tone={model.is_active ? "success" : "neutral"}>{model.is_active ? "Actif" : "Inactif"}</Badge> },
    { key: "prompts", header: "Prompts", cell: (model) => model.prompts_count ?? 0, hideOnMobile: true },
    {
      key: "actions",
      header: "",
      className: "text-right",
      headerClassName: "text-right",
      cell: (model) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="secondary" size="sm" onClick={() => setEditing(model)} icon={<IconPencil className="h-3.5 w-3.5" />} />
          <Button variant="danger" size="sm" onClick={() => setPendingDelete(model)} icon={<IconTrash className="h-3.5 w-3.5" />} />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Outils IA"
        description="ChatGPT, Claude, Midjourney… les cibles des prompts."
        icon={<IconRobot className="h-4 w-4" />}
        actions={
          <Button size="sm" onClick={() => setEditing("new")} icon={<IconPlus className="h-3.5 w-3.5" />}>
            Nouvel outil
          </Button>
        }
        columns={columns}
        rows={items}
        getRowKey={(model) => String(model.id)}
        isLoading={isLoading}
        error={error}
        onRetry={reload}
        emptyTitle="Aucun outil IA"
        search={{ value: search, onChange: setSearch }}
        sort={sort}
        onSortChange={setSort}
        meta={meta}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />

      {editing !== null ? (
        <IaModelFormModal
          model={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      ) : null}

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete && (await deleteMutation.run(pendingDelete.id)) !== null) {
            setPendingDelete(null);
            reload();
          }
        }}
        title="Supprimer cet outil ?"
        confirmLabel="Supprimer"
        isPending={deleteMutation.isPending}
        error={deleteMutation.error}
      >
        Un outil encore cible par des prompts ne peut pas etre supprime.
      </ConfirmDialog>
    </>
  );
}

function IaModelFormModal({ model, onClose, onSaved }: { model: IaModel | null; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(model?.name ?? "");
  const [description, setDescription] = useState(model?.description ?? "");
  const [isActive, setIsActive] = useState(model?.is_active ?? true);

  const mutation = useMutation((input: IaModelInput) => (model ? catalogService.updateIaModel(model.id, input) : catalogService.createIaModel(input)));
  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={model ? "Modifier l'outil IA" : "Nouvel outil IA"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            isLoading={mutation.isPending}
            onClick={async () => {
              const result = await mutation.run({ name: name.trim(), description: description.trim() || null, is_active: isActive });
              if (result) onSaved();
            }}
          >
            Enregistrer
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TextField label="Nom" placeholder="ChatGPT" value={name} onChange={(event) => setName(event.target.value)} errors={fieldErrors.name} required autoFocus />
        <TextareaField label="Description (facultatif)" placeholder="Modele conversationnel d'OpenAI" value={description} onChange={(event) => setDescription(event.target.value)} rows={2} />
        <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            className="h-4 w-4 rounded-2xl border-[var(--field-border)] text-brand-600 focus:ring-brand-500"
          />
          Actif (propose dans les selecteurs)
        </label>
        {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? <FormAlert>{errorMessage(mutation.error)}</FormAlert> : null}
      </div>
    </Modal>
  );
}
