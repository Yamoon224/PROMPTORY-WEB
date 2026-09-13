import { cn } from "@/lib/cn";

/**
 * Marque « Promptory » : le pictogramme est une bulle de conversation percee
 * d'une etincelle, lisible reduite a 32 px dans la barre laterale repliee.
 */
export function LogoMark({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const dimension = { sm: "h-8 w-8", md: "h-9 w-9", lg: "h-12 w-12" }[size];

  return (
    <span
      aria-hidden="true"
      className={cn("grad-brand relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm shadow-card", dimension, className)}
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4.5 4V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
        <path fill="#fff" stroke="none" d="M14.5 6.5c.4 2.3 1.1 3.1 3.3 3.3-2.2.2-2.9 1-3.3 3.3-.4-2.3-1.1-3.1-3.3-3.3 2.2-.2 2.9-1 3.3-3.3Z" />
      </svg>
    </span>
  );
}

export function Logo({ size = "md", className, tagline = false }: { size?: "sm" | "md" | "lg"; className?: string; tagline?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50",
            size === "lg" ? "text-2xl" : "text-lg",
          )}
        >
          Prompt<span className="grad-brand-text">ory</span>
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
