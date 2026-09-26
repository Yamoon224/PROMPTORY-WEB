"use client";

import { useState } from "react";
import { LinkButton } from "@/components/ui";
import { IconMinus, IconPlus } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que Promptory ?",
    answer:
      "Promptory est une marketplace et une plateforme de gestion de prompts IA. Vous pouvez créer, organiser et sauvegarder vos prompts dans une bibliothèque personnelle, les injecter directement dans ChatGPT, Claude ou Gemini via notre extension Chrome, et les vendre à une communauté de créateurs.",
  },
  {
    question: "Comment fonctionne l'extension Chrome ?",
    answer:
      "Une fois installée, l'extension ajoute un raccourci (ALT+P) qui insère instantanément un prompt de votre bibliothèque dans la zone de saisie de ChatGPT, Claude ou Gemini, variables déjà remplies — sans copier-coller.",
  },
  {
    question: "Puis-je vendre mes prompts ?",
    answer:
      "Oui. Tout compte créateur peut publier des prompts individuels ou des packs sur la marketplace après une courte modération, et suivre ses ventes et revenus depuis son espace créateur.",
  },
  {
    question: "Comment fonctionne la commission ?",
    answer:
      "Promptory prélève une commission de 10% sur chaque vente ; les 90% restants vous reviennent, versés directement sur votre moyen de paiement.",
  },
  {
    question: "L'extension Chrome est-elle gratuite ?",
    answer:
      "Oui, l'extension est gratuite et incluse dans tous les plans, y compris le plan Gratuit à vie.",
  },
  {
    question: "Mes prompts sont-ils protégés ?",
    answer:
      "Vos prompts privés restent visibles uniquement par vous. Une fois publiés sur la marketplace, ils sont protégés par nos conditions d'utilisation contre la revente ou la republication non autorisée.",
  },
];

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative left-1/2 right-1/2 -mx-[50vw] w-screen scroll-mt-24 bg-[var(--surface-muted)]">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">FAQ</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Tout ce que vous voulez savoir.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
          Une question sans réponse ? Notre équipe répond en moins de 12h.
        </p>

        <div className="mt-10 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={cn(
                      "text-base font-semibold",
                      isOpen ? "text-brand-700 dark:text-brand-400" : "text-[var(--foreground)]",
                    )}
                  >
                    {item.question}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--muted)]">
                    {isOpen ? <IconMinus className="h-3.5 w-3.5" /> : <IconPlus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                {isOpen ? (
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-md border border-[var(--hairline)] bg-[var(--surface)] px-5 py-4 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">Une question spécifique ?</p>
            <p className="text-sm text-[var(--muted)]">Notre équipe répond sous 12h — sans ticket, sans jargon.</p>
          </div>
          <LinkButton href="mailto:hello@promptory.io" variant="secondary" size="sm">
            Nous contacter
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
