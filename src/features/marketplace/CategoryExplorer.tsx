"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui";
import { useCategoryOptions } from "@/hooks/useOptions";
import { DECORATIVE_ICONS } from "./marketplace-icons";

const MAX_VISIBLE = 12;

export function CategoryExplorer() {
  const categories = useCategoryOptions();

  const sorted = [...categories]
    .sort((a, b) => (b.prompts_count ?? 0) - (a.prompts_count ?? 0))
    .slice(0, MAX_VISIBLE);

  if (categories.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-28" />
        ))}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {sorted.map((category) => {
        const Icon = DECORATIVE_ICONS[Math.abs(category.id) % DECORATIVE_ICONS.length];

        return (
          <li key={category.id}>
            <Link
              href={`/?category=${encodeURIComponent(category.slug)}#browser`}
              className="group flex h-full flex-col items-center gap-2.5 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] px-3 py-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover dark:hover:border-brand-700"
            >
              <span className="grad-brand-soft flex h-12 w-12 items-center justify-center rounded-2xl text-brand-600 transition-transform duration-200 group-hover:scale-110 dark:text-brand-400">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold leading-snug text-zinc-800 dark:text-zinc-100">{category.name}</span>
              {typeof category.prompts_count === "number" ? (
                <span className="text-xs text-[var(--muted)]">
                  {category.prompts_count} prompt{category.prompts_count > 1 ? "s" : ""}
                </span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
