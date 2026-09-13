"use client";

import { useCallback } from "react";
import { ErrorState, LoadingState } from "@/components/ui";
import { useAsyncData } from "@/hooks/useAsyncData";
import { promptService } from "@/services";
import { PromptForm } from "./PromptForm";

/**
 * Charge un prompt par identifiant pour l'ecran d'edition.
 *
 * Passe par `listMyPrompts` filtre plutot que par la fiche publique : celle-ci
 * masque le contenu quand elle est visitee par quelqu'un d'autre que le
 * createur, exactement ce que l'ecran d'edition ne peut pas se permettre.
 */
export function EditPromptScreen({ promptId }: { promptId: number }) {
  const loader = useCallback(async () => {
    const page = await promptService.listMyPrompts({ per_page: 100 });
    const found = page.data.find((prompt) => prompt.id === promptId);
    if (!found) throw new Error("Prompt introuvable");

    return found;
  }, [promptId]);

  const { data: prompt, isLoading, error, reload } = useAsyncData(loader);

  if (isLoading) return <LoadingState label="Chargement du prompt…" />;
  if (error || !prompt) return <ErrorState error={error} onRetry={reload} />;

  return <PromptForm prompt={prompt} />;
}
