"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui";
import { IconArchive, IconGrid, IconPrompt, IconRobot, IconSparkle, IconTag } from "@/components/ui/icons";
import { useCategoryOptions } from "@/hooks/useOptions";
import { cn } from "@/lib/cn";

/** Rotation decorative, sans lien avec le contenu des categories elles-memes. */
const ICONS = [IconSparkle, IconRobot, IconPrompt, IconGrid, IconTag, IconArchive];

const MAX_VISIBLE = 8;

export function CategoryExplorer() {
  const categories = useCategoryOptions();

  const sorted = [...categories]
    .sort((a, b) => (b.prompts_count ?? 0) - (a.prompts_count ?? 0))
    .slice(0, MAX_VISIBLE);

  if (categories.length === 0) {
    return (
      <div className="flex flex-wrap gap-2.5">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-32" />
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2.5">
      {sorted.map((category, index) => {
        const Icon = ICONS[index % ICONS.length];

        return (
          <li key={category.id}>
            <Link
              href={`/?category=${encodeURIComponent(category.slug)}#browser`}
              className={cn(
                "group flex items-center gap-2 rounded-sm border border-[var(--hairline)] bg-[var(--surface)] py-2 pl-2.5 pr-3.5",
                "shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-brand-300 dark:hover:border-brand-700",
              )}
            >
              <span className="grad-brand-soft flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-brand-600 dark:text-brand-400">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{category.name}</span>
              {typeof category.prompts_count === "number" ? (
                <span className="text-xs font-medium text-[var(--muted)]">{category.prompts_count}</span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
