"use client";

import { useState } from "react";
import { Button, Card, CardBody, CardHeader, ConfirmDialog, EmptyState, ErrorState, FormAlert, LoadingState, Modal, TextField } from "@/components/ui";
import { SearchableSelectField } from "@/components/ui/Combobox";
import { IconFolder, IconPencil, IconPlus, IconTrash } from "@/components/ui/icons";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useMutation } from "@/hooks/useMutation";
import { ApiError } from "@/lib/api-client";
import { folderService } from "@/services";
import type { FolderInput } from "@/services/folder-service";
import type { Folder } from "@/types/api";

/** Dossiers personnels : liste plate suffit ici, la profondeur reelle se voit au parent affiche entre parentheses. */
export function FolderList() {
  const { data: folders, isLoading, error, reload } = useAsyncData(folderService.listFolders);
  const [editing, setEditing] = useState<Folder | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Folder | null>(null);
  const deleteMutation = useMutation((id: number) => folderService.deleteFolder(id));

  if (isLoading) return <LoadingState label="Chargement des dossiers…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  return (
    <>
      <Card>
        <CardHeader
          icon={<IconFolder className="h-4 w-4" />}
          title="Mes dossiers"
          description="Organisez vos prompts crees et achetes."
          actions={
            <Button size="sm" onClick={() => setEditing("new")} icon={<IconPlus className="h-3.5 w-3.5" />}>
              Nouveau dossier
            </Button>
          }
        />
        <CardBody>
          {folders && folders.length > 0 ? (
            <ul className="flex flex-col divide-y divide-[var(--hairline)]">
              {folders.map((folder) => {
                const parent = folders.find((candidate) => candidate.id === folder.parent_id);

                return (
                  <li key={folder.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{folder.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        {folder.prompts_count ?? 0} prompt(s){parent ? ` · dans ${parent.name}` : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1.5">
                      <Button variant="secondary" size="sm" onClick={() => setEditing(folder)} icon={<IconPencil className="h-3.5 w-3.5" />} />
                      <Button variant="danger" size="sm" onClick={() => setPendingDelete(folder)} icon={<IconTrash className="h-3.5 w-3.5" />} />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState icon={<IconFolder className="h-5 w-5" />} title="Aucun dossier pour l'instant" />
          )}
        </CardBody>
      </Card>

      {editing !== null ? (
        <FolderFormModal
          folder={editing === "new" ? null : editing}
          folders={folders ?? []}
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
        title="Supprimer ce dossier ?"
        confirmLabel="Supprimer"
        isPending={deleteMutation.isPending}
        error={deleteMutation.error}
      >
        Le dossier « {pendingDelete?.name} » doit etre vide pour etre supprime.
      </ConfirmDialog>
    </>
  );
}

function FolderFormModal({
  folder,
  folders,
  onClose,
  onSaved,
}: {
  folder: Folder | null;
  folders: Folder[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(folder?.name ?? "");
  const [parentId, setParentId] = useState<string | null>(folder?.parent_id ? String(folder.parent_id) : null);

  const mutation = useMutation((input: FolderInput) =>
    folder ? folderService.updateFolder(folder.id, input) : folderService.createFolder(input),
  );

  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={folder ? "Modifier le dossier" : "Nouveau dossier"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            isLoading={mutation.isPending}
            onClick={async () => {
              const result = await mutation.run({ name: name.trim(), parent_id: parentId ? Number(parentId) : null });
              if (result) onSaved();
            }}
          >
            Enregistrer
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TextField label="Nom" placeholder="Redaction web" value={name} onChange={(event) => setName(event.target.value)} errors={fieldErrors.name} required autoFocus />
        <SearchableSelectField
          label="Dossier parent"
          options={folders.filter((candidate) => candidate.id !== folder?.id).map((candidate) => ({ value: String(candidate.id), label: candidate.name }))}
          value={parentId}
          onChange={setParentId}
          clearable
          emptyLabel="Aucun autre dossier"
        />
        {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? (
          <FormAlert>Impossible d&apos;enregistrer ce dossier.</FormAlert>
        ) : null}
      </div>
    </Modal>
  );
}
