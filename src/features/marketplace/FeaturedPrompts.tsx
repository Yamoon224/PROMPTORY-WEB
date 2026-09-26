"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui";
import { IconArrowRight } from "@/components/ui/icons";
import { useAsyncData } from "@/hooks/useAsyncData";
import { promptService } from "@/services";
import { PromptCard } from "./PromptCard";

/**
 * Mini-grille des prompts les plus telecharges, au-dessus de la grille
 * complete filtrable - une porte d'entree rapide, a la maniere des sections
 * "Trending" d'une marketplace, sans dupliquer les filtres du dessous.
 */
export function FeaturedPrompts() {
  const loader = useCallback(
    () => promptService.browsePrompts({ per_page: 4, sort: "downloads", direction: "desc" }),
    [],
  );
  const { data, isLoading, error } = useAsyncData(loader);

  if (error || (!isLoading && (data?.data.length ?? 0) === 0)) return null;

  return (
    <section className="pb-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Prompts populaires</h2>
        </div>
        <Link
          href="/#browser"
          className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          Voir tout
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-56" />)
          : data?.data.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} />)}
      </div>
    </section>
  );
}
