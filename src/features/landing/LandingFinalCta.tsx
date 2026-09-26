"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";

const CHECKLIST = [
  "Créez des prompts illimités",
  "Extension Chrome gratuite",
  "Gagnez 90% des ventes",
  "Paiements sécurisés et rapides",
];

export function LandingFinalCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="rounded-md border border-[var(--hairline)] bg-[var(--surface)] px-6 py-10 shadow-card sm:px-10">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Prêt à monétiser vos prompts ?
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--muted)]">
            Rejoignez des milliers de créateurs qui construisent un revenu passif avec Promptory. Extension gratuite,
            90% de commission, audience mondiale.
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[var(--foreground)]/85">
                <IconCheck className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col gap-3"
        >
          <label htmlFor="landing-email" className="text-sm font-semibold text-[var(--foreground)]">
            Email
          </label>
          <input
            id="landing-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="votre@email.com"
            className="h-11 rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none focus-visible:border-brand-500 focus-visible:ring-1 focus-visible:ring-brand-500"
          />
          <Button type="submit" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
            Commencer gratuitement
          </Button>
          <p className="text-center text-xs text-[var(--muted)]" role="status">
            {submitted ? "Merci ! Vérifiez votre boîte mail pour continuer." : "Aucun spam · Gratuit pour toujours"}
          </p>
        </form>
      </div>
    </section>
  );
}
