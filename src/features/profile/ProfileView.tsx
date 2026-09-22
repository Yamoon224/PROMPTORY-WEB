"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormAlert,
  PasswordField,
  TextField,
} from "@/components/ui";
import { IconLock, IconUser } from "@/components/ui/icons";
import { useAuth } from "@/features/auth/AuthContext";
import { useMutation } from "@/hooks/useMutation";
import { ApiError, errorMessage } from "@/lib/api-client";
import { ROLE_LABEL } from "@/lib/labels";
import { authService } from "@/services";
import type { UpdatePasswordInput, UpdateProfileInput } from "@/services/auth-service";

export function ProfileView() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardBody className="flex items-center gap-4">
          <Avatar name={user.name} />
          <div>
            <p className="text-base font-bold">{user.name}</p>
            <p className="text-sm text-[var(--muted)]">{user.email}</p>
            <div className="mt-2 flex gap-2">
              <Badge tone="brand">{ROLE_LABEL[user.role] ?? user.role}</Badge>
              <Badge dot tone={user.status === "active" ? "success" : "danger"}>
                {user.status === "active" ? "Actif" : "Inactif"}
              </Badge>
            </div>
          </div>
        </CardBody>
      </Card>

      <ProfileInfoForm />
      <PasswordForm />
    </div>
  );
}

function ProfileInfoForm() {
  const { user, refresh } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation((input: UpdateProfileInput) => authService.updateProfile(input));
  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSuccess(false);

    const result = await mutation.run({ name: name.trim(), email: email.trim() });
    if (result) {
      await refresh();
      setSuccess(true);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <Card>
        <CardHeader icon={<IconUser className="h-4 w-4" />} title="Informations du compte" description="Nom et adresse e-mail utilises pour vous connecter." />
        <CardBody className="flex flex-col gap-4">
          <TextField label="Nom complet" placeholder="Votre nom" value={name} onChange={(event) => setName(event.target.value)} errors={fieldErrors.name} required />
          <TextField label="Adresse e-mail" type="email" placeholder="vous@exemple.com" value={email} onChange={(event) => setEmail(event.target.value)} errors={fieldErrors.email} required />
          {success ? <FormAlert tone="success">Vos informations ont ete mises a jour.</FormAlert> : null}
          {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? (
            <FormAlert>{errorMessage(mutation.error)}</FormAlert>
          ) : null}
        </CardBody>
        <CardFooter>
          <Button type="submit" isLoading={mutation.isPending}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation((input: UpdatePasswordInput) => authService.updatePassword(input));
  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSuccess(false);

    const result = await mutation.run({
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation,
    });

    if (result !== null) {
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
      setSuccess(true);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <Card>
        <CardHeader icon={<IconLock className="h-4 w-4" />} title="Mot de passe" description="Choisissez un mot de passe d'au moins 8 caracteres." />
        <CardBody className="flex flex-col gap-4">
          <PasswordField
            label="Mot de passe actuel"
            placeholder="Votre mot de passe actuel"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
            errors={fieldErrors.current_password}
            required
          />
          <PasswordField
            label="Nouveau mot de passe"
            placeholder="8 caracteres minimum"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            errors={fieldErrors.password}
            required
          />
          <PasswordField
            label="Confirmer le nouveau mot de passe"
            placeholder="Retapez le mot de passe"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            autoComplete="new-password"
            required
          />
          {success ? <FormAlert tone="success">Votre mot de passe a ete change.</FormAlert> : null}
          {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? (
            <FormAlert>{errorMessage(mutation.error)}</FormAlert>
          ) : null}
        </CardBody>
        <CardFooter>
          <Button type="submit" isLoading={mutation.isPending}>
            Changer le mot de passe
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
