import type { ReactNode } from "react";

/** Habillage partage par les pages de contenu juridique/documentaire du pied de page. */
export function LegalContent({ updatedAt, children }: { updatedAt?: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl">
      {updatedAt ? <p className="text-sm text-[var(--muted)]">Dernière mise à jour : {updatedAt}</p> : null}
      <div className="mt-8 flex flex-col gap-8">{children}</div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-[var(--foreground)]">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-[var(--muted)]">{children}</div>
    </section>
  );
}

/** Bandeau rappelant qu'un modele juridique doit etre complete/valide avant mise en production. */
export function LegalPlaceholderNotice() {
  return (
    <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-200">
      Ce document est un modele generique. Les informations entre crochets doivent etre completees avec les donnees
      reelles de l&apos;entreprise, et son contenu verifie par un professionnel du droit avant publication.
    </p>
  );
}
