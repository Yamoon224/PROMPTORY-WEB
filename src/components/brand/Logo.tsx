import { cn } from "@/lib/cn";

/**
 * Marque « Promptory » : un chevron (l'invite de commande) et une grille 2x2
 * (le rangement des prompts), aplat indigo unique - jamais de degrade sur le
 * badge, conformement a la charte graphique. Lisible reduite a 32 px dans la
 * barre laterale repliee.
 */
export function LogoMark({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const dimension = { sm: "h-8 w-8", md: "h-9 w-9", lg: "h-12 w-12" }[size];

  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-brand-500 shadow-card", dimension, className)}
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]">
        <path d="M4 6.8 9 12 4 17.2" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="10.6" y="6.9" width="4.2" height="4.2" rx="1" fill="#fff" />
        <rect x="15.8" y="6.9" width="4.2" height="4.2" rx="1" fill="#fff" />
        <rect x="10.6" y="12.1" width="4.2" height="4.2" rx="1" fill="#fff" />
        <rect x="15.8" y="12.1" width="4.2" height="4.2" rx="1" fill="#fff" />
      </svg>
    </span>
  );
}

export function Logo({ size = "md", className, tagline = false }: { size?: "sm" | "md" | "lg"; className?: string; tagline?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        {/* Toujours en bas-de-casse integral, jamais en italique : la casse
            basse fait partie de l'identite du mot-symbole. */}
        <span
          className={cn(
            "font-extrabold lowercase tracking-tight text-zinc-900 dark:text-zinc-50",
            size === "lg" ? "text-2xl" : "text-lg",
          )}
        >
          promptory
        </span>
        {tagline ? (
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Marketplace de prompts IA
          </span>
        ) : null}
      </span>
    </span>
  );
}
