"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, FormAlert, NumberField, TextField, TextareaField } from "@/components/ui";
import { MultiSelectField, SearchableSelectField } from "@/components/ui/Combobox";
import { IconPrompt } from "@/components/ui/icons";
import { useMutation } from "@/hooks/useMutation";
import { useCategoryOptions, useFolderOptions, useIaModelOptions, useTagOptions } from "@/hooks/useOptions";
import { ApiError, errorMessage } from "@/lib/api-client";
import { promptService } from "@/services";
import type { Prompt, PromptInput } from "@/types/api";

/**
 * Formulaire de creation / edition d'un prompt.
 *
 * Le prix est un champ a virgule flottante (`NumberField`, pas d'entier
 * arrondi) : un prompt se vend au centime pres, comme n'importe quel article
 * de marketplace. Categories, tags et outils IA sont des selecteurs multiples
 * avec recherche : un referentiel de plusieurs dizaines d'entrees resterait
 * illisible dans une simple liste deroulante.
 */
export function PromptForm({ prompt }: { prompt?: Prompt }) {
  const router = useRouter();
  const isEditing = Boolean(prompt);

  const [title, setTitle] = useState(prompt?.title ?? "");
  const [content, setContent] = useState(prompt?.content ?? "");
  const [price, setPrice] = useState<number | "">(prompt?.price ?? 0);
  const [folderId, setFolderId] = useState<string | null>(prompt?.folder_id ? String(prompt.folder_id) : null);
  const [tagIds, setTagIds] = useState<string[]>(prompt?.tags?.map((tag) => String(tag.id)) ?? []);
  const [categoryIds, setCategoryIds] = useState<string[]>(prompt?.categories?.map((category) => String(category.id)) ?? []);
  const [iaModelIds, setIaModelIds] = useState<string[]>(prompt?.ia_models?.map((model) => String(model.id)) ?? []);

  const folders = useFolderOptions();
  const categories = useCategoryOptions();
  const tags = useTagOptions();
  const iaModels = useIaModelOptions();

  const mutation = useMutation((input: PromptInput) =>
    isEditing ? promptService.updatePrompt(prompt!.id, input) : promptService.createPrompt(input),
  );

  async function submit(event: FormEvent) {
    event.preventDefault();

    const input: PromptInput = {
      title: title.trim(),
      content,
      price: price === "" ? 0 : price,
      folder_id: folderId ? Number(folderId) : null,
      tags: tagIds.map(Number),
      categories: categoryIds.map(Number),
      ia_models: iaModelIds.map(Number),
    };

    const result = await mutation.run(input);
    if (result) router.push("/espace/mes-prompts");
  }

  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};
  const isLocked = isEditing && prompt!.status !== "draft";

  return (
    <form onSubmit={submit} noValidate>
      <Card>
        <CardHeader
          icon={<IconPrompt className="h-4 w-4" />}
          title={isEditing ? "Modifier le prompt" : "Nouveau prompt"}
          description="Un prompt cree ici reste en brouillon jusqu'a sa soumission a la moderation."
        />
        <CardBody className="flex flex-col gap-4">
          {isLocked ? (
            <FormAlert tone="warning">
              Ce prompt n&apos;est plus modifiable (statut actuel). Archivez-le pour pouvoir le modifier a nouveau.
            </FormAlert>
          ) : null}

          <TextField
            label="Titre"
            placeholder="Redacteur de fiches produit e-commerce"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            errors={fieldErrors.title}
            disabled={isLocked}
            required
            autoFocus
          />

          <TextareaField
            label="Contenu du prompt"
            placeholder="Tu es un redacteur senior. Ecris..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            errors={fieldErrors.content}
            disabled={isLocked}
            rows={8}
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Prix (EUR)"
              value={price}
              onChange={setPrice}
              errors={fieldErrors.price}
              disabled={isLocked}
              hint="0 pour un prompt gratuit"
            />
            <SearchableSelectField
              label="Dossier"
              options={folders.map((folder) => ({ value: String(folder.id), label: folder.name }))}
              value={folderId}
              onChange={setFolderId}
              disabled={isLocked}
              clearable
              emptyLabel="Aucun dossier - creez-en un depuis « Mes dossiers »"
            />
          </div>

          <MultiSelectField
            label="Categories"
            options={categories.map((category) => ({ value: String(category.id), label: category.name }))}
            values={categoryIds}
            onChange={setCategoryIds}
            disabled={isLocked}
          />

          <MultiSelectField
            label="Tags"
            options={tags.map((tag) => ({ value: String(tag.id), label: tag.name }))}
            values={tagIds}
            onChange={setTagIds}
            disabled={isLocked}
          />

          <MultiSelectField
            label="Outils IA cibles"
            options={iaModels.map((model) => ({ value: String(model.id), label: model.name }))}
            values={iaModelIds}
            onChange={setIaModelIds}
            disabled={isLocked}
          />

          {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? (
            <FormAlert>{errorMessage(mutation.error)}</FormAlert>
          ) : null}
        </CardBody>
        <CardFooter>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" isLoading={mutation.isPending} disabled={isLocked}>
            {isEditing ? "Enregistrer" : "Creer le prompt"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
