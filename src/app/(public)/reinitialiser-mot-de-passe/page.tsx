import type { Metadata } from "next";
import { AuthPanel } from "@/features/auth/AuthPanel";
import { ResetPasswordForm } from "@/features/auth/ResetPasswordForm";

export const metadata: Metadata = { title: "Reinitialiser le mot de passe" };

export default async function ResetPasswordPage({ searchParams }: PageProps<"/reinitialiser-mot-de-passe">) {
  const { email, token } = await searchParams;

  return (
    <AuthPanel title="Nouveau mot de passe" description="Choisissez le mot de passe que vous utiliserez desormais.">
      <ResetPasswordForm
        email={Array.isArray(email) ? (email[0] ?? "") : (email ?? "")}
        token={Array.isArray(token) ? (token[0] ?? "") : (token ?? "")}
      />
    </AuthPanel>
  );
}
