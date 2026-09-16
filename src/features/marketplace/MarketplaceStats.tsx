"use client";

import { useCallback } from "react";
import { useAsyncData } from "@/hooks/useAsyncData";
import { catalogService, packService, promptService } from "@/services";

/**
 * Preuve sociale honnete : uniquement des totaux reels, lus depuis l'API
 * (meme requetes bon marche que `DashboardOverview`, `per_page: 1` pour ne
 * lire que `meta.total`). Jamais de chiffre invente.
 */
export function MarketplaceStats() {
  const loader = useCallback(async () => {
    const [prompts, packs, categories] = await Promise.all([
      promptService.browsePrompts({ per_page: 1 }),
      packService.browsePacks({ per_page: 1 }),
      catalogService.allCategories(),
    ]);

    return {
      prompts: prompts.meta.total,
      packs: packs.meta.total,
      categories: categories.length,
    };
  }, []);

  const { data, isLoading } = useAsyncData(loader);

  const items = [
    { label: "prompts", value: data?.prompts },
    { label: "packs", value: data?.packs },
    { label: "categories", value: data?.categories },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 dark:bg-brand-900/40 dark:text-brand-300 dark:ring-brand-800"
        >
          {isLoading ? (
            <span aria-hidden="true" className="block h-4 w-6 animate-pulse rounded-full bg-brand-200 dark:bg-brand-800" />
          ) : (
            <span className="tabular-nums">{item.value}</span>
          )}
          {item.label}
        </span>
      ))}
    </div>
  );
}
