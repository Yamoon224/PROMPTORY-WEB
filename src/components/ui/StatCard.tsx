import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DOT_CLASSES } from "./Badge";
import type { Tone } from "./Badge";

const TONE_VALUE: Record<Tone, string> = {
  neutral: "text-stone-900 dark:text-stone-50",
  brand: "text-brand-700 dark:text-brand-400",
  success: "text-emerald-700 dark:text-emerald-400",
  warning: "text-amber-700 dark:text-amber-400",
  danger: "text-rose-700 dark:text-rose-400",
  info: "text-sky-700 dark:text-sky-400",
};

const TONE_ICON: Record<Tone, string> = {
  neutral: "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300",
  brand: "grad-brand-soft text-brand-600 dark:text-brand-400",
  success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
  danger: "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
  info: "bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400",
};

const TONE_BLOB: Record<Tone, string> = {
  neutral: "bg-stone-300/40 dark:bg-stone-600/25",
  brand: "bg-brand-300/40 dark:bg-brand-700/30",
  success: "bg-emerald-300/35 dark:bg-emerald-700/25",
  warning: "bg-amber-300/35 dark:bg-amber-700/25",
  danger: "bg-rose-300/35 dark:bg-rose-700/25",
  info: "bg-sky-300/35 dark:bg-sky-700/25",
};

/** Une tuile de chiffre reste une carte parmi les autres : meme rayon, meme
 * lisere superieur que `Card`. La tache floue en coin est purement decorative
 * (jamais porteuse d'information) - un seul repere, discret, jamais anime. */
export function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
}) {
  return (
    <div className="group relative flex flex-1 items-start justify-between gap-3 overflow-hidden rounded-md border border-[var(--hairline)] border-t-[3px] border-t-[var(--card-border-top)] bg-[var(--surface)] px-4 py-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover sm:px-5">
      <span
        aria-hidden="true"
        className={cn("pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full blur-2xl", TONE_BLOB[tone])}
      />
      <div className="relative min-w-0">
        <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted)]">
          <span aria-hidden="true" className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT_CLASSES[tone])} />
          {label}
        </p>
        <p className={cn("mt-2 text-2xl font-bold tabular-nums tracking-tight", TONE_VALUE[tone])}>{value}</p>
        {hint ? <p className={cn("mt-1.5 text-xs font-medium leading-relaxed", TONE_VALUE[tone])}>{hint}</p> : null}
      </div>
      {icon ? (
        <span
          className={cn(
            "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105",
            TONE_ICON[tone],
          )}
        >
          {icon}
        </span>
      ) : null}
    </div>
  );
}
