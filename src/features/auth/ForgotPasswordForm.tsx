"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button, FormAlert, TextField } from "@/components/ui";
import { errorMessage } from "@/lib/api-client";
import { useMutation } from "@/hooks/useMutation";
import { authService } from "@/services";

/**
 * Demande de reinitialisation.
 *
 * Le message de succes est identique que l'adresse corresponde a un compte ou
 * non (c'est le backend qui le garantit) : cet ecran ne fait que l'afficher,
 * sans jamais essayer d'etre plus precis que lui.
 */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const mutation = useMutation((value: string) => authService.forgotPassword(value));

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = await mutation.run(email.trim());
    if (result) setSent(true);
  }

  if (sent) {
    return (
      <FormAlert tone="success">
        Si un compte existe pour <strong>{email.trim()}</strong>, un e-mail de reinitialisation vient de lui etre
        envoye. Suivez le lien qu&apos;il contient pour choisir un nouveau mot de passe.
      </FormAlert>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <TextField
        label="Adresse e-mail"
        type="email"
        placeholder="vous@exemple.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        required
        autoFocus
      />

      {mutation.error ? <FormAlert>{errorMessage(mutation.error)}</FormAlert> : null}

      <Button type="submit" size="lg" className="w-full" isLoading={mutation.isPending}>
        Envoyer le lien de reinitialisation
      </Button>

      <p className="text-center text-sm text-[var(--muted)]">
        <Link href="/connexion" className="font-semibold text-brand-600">
          Retour a la connexion
        </Link>
      </p>
    </form>
  );
}
