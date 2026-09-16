"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IconSearch } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Recherche partagee entre le hero et le header : les deux emplacements
 * renvoient vers la meme URL (`/?q=...`), lue par `PromptBrowser`. Un champ
 * simple plutot que le champ a libelle flottant des filtres : ici la
 * recherche est une porte d'entree, pas un filtre parmi d'autres.
 */
export function MarketplaceSearchForm({
  variant = "header",
  className,
  onNavigate,
}: {
  variant?: "header" | "hero";
  className?: string;
  /** Appele apres redirection — ferme le panneau mobile, par exemple. */
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get("q") ?? "");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/?q=${encodeURIComponent(query)}#browser` : "/#browser");
    onNavigate?.();
  }

  const isHero = variant === "hero";

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 border",
        isHero
          ? "rounded-full border-transparent bg-white p-2 shadow-card-hover dark:bg-zinc-900"
          : "rounded-sm border-[var(--hairline)] bg-[var(--surface-muted)] px-1 py-1",
        className,
      )}
    >
      <IconSearch className={cn("shrink-0 text-zinc-400", isHero ? "ml-3 h-5 w-5" : "ml-2 h-4 w-4")} />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={isHero ? "Redaction, marketing, code, image…" : "Rechercher un prompt…"}
        aria-label="Rechercher un prompt"
        className={cn(
          "min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--field-placeholder)]",
          isHero ? "py-2 text-sm text-zinc-900 dark:text-zinc-50 sm:text-base" : "py-1.5 text-sm",
        )}
      />
      <button
        type="submit"
        className={cn(
          "grad-brand shrink-0 font-semibold text-white transition-all hover:grad-brand-hover",
          isHero ? "rounded-full px-5 py-2.5 text-sm" : "rounded-sm px-3 py-1.5 text-xs",
        )}
      >
        Rechercher
      </button>
    </form>
  );
}
