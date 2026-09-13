"use client";

import { useCallback, useState } from "react";
import { EmptyState, ErrorState, LoadingState, Pagination, SearchInput } from "@/components/ui";
import { IconPackage } from "@/components/ui/icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { packService } from "@/services";
import { PackCard } from "./PackCard";

export function PackBrowser() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const fetcher = useCallback(
    (page: number, perPage: number) => packService.browsePacks({ page, per_page: perPage, search: debouncedSearch || undefined }),
    [debouncedSearch],
  );

  const { items, meta, setPage, isLoading, error, reload, isEmpty } = usePaginatedData(fetcher);

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xs">
        <SearchInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un pack…" />
      </div>

      {isLoading ? <LoadingState label="Chargement des packs…" /> : null}
      {!isLoading && error ? <ErrorState error={error} onRetry={reload} /> : null}
      {!isLoading && isEmpty ? (
        <EmptyState icon={<IconPackage className="h-5 w-5" />} title="Aucun pack disponible pour le moment" />
      ) : null}

      {!isLoading && !error && items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      ) : null}

      {meta && meta.total > 0 ? <Pagination meta={meta} onPageChange={setPage} /> : null}
    </div>
  );
}
