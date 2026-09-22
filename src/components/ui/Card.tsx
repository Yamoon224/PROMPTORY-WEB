import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Carte : coins rounded-lg, ombre franche, lisere en tete.
 *
 * Rayon intermediaire entre les badges (rounded-sm) et les boutons/champs
 * (entierement arrondis) : une hierarchie a plusieurs niveaux plutot qu'un
 * seul rayon partout.
 *
 * Le lisere est porte par la bordure superieure elle-meme (`border-t`), pas
 * par un calque ajoute : il ne recouvre jamais le contenu et n'ajoute aucun
 * element au DOM. Sa teinte suit le theme courant (gris clair en clair, gris
 * en sombre) plutot que la couleur de marque : c'est un repere structurel,
 * pas une mise en avant.
 */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  /** Survol accentue, pour une carte cliquable (resultat de recherche). */
  interactive?: boolean;
}) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-md border border-[var(--hairline)] border-t-[3px] border-t-[var(--card-border-top)] bg-[var(--surface)] shadow-card",
        interactive && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </section>
  );
}

export function CardHeader({
  title,
  description,
  actions,
  icon,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--hairline)] px-4 py-4 sm:px-5">
      <div className="flex min-w-0 items-start gap-3">
        {icon ? (
          <span className="grad-brand-soft mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-400">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          <h2 className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-50">{title}</h2>
          {description ? <p className="mt-1.5 text-sm text-[var(--muted)]">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-4 py-4 sm:px-5", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-[var(--hairline)] px-4 py-3 sm:px-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
