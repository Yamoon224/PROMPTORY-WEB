import type { Metadata } from "next";
import { AuthPanel } from "@/features/auth/AuthPanel";
import { RegisterForm } from "@/features/auth/RegisterForm";

export const metadata: Metadata = { title: "Inscription" };

export default function RegisterPage() {
  return (
    <AuthPanel title="Creer un compte" description="Gratuit : creez, publiez et achetez des prompts en quelques minutes.">
      <RegisterForm />
    </AuthPanel>
  );
}
