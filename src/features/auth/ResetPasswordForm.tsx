"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button, FormAlert, PasswordField } from "@/components/ui";
import { useMutation } from "@/hooks/useMutation";
import { ApiError, errorMessage } from "@/lib/api-client";
import { authService } from "@/services";

/** Choix d'un nouveau mot de passe, a partir du lien recu par e-mail (`?email=&token=`). */
export function ResetPasswordForm({ email, token }: { email: string; token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const mutation = useMutation(() => authService.resetPassword({ email, token, password, password_confirmation: passwordConfirmation }));

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = await mutation.run(undefined);
    if (result) router.replace("/connexion");
  }

  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  if (!email || !token) {
    return (
      <FormAlert>
        Ce lien de reinitialisation est incomplet ou invalide.{" "}
        <Link href="/mot-de-passe-oublie" className="font-semibold underline">
          Demandez-en un nouveau
        </Link>
        .
      </FormAlert>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <PasswordField
        label="Nouveau mot de passe"
        placeholder="8 caracteres minimum"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="new-password"
        errors={fieldErrors.password}
        required
        autoFocus
      />
      <PasswordField
        label="Confirmer le mot de passe"
        placeholder="Retapez le mot de passe"
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        autoComplete="new-password"
        required
      />

      {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? (
        <FormAlert>{errorMessage(mutation.error)}</FormAlert>
      ) : null}
      {fieldErrors.email ? <FormAlert>{fieldErrors.email.join(" ")}</FormAlert> : null}

      <Button type="submit" size="lg" className="w-full" isLoading={mutation.isPending}>
        Reinitialiser le mot de passe
      </Button>
    </form>
  );
}
