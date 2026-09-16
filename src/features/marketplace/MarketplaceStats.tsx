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
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur"
        >
          {isLoading ? (
            <span aria-hidden="true" className="block h-4 w-6 animate-pulse rounded-full bg-white/30" />
          ) : (
            <span className="tabular-nums">{item.value}</span>
          )}
          {item.label}
        </span>
      ))}
    </div>
  );
}
