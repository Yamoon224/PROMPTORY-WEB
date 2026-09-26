"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button, FormAlert, TextField } from "@/components/ui";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";
import { errorMessage } from "@/lib/api-client";
import { useMutation } from "@/hooks/useMutation";
import { marketingService } from "@/services";

const CHECKLIST = [
  "Créez des prompts illimités",
  "Extension Chrome gratuite",
  "Gagnez 90% des ventes",
  "Paiements sécurisés et rapides",
];

export function LandingFinalCta() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const mutation = useMutation((value: string) => marketingService.subscribeToNewsletter(value));

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = await mutation.run(email.trim());
    if (result) setSubscribed(true);
  }

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

        {subscribed ? (
          <FormAlert tone="success">
            Merci ! Un e-mail vient d&apos;être envoyé à <strong>{email.trim()}</strong> pour continuer.
          </FormAlert>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-3">
            <TextField
              label="Email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              errors={mutation.fieldErrors.email}
              autoComplete="email"
              required
            />

            {mutation.error ? <FormAlert>{errorMessage(mutation.error)}</FormAlert> : null}

            <Button type="submit" size="lg" isLoading={mutation.isPending} icon={<IconArrowRight className="h-5 w-5" />}>
              Commencer gratuitement
            </Button>
            <p className="text-center text-xs text-[var(--muted)]">Aucun spam · Gratuit pour toujours</p>
          </form>
        )}
      </div>
    </section>
  );
}
