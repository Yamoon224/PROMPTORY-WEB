"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IconSearch } from "@/components/ui/icons";

/**
 * Recherche principale de la marketplace : un seul champ, large et centre,
 * qui renvoie vers `/?q=...#browser` - lu par `PromptBrowser`. Repris de la
 * grille de resultats plutot que redondant avec elle : c'est la porte
 * d'entree, la grille garde ses filtres avances (outil IA, tag, tri).
 */
export function MarketplaceSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get("q") ?? "");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/?q=${encodeURIComponent(query)}#browser` : "/#browser");
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-full border-4 border-brand-500/30 bg-[var(--surface)] p-2 shadow-card dark:border-brand-400/30"
    >
      <IconSearch className="ml-2.5 h-5 w-5 shrink-0 text-stone-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Rechercher un prompt, une categorie…"
        aria-label="Rechercher un prompt"
        className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-stone-900 outline-none placeholder:text-[var(--field-placeholder)] sm:text-base dark:text-stone-50"
      />
      <button
        type="submit"
        className="grad-brand inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:grad-brand-hover"
      >
        <IconSearch className="h-4 w-4 sm:hidden" />
        <span className="hidden sm:inline">Rechercher</span>
      </button>
    </form>
  );
}
