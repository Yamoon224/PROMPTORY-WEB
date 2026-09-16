"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui";
import { buttonClasses } from "@/components/ui/Button";
import { useCategoryOptions } from "@/hooks/useOptions";

const MAX_VISIBLE = 11;

/**
 * Filtre rapide par categorie, sous forme de puces bouton (meme habillage
 * que `Button`, `size="md"`) plutot que de cartes : ici on choisit un filtre,
 * on n'explore pas une fiche.
 */
export function CategoryExplorer() {
  const categories = useCategoryOptions();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const sorted = [...categories]
    .sort((a, b) => (b.prompts_count ?? 0) - (a.prompts_count ?? 0))
    .slice(0, MAX_VISIBLE);

  if (categories.length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      <li>
        <Link href="/#browser" className={buttonClasses({ variant: activeCategory ? "secondary" : "primary", size: "md" })}>
          Tout
        </Link>
      </li>
      {sorted.map((category) => {
        const isActive = activeCategory === category.slug;

        return (
          <li key={category.id}>
            <Link
              href={`/?category=${encodeURIComponent(category.slug)}#browser`}
              className={buttonClasses({ variant: isActive ? "primary" : "secondary", size: "md" })}
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
