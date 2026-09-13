import type { Metadata } from "next";
import { AuthPanel } from "@/features/auth/AuthPanel";
import { ForgotPasswordForm } from "@/features/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Mot de passe oublie" };

export default function ForgotPasswordPage() {
  return (
    <AuthPanel title="Mot de passe oublie" description="Indiquez votre adresse e-mail pour recevoir un lien de reinitialisation.">
      <ForgotPasswordForm />
    </AuthPanel>
  );
}
