import { LinkButton } from "@/components/ui";
import { IconAward, IconCheck, IconPackage, IconPencil, IconUser } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const PLANS = [
  {
    icon: <IconUser className="h-4 w-4" />,
    tag: "Gratuit à vie",
    name: "Gratuit",
    price: "0€",
    period: null,
    description: "Accès complet pour créer et organiser.",
    features: ["Prompts illimités", "Extension Chrome gratuite", "Bibliothèque privée", "Synchronisation cloud"],
    cta: "Commencer gratuitement",
    href: "/inscription",
    highlighted: false,
  },
  {
    icon: <IconPencil className="h-4 w-4" />,
    tag: "Le plus populaire",
    name: "Créateur Pro",
    price: "9.99€",
    period: "/mois",
    description: "Commencez à gagner avec vos prompts.",
    features: ["Publier et vendre", "Packs de prompts", "Analyse de base", "Support email"],
    cta: "Passer Pro",
    href: "/inscription",
    highlighted: true,
  },
  {
    icon: <IconAward className="h-4 w-4" />,
    tag: "Pour pros",
    name: "Créateur Elite",
    price: "19.99€",
    period: "/mois",
    description: "Maximisez votre visibilité et vos ventes.",
    features: ["Prompts en vedette", "Analyses avancées", "Support prioritaire", "Badge Elite"],
    cta: "Passer Elite",
    href: "/inscription",
    highlighted: false,
  },
  {
    icon: <IconPackage className="h-4 w-4" />,
    tag: "B2B",
    name: "Entreprise",
    price: "Personnalisé",
    period: null,
    description: "Solutions de groupe avec support dédié.",
    features: ["Bundles personnalisés", "Licence commerciale", "Support 24/7", "Formation équipe"],
    cta: "Nous contacter",
    href: "mailto:hello@promptory.io",
    highlighted: false,
  },
];

export function LandingPricing() {
  return (
    <section id="tarifs" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">Tarifs</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Choisissez votre plan créateur.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
          De la productivité personnelle à la monétisation professionnelle — un plan pour chaque profil de créateur.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "flex flex-col rounded-md border bg-[var(--surface)] p-6 shadow-card",
              plan.highlighted ? "border-brand-500 ring-1 ring-brand-500" : "border-[var(--hairline)]",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="grad-brand-soft flex h-9 w-9 items-center justify-center rounded-sm text-brand-600 dark:text-brand-400">
                {plan.icon}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                  plan.highlighted
                    ? "grad-brand text-white"
                    : "bg-[var(--surface-muted)] text-[var(--muted)]",
                )}
              >
                {plan.tag}
              </span>
            </div>

            <p className="font-display mt-6 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              {plan.price}
              {plan.period ? <span className="text-base font-medium text-[var(--muted)]">{plan.period}</span> : null}
            </p>
            <h3 className="mt-3 text-base font-semibold text-[var(--foreground)]">{plan.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{plan.description}</p>

            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-[var(--foreground)]/85">
                  <IconCheck className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <LinkButton
              href={plan.href}
              variant={plan.highlighted ? "primary" : "secondary"}
              className="mt-6 w-full"
            >
              {plan.cta}
            </LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}
