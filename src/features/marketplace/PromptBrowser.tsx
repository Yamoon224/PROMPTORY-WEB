"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { EmptyState, ErrorState, LoadingState, Pagination, SearchInput } from "@/components/ui";
import { SearchableSelectField } from "@/components/ui/Combobox";
import { IconSearch } from "@/components/ui/icons";
import { ToolbarSelect } from "@/components/ui/Toolbar";
import { useCategoryOptions, useIaModelOptions, useTagOptions } from "@/hooks/useOptions";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { promptService } from "@/services";
import { PromptCard } from "./PromptCard";

const SORT_OPTIONS = [
  { value: "created_at", label: "Plus recents" },
  { value: "price", label: "Prix croissant" },
  { value: "views", label: "Plus consultes" },
  { value: "downloads", label: "Plus telecharges" },
];

/**
 * Vitrine publique de la marketplace : recherche, filtres par referentiel et
 * grille de resultats. Les filtres sont geres ici plutot que par la page pour
 * que la page ne fasse que le necessaire (metadonnees, mise en page).
 */
export function PromptBrowser() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("q");
  const urlCategory = searchParams.get("category");

  const [search, setSearch] = useState(urlSearch ?? "");
  const debouncedSearch = useDebouncedValue(search);
  const [category, setCategory] = useState<string | null>(urlCategory);
  const [tag, setTag] = useState<string | null>(null);
  const [iaModel, setIaModel] = useState<string | null>(null);
  const [sort, setSort] = useState("created_at");
  const [freeOnly, setFreeOnly] = useState(false);

  // La barre de recherche et les puces de categorie pilotent cette grille
  // depuis l'exterieur via `?q=`/`?category=`. Un second clic ne remonte pas
  // ce composant (meme route), donc l'etat initial seul ne suffit pas : on
  // compare a la derniere URL vue et on ajuste l'etat pendant le rendu
  // (pattern React recommande pour deriver un etat d'un signal externe, sans
  // passer par un effet) — y compris pour revenir a vide (« Tout »).
  const [lastUrlSearch, setLastUrlSearch] = useState(urlSearch);
  if (urlSearch !== lastUrlSearch) {
    setLastUrlSearch(urlSearch);
    setSearch(urlSearch ?? "");
  }

  const [lastUrlCategory, setLastUrlCategory] = useState(urlCategory);
  if (urlCategory !== lastUrlCategory) {
    setLastUrlCategory(urlCategory);
    setCategory(urlCategory);
  }

  const categories = useCategoryOptions();
  const tags = useTagOptions();
  const iaModels = useIaModelOptions();

  const fetcher = useCallback(
    (page: number, perPage: number) =>
      promptService.browsePrompts({
        page,
        per_page: perPage,
        search: debouncedSearch || undefined,
        category: category ?? undefined,
        tag: tag ?? undefined,
        ia_model: iaModel ?? undefined,
        free: freeOnly || undefined,
        sort,
        direction: sort === "price" ? "asc" : "desc",
      }),
    [debouncedSearch, category, tag, iaModel, freeOnly, sort],
  );

  const { items, meta, setPage, setPerPage, isLoading, error, reload, isEmpty } = usePaginatedData(fetcher);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SearchInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un prompt…" />
        <SearchableSelectField
          label="Categorie"
          options={categories.map((item) => ({ value: item.slug, label: item.name }))}
          value={category}
          onChange={setCategory}
          clearable
        />
        <SearchableSelectField
          label="Outil IA"
          options={iaModels.map((item) => ({ value: item.slug, label: item.name }))}
          value={iaModel}
          onChange={setIaModel}
          clearable
        />
        <SearchableSelectField
          label="Tag"
          options={tags.map((item) => ({ value: item.slug, label: item.name }))}
          value={tag}
          onChange={setTag}
          clearable
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          {meta ? (
            <p className="text-sm font-medium text-[var(--muted)]">
              <span className="font-bold text-zinc-800 dark:text-zinc-100">{meta.total}</span> prompt{meta.total > 1 ? "s" : ""}{" "}
              disponible{meta.total > 1 ? "s" : ""}
            </p>
          ) : null}

          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(event) => setFreeOnly(event.target.checked)}
              className="h-4 w-4 rounded-2xl border-[var(--field-border)] text-brand-600 focus:ring-brand-500"
            />
            Prompts gratuits uniquement
          </label>
        </div>

        <ToolbarSelect label="Trier par" value={sort} onChange={(event) => setSort(event.target.value)} className="w-48">
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </ToolbarSelect>
      </div>

      {isLoading ? <LoadingState label="Chargement des prompts…" /> : null}
      {!isLoading && error ? <ErrorState error={error} onRetry={reload} /> : null}
      {!isLoading && isEmpty ? (
        <EmptyState
          icon={<IconSearch className="h-5 w-5" />}
          title="Aucun prompt ne correspond a votre recherche"
          description="Essayez d'elargir vos filtres ou de rechercher un autre mot-cle."
        />
      ) : null}

      {!isLoading && !error && items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : null}

      {meta && meta.total > 0 ? <Pagination meta={meta} onPageChange={setPage} onPerPageChange={setPerPage} /> : null}
    </div>
  );
}
