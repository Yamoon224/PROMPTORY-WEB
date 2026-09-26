import { LinkButton } from "@/components/ui";
import { IconArrowRight } from "@/components/ui/icons";

const PACKS = [
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

/** Section dediee aux packs - des lots de prompts, distincts de la marketplace individuelle. */
export function LandingPacks() {
  return (
    <section id="packs" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">Packs</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Des packs de prompts prêts à l&apos;emploi.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
          Des lots thématiques à prix réduit, sélectionnés pour vous faire gagner du temps dès le premier jour.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PACKS.map((pack) => (
          <article
            key={pack.title}
            className="flex flex-col rounded-md border border-[var(--hairline)] bg-[var(--surface)] p-5 shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="grad-brand-soft rounded-md px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
                {pack.label}
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{pack.discount}</span>
            </div>
            <h3 className="font-display mt-3 text-lg font-semibold text-[var(--foreground)]">{pack.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{pack.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-[var(--hairline)] pt-4">
              <div>
                <span className="mr-2 text-sm text-[var(--muted)] line-through">{pack.oldPrice}</span>
                <span className="font-display text-xl font-semibold text-[var(--foreground)]">{pack.price}</span>
              </div>
              <LinkButton href="/packs" variant="secondary" size="sm">
                Acquérir
              </LinkButton>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <LinkButton href="/packs" icon={<IconArrowRight className="h-4 w-4" />}>
          Voir tous les packs
        </LinkButton>
      </div>
    </section>
  );
}
