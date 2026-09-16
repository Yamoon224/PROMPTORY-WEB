import { LinkButton } from "@/components/ui";
import { IconCheck } from "@/components/ui/icons";

const BENEFITS = [
  "Prompts et packs illimites",
  "Tableau de bord des ventes",
  "Paiement securise (carte ou PayPal)",
  "Abonnement premium optionnel pour plus de visibilite",
];

export function SellerBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl">
      <div aria-hidden="true" className="grad-brand absolute inset-0" />
      <div aria-hidden="true" className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 px-5 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl text-white">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Vendez vos prompts des aujourd&apos;hui</h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">
            Rejoignez les createurs qui monetisent leur savoir-faire sur Promptory.
          </p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-white/90">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <LinkButton href="/inscription" variant="secondary" size="lg" className="shrink-0">
          Ouvrir mon espace createur
        </LinkButton>
      </div>
    </section>
  );
}
