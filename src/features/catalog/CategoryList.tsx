"use client";

import { useCallback, useState } from "react";
import { Button, ConfirmDialog, DataTable, FormAlert, Modal, TextField, TextareaField } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { SearchableSelectField } from "@/components/ui/Combobox";
import { IconGrid, IconPencil, IconPlus, IconTrash } from "@/components/ui/icons";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMutation } from "@/hooks/useMutation";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSort } from "@/hooks/useSort";
import { ApiError, errorMessage } from "@/lib/api-client";
import { catalogService } from "@/services";
import type { CategoryInput } from "@/services/catalog-service";
import type { Category } from "@/types/api";

/** Referentiel des categories : hierarchie a un niveau via un parent optionnel. */
export function CategoryList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { sort, setSort, sortParams } = useSort();
  const [editing, setEditing] = useState<Category | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null);

  const fetcher = useCallback(
    (page: number, perPage: number) => catalogService.listCategories({ page, per_page: perPage, search: debouncedSearch || undefined, ...sortParams }),
    [debouncedSearch, sortParams],
  );

  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);
  const { data: allCategories } = useAsyncData(catalogService.allCategories);
  const deleteMutation = useMutation((id: number) => catalogService.deleteCategory(id));

  const columns: Array<Column<Category>> = [
    { key: "name", header: "Nom", sortKey: "name", cell: (category) => <span className="font-semibold">{category.name}</span> },
    { key: "parent", header: "Parent", cell: (category) => category.parent?.name ?? "—", hideOnMobile: true },
    { key: "prompts", header: "Prompts", cell: (category) => category.prompts_count ?? 0, hideOnMobile: true },
    {
      key: "actions",
      header: "",
      className: "text-right",
      headerClassName: "text-right",
      cell: (category) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="secondary" size="sm" onClick={() => setEditing(category)} icon={<IconPencil className="h-3.5 w-3.5" />} />
          <Button variant="danger" size="sm" onClick={() => setPendingDelete(category)} icon={<IconTrash className="h-3.5 w-3.5" />} />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Categories"
        description="Referentiel partage par toute la marketplace."
        icon={<IconGrid className="h-4 w-4" />}
        actions={
          <Button size="sm" onClick={() => setEditing("new")} icon={<IconPlus className="h-3.5 w-3.5" />}>
            Nouvelle categorie
          </Button>
        }
        columns={columns}
        rows={items}
        getRowKey={(category) => String(category.id)}
        isLoading={isLoading}
        error={error}
        onRetry={reload}
        emptyTitle="Aucune categorie"
        search={{ value: search, onChange: setSearch }}
        sort={sort}
        onSortChange={setSort}
        meta={meta}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />

      {editing !== null ? (
        <CategoryFormModal
          category={editing === "new" ? null : editing}
          categories={allCategories ?? []}
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
        title="Supprimer cette categorie ?"
        confirmLabel="Supprimer"
        isPending={deleteMutation.isPending}
        error={deleteMutation.error}
      >
        Une categorie encore utilisee par des prompts ne peut pas etre supprimee.
      </ConfirmDialog>
    </>
  );
}

function CategoryFormModal({
  category,
  categories,
  onClose,
  onSaved,
}: {
  category: Category | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [parentId, setParentId] = useState<string | null>(category?.parent_id ? String(category.parent_id) : null);

  const mutation = useMutation((input: CategoryInput) =>
    category ? catalogService.updateCategory(category.id, input) : catalogService.createCategory(input),
  );

  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={category ? "Modifier la categorie" : "Nouvelle categorie"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            isLoading={mutation.isPending}
            onClick={async () => {
              const result = await mutation.run({ name: name.trim(), description: description.trim() || null, parent_id: parentId ? Number(parentId) : null });
              if (result) onSaved();
            }}
          >
            Enregistrer
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TextField label="Nom" placeholder="Marketing" value={name} onChange={(event) => setName(event.target.value)} errors={fieldErrors.name} required autoFocus />
        <TextareaField label="Description (facultatif)" placeholder="Quelques mots sur cette categorie" value={description} onChange={(event) => setDescription(event.target.value)} rows={2} />
        <SearchableSelectField
          label="Categorie parente"
          options={categories.filter((candidate) => candidate.id !== category?.id).map((candidate) => ({ value: String(candidate.id), label: candidate.name }))}
          value={parentId}
          onChange={setParentId}
          clearable
          emptyLabel="Aucune autre categorie"
        />
        {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? (
          <FormAlert>{errorMessage(mutation.error)}</FormAlert>
        ) : null}
      </div>
    </Modal>
  );
}
