"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button, FormAlert, PasswordField, TextField } from "@/components/ui";
import { ApiError, errorMessage } from "@/lib/api-client";
import { useAuth } from "./AuthContext";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<unknown>(null);
  const [isPending, setIsPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      await register({ name: name.trim(), email: email.trim(), password, password_confirmation: passwordConfirmation });
      router.replace("/espace");
    } catch (caught) {
      setError(caught);
      setIsPending(false);
    }
  }

  const fieldErrors = error instanceof ApiError ? error.fieldErrors : {};

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <TextField
        label="Nom complet"
        placeholder="Camille Createur"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoComplete="name"
        errors={fieldErrors.name}
        required
        autoFocus
      />
      <TextField
        label="Adresse e-mail"
        type="email"
        placeholder="vous@exemple.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        errors={fieldErrors.email}
        required
      />
      <PasswordField
        label="Mot de passe"
        placeholder="8 caracteres minimum"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="new-password"
        errors={fieldErrors.password}
        required
      />
      <PasswordField
        label="Confirmer le mot de passe"
        placeholder="Retapez le mot de passe"
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        autoComplete="new-password"
        required
      />

      {error && !(error instanceof ApiError && error.status === 422) ? <FormAlert>{errorMessage(error)}</FormAlert> : null}

      <Button type="submit" size="lg" className="w-full" isLoading={isPending}>
        Creer mon compte
      </Button>

      <p className="text-center text-sm text-[var(--muted)]">
        Deja un compte ?{" "}
        <Link href="/connexion" className="font-semibold text-brand-600">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
