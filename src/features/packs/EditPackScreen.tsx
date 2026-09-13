"use client";

import { useCallback } from "react";
import { ErrorState, LoadingState } from "@/components/ui";
import { useAsyncData } from "@/hooks/useAsyncData";
import { packService } from "@/services";
import { PackForm } from "./PackForm";

export function EditPackScreen({ packId }: { packId: number }) {
  const loader = useCallback(async () => {
    const page = await packService.listMyPacks({ per_page: 100 });
    const found = page.data.find((pack) => pack.id === packId);
    if (!found) throw new Error("Pack introuvable");

    return found;
  }, [packId]);

  const { data: pack, isLoading, error, reload } = useAsyncData(loader);

  if (isLoading) return <LoadingState label="Chargement du pack…" />;
  if (error || !pack) return <ErrorState error={error} onRetry={reload} />;

  return <PackForm pack={pack} />;
}
