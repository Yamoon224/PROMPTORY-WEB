"use client";

import { useMemo, useState } from "react";
import { Button, Card, CardBody, CardHeader, ConfirmDialog, EmptyState, ErrorState, FormAlert, LoadingState, Modal, TextField } from "@/components/ui";
import { SearchableSelectField } from "@/components/ui/Combobox";
import { IconFolder, IconPencil, IconPlus, IconTrash } from "@/components/ui/icons";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useMutation } from "@/hooks/useMutation";
import { ApiError } from "@/lib/api-client";
import { cn } from "@/lib/cn";
import { folderService } from "@/services";
import type { FolderInput } from "@/services/folder-service";
import type { Folder } from "@/types/api";

interface FolderNode {
  folder: Folder;
  depth: number;
  /** Pour chaque niveau d'ancetre au-dessus de celui-ci, la ligne verticale doit-elle se poursuivre (cet ancetre a encore un frere apres lui) ? */
  ancestorContinues: boolean[];
}

/** Aplatit les dossiers en ordre d'affichage (parent avant enfants, enfants tries par nom), avec de quoi dessiner les guides de l'arbre. */
function buildFolderTree(folders: Folder[]): FolderNode[] {
  const validIds = new Set(folders.map((folder) => folder.id));
  const childrenByParent = new Map<number | "root", Folder[]>();

  for (const folder of folders) {
    const key = folder.parent_id !== null && validIds.has(folder.parent_id) ? folder.parent_id : "root";
    const siblings = childrenByParent.get(key) ?? [];
    siblings.push(folder);
    childrenByParent.set(key, siblings);
  }
  for (const siblings of childrenByParent.values()) siblings.sort((a, b) => a.name.localeCompare(b.name));

  const nodes: FolderNode[] = [];
  function walk(parentKey: number | "root", depth: number, ancestorContinues: boolean[]) {
    const siblings = childrenByParent.get(parentKey) ?? [];
    siblings.forEach((folder, index) => {
      const isLast = index === siblings.length - 1;
      nodes.push({ folder, depth, ancestorContinues });
      walk(folder.id, depth + 1, [...ancestorContinues, !isLast]);
    });
  }
  walk("root", 0, []);
  return nodes;
}

/** Guides verticaux (type arborescence de fichiers) montrant a quel dossier parent chaque ligne appartient, sans texte repetitif. */
function FolderTreeGuides({ ancestorContinues }: { ancestorContinues: boolean[] }) {
  if (ancestorContinues.length === 0) return null;

  return (
    <span className="flex shrink-0 self-stretch">
      {ancestorContinues.map((continues, index) => {
        const isLast = index === ancestorContinues.length - 1;
        return (
          <span key={index} className="relative w-5 shrink-0 self-stretch">
            {isLast ? (
              <>
                <span className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-[var(--hairline)]" />
                <span className="absolute left-1/2 top-1/2 h-px w-1/2 bg-[var(--hairline)]" />
                {continues ? <span className="absolute left-1/2 top-1/2 h-1/2 w-px -translate-x-1/2 bg-[var(--hairline)]" /> : null}
              </>
            ) : continues ? (
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--hairline)]" />
            ) : null}
          </span>
        );
      })}
    </span>
  );
}

/** Dossiers personnels : vue en arbre avec guides de hierarchie, pour voir d'un coup d'oeil quel dossier contient quoi. */
export function FolderList() {
  const { data: folders, isLoading, error, reload } = useAsyncData(folderService.listFolders);
  const [editing, setEditing] = useState<Folder | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Folder | null>(null);
  const deleteMutation = useMutation((id: number) => folderService.deleteFolder(id));
  const tree = useMemo(() => buildFolderTree(folders ?? []), [folders]);

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
              {tree.map(({ folder, depth, ancestorContinues }) => (
                <li key={folder.id} className="flex items-stretch justify-between gap-3 py-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <FolderTreeGuides ancestorContinues={ancestorContinues} />
                    <IconFolder className={cn("h-4 w-4 shrink-0", depth === 0 ? "text-stone-500" : "text-stone-400")} />
                    <div className="min-w-0 py-2">
                      <p className="truncate text-sm font-semibold">{folder.name}</p>
                      <p className="text-xs text-[var(--muted)]">{folder.prompts_count ?? 0} prompt(s)</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button variant="secondary" size="sm" onClick={() => setEditing(folder)} icon={<IconPencil className="h-3.5 w-3.5" />} />
                    <Button variant="danger" size="sm" onClick={() => setPendingDelete(folder)} icon={<IconTrash className="h-3.5 w-3.5" />} />
                  </div>
                </li>
              ))}
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
      size="lg"
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
