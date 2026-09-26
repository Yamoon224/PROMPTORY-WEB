import { LinkButton } from "@/components/ui";
import { IconArrowRight, IconDownload, IconStar } from "@/components/ui/icons";

const PROMPTS = [
  {
    category: "Marketing",
    trending: true,
    title: "Rédacteur de contenu SEO Expert",
    description: "Crée du contenu optimisé pour le ranking dès la première publication.",
    stars: 4.9,
    downloads: "2.3k",
    seller: "0xAlpha",
    sales: 312,
    revenue: "1 840€",
    price: "9.99€",
  },
  {
    category: "Dev",
    trending: true,
    title: "Assistant de révision de code",
    description: "Détecte les failles de sécurité et optimise automatiquement.",
    stars: 4.8,
    downloads: "1.8k",
    seller: "DevSys",
    sales: 198,
    revenue: "3 120€",
    price: "14.99€",
  },
  {
    category: "Social",
    trending: false,
    title: "Gestionnaire de réseaux sociaux",
    description: "Planifie et rédige vos publications sur toutes les plateformes.",
    stars: 4.7,
    downloads: "987",
    seller: "ElenaAI",
    sales: 94,
    revenue: "890€",
    price: "7.99€",
  },
  {
    category: "Business",
    trending: false,
    title: "Prompts de prospection B2B",
    description: "Emails et messages de prospection prêts à l'emploi.",
    stars: 4.9,
    downloads: "1.5k",
    seller: "SalesAI",
    sales: 189,
    revenue: "2 450€",
    price: "12.99€",
  },
];

const BUNDLES = [
  {
    label: "Bestseller",
    discount: "-50%",
    title: "Pack Startup",
    description: "52 prompts essentiels pour lancer, pivoter et scaler rapidement.",
    oldPrice: "99.99€",
    price: "49.99€",
  },
  {
    label: "Populaire",
    discount: "-43%",
    title: "Bundle Créateur de contenu",
    description: "38 prompts pour automatiser votre production de contenu média.",
    oldPrice: "69.99€",
    price: "39.99€",
  },
  {
    label: "Nouveau",
    discount: "-42%",
    title: "Boîte à outils Développeur",
    description: "45 prompts pour accélérer votre workflow d'ingénierie logicielle.",
    oldPrice: "59.99€",
    price: "34.99€",
  },
];

export function LandingMarketplace() {
  return (
    <section id="marketplace" className="relative left-1/2 right-1/2 -mx-[50vw] w-screen scroll-mt-24 bg-[var(--surface-muted)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
            Marketplace
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Vendez vos prompts sans limite.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
            Rejoignez des créateurs qui gagnent 90% de leurs ventes. Commission de 10%, paiements sécurisés, audience
            mondiale.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROMPTS.map((prompt) => (
            <article
              key={prompt.title}
              className="flex flex-col rounded-md border border-[var(--hairline)] bg-[var(--surface)] p-5 shadow-card"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--muted)]">{prompt.category}</span>
                {prompt.trending ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    ↗ Tendance
                  </span>
                ) : null}
              </div>
              <h3 className="font-display mt-2.5 text-base font-semibold leading-snug text-[var(--foreground)]">
                {prompt.title}
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{prompt.description}</p>

              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--muted)]">
                <span className="flex items-center gap-1">
                  <IconStar className="h-3.5 w-3.5 fill-current text-amber-400" />
                  {prompt.stars}
                </span>
                <span className="flex items-center gap-1">
                  <IconDownload className="h-3.5 w-3.5" />
                  {prompt.downloads}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[var(--hairline)] pt-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-[var(--foreground)]">{prompt.seller}</p>
                  <p className="text-[11px] text-[var(--muted)]">{prompt.sales} ventes · {prompt.revenue}</p>
                </div>
                <span className="shrink-0 font-display text-base font-semibold text-[var(--foreground)]">
                  {prompt.price}
                </span>
              </div>

              <LinkButton href="/packs" variant="secondary" size="sm" className="mt-4 w-full">
                Acquérir
              </LinkButton>
            </article>
          ))}
        </div>

        <p className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Bundles recommandés
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {BUNDLES.map((bundle) => (
            <article
              key={bundle.title}
              className="flex flex-col rounded-md border border-[var(--hairline)] bg-[var(--surface)] p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="grad-brand-soft rounded-full px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
                  {bundle.label}
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{bundle.discount}</span>
              </div>
              <h3 className="font-display mt-3 text-lg font-semibold text-[var(--foreground)]">{bundle.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{bundle.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--hairline)] pt-4">
                <div>
                  <span className="mr-2 text-sm text-[var(--muted)] line-through">{bundle.oldPrice}</span>
                  <span className="font-display text-xl font-semibold text-[var(--foreground)]">{bundle.price}</span>
                </div>
                <LinkButton href="/packs" variant="secondary" size="sm">
                  Acquérir
                </LinkButton>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[var(--hairline)] pt-10 sm:flex-row">
          <div className="flex items-center gap-10">
            <Stat value="4,800+" label="Prompts actifs" />
            <Stat value="90%" label="Revenu aux créateurs" />
          </div>
          <LinkButton href="/inscription" icon={<IconArrowRight className="h-4 w-4" />}>
            Devenir créateur
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-[var(--foreground)]">{value}</p>
      <p className="text-xs text-[var(--muted)]">{label}</p>
    </div>
  );
}
