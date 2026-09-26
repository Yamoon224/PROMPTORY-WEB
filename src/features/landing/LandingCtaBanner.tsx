import { LinkButton } from "@/components/ui";
import { IconArrowRight } from "@/components/ui/icons";

export function LandingCtaBanner() {
  return (
    <section className="flex flex-col items-center justify-between gap-6 rounded-md border border-[var(--hairline)] bg-[var(--surface)] px-6 py-8 shadow-card sm:flex-row sm:px-10">
      <div>
        <h2 className="font-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
          Prêt à prendre le contrôle de vos prompts ?
        </h2>
        <p className="mt-1.5 text-sm text-[var(--muted)]">
          Créez votre compte gratuit et installez l&apos;extension en 30 secondes.
        </p>
      </div>
      <LinkButton href="/inscription" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
        Démarrer gratuitement
      </LinkButton>
    </section>
  );
}
