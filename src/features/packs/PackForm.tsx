"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, FormAlert, NumberField, TextField, TextareaField } from "@/components/ui";
import { MultiSelectField } from "@/components/ui/Combobox";
import { IconPackage } from "@/components/ui/icons";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useMutation } from "@/hooks/useMutation";
import { ApiError, errorMessage } from "@/lib/api-client";
import { promptService, packService } from "@/services";
import type { Pack, PackInput } from "@/types/api";

/** Formulaire de creation / edition d'un pack : titre, prix flottant et selection multiple de prompts publies. */
export function PackForm({ pack }: { pack?: Pack }) {
  const router = useRouter();
  const isEditing = Boolean(pack);

  const [title, setTitle] = useState(pack?.title ?? "");
  const [description, setDescription] = useState(pack?.description ?? "");
  const [price, setPrice] = useState<number | "">(pack?.price ?? 0);
  const [promptIds, setPromptIds] = useState<string[]>(pack?.prompts?.map((prompt) => String(prompt.id)) ?? []);

  const loadOwnPublishedPrompts = useCallback(async () => (await promptService.listMyPrompts({ status: "published", per_page: 100 })).data, []);
  const { data: myPrompts } = useAsyncData(loadOwnPublishedPrompts);

  const mutation = useMutation((input: PackInput) => (isEditing ? packService.updatePack(pack!.id, input) : packService.createPack(input)));

  async function submit(event: FormEvent) {
    event.preventDefault();

    const input: PackInput = {
      title: title.trim(),
      description: description.trim() || null,
      price: price === "" ? 0 : price,
      prompts: promptIds.map(Number),
    };

    const result = await mutation.run(input);
    if (result) router.push("/espace/mes-packs");
  }

  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  return (
    <form onSubmit={submit} noValidate>
      <Card>
        <CardHeader
          icon={<IconPackage className="h-4 w-4" />}
          title={isEditing ? "Modifier le pack" : "Nouveau pack"}
          description="Un pack entre directement en attente de validation : il n'a pas d'etat brouillon."
        />
        <CardBody className="flex flex-col gap-4">
          <TextField label="Titre" placeholder="Kit complet redaction e-commerce" value={title} onChange={(event) => setTitle(event.target.value)} errors={fieldErrors.title} required autoFocus />
          <TextareaField label="Description (facultatif)" placeholder="Ce que contient ce pack" value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />
          <NumberField label="Prix (EUR)" value={price} onChange={setPrice} errors={fieldErrors.price} />
          <MultiSelectField
            label="Prompts inclus"
            options={(myPrompts ?? []).map((prompt) => ({ value: String(prompt.id), label: prompt.title }))}
            values={promptIds}
            onChange={setPromptIds}
            emptyLabel="Publiez d'abord au moins un prompt"
            required
          />
          {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? <FormAlert>{errorMessage(mutation.error)}</FormAlert> : null}
        </CardBody>
        <CardFooter>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" isLoading={mutation.isPending}>
            {isEditing ? "Enregistrer" : "Creer le pack"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
