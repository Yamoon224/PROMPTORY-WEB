"use client";

import { useCallback, useState } from "react";
import { Button, ConfirmDialog, DataTable, FormAlert, Modal, TextField } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { IconPencil, IconPlus, IconTag, IconTrash } from "@/components/ui/icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMutation } from "@/hooks/useMutation";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSort } from "@/hooks/useSort";
import { ApiError, errorMessage } from "@/lib/api-client";
import { catalogService } from "@/services";
import type { Tag } from "@/types/api";

export function TagList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { sort, setSort, sortParams } = useSort();
  const [editing, setEditing] = useState<Tag | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Tag | null>(null);

  const fetcher = useCallback(
    (page: number, perPage: number) => catalogService.listTags({ page, per_page: perPage, search: debouncedSearch || undefined, ...sortParams }),
    [debouncedSearch, sortParams],
  );

  const { items, meta, setPage, isLoading, error, reload } = usePaginatedData(fetcher);
  const deleteMutation = useMutation((id: number) => catalogService.deleteTag(id));

  const columns: Array<Column<Tag>> = [
    { key: "name", header: "Nom", sortKey: "name", cell: (tag) => <span className="font-semibold">{tag.name}</span> },
    { key: "prompts", header: "Prompts", cell: (tag) => tag.prompts_count ?? 0, hideOnMobile: true },
    {
      key: "actions",
      header: "",
      className: "text-right",
      headerClassName: "text-right",
      cell: (tag) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="secondary" size="sm" onClick={() => setEditing(tag)} icon={<IconPencil className="h-3.5 w-3.5" />} />
          <Button variant="danger" size="sm" onClick={() => setPendingDelete(tag)} icon={<IconTrash className="h-3.5 w-3.5" />} />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Tags"
        description="Referentiel partage par toute la marketplace."
        icon={<IconTag className="h-4 w-4" />}
        actions={
          <Button size="sm" onClick={() => setEditing("new")} icon={<IconPlus className="h-3.5 w-3.5" />}>
            Nouveau tag
          </Button>
        }
        columns={columns}
        rows={items}
        getRowKey={(tag) => String(tag.id)}
        isLoading={isLoading}
        error={error}
        onRetry={reload}
        emptyTitle="Aucun tag"
        search={{ value: search, onChange: setSearch }}
        sort={sort}
        onSortChange={setSort}
        meta={meta}
        onPageChange={setPage}
      />

      {editing !== null ? (
        <TagFormModal
          tag={editing === "new" ? null : editing}
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
        title="Supprimer ce tag ?"
        confirmLabel="Supprimer"
        isPending={deleteMutation.isPending}
        error={deleteMutation.error}
      >
        Un tag encore utilise par des prompts ne peut pas etre supprime.
      </ConfirmDialog>
    </>
  );
}

function TagFormModal({ tag, onClose, onSaved }: { tag: Tag | null; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(tag?.name ?? "");
  const mutation = useMutation((input: { name: string }) => (tag ? catalogService.updateTag(tag.id, input) : catalogService.createTag(input)));
  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={tag ? "Modifier le tag" : "Nouveau tag"}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            isLoading={mutation.isPending}
            onClick={async () => {
              const result = await mutation.run({ name: name.trim() });
              if (result) onSaved();
            }}
          >
            Enregistrer
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TextField label="Nom" placeholder="SEO" value={name} onChange={(event) => setName(event.target.value)} errors={fieldErrors.name} required autoFocus />
        {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? <FormAlert>{errorMessage(mutation.error)}</FormAlert> : null}
      </div>
    </Modal>
  );
}
