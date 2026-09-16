import { Suspense } from "react";
import { LinkButton } from "@/components/ui";
import { IconCheckCircle, IconDownload, IconLock, IconSparkle } from "@/components/ui/icons";
import { CategoryExplorer } from "@/features/marketplace/CategoryExplorer";
import { DualAudience } from "@/features/marketplace/DualAudience";
import { FeaturedPrompts } from "@/features/marketplace/FeaturedPrompts";
import { HeroPromptMockups } from "@/features/marketplace/HeroPromptMockups";
import { MarketplaceSearchBar } from "@/features/marketplace/MarketplaceSearchBar";
import { MarketplaceStats } from "@/features/marketplace/MarketplaceStats";
import { PromptBrowser } from "@/features/marketplace/PromptBrowser";
import { SellerBanner } from "@/features/marketplace/SellerBanner";
import { WhyPromptory } from "@/features/marketplace/WhyPromptory";

const TRUST_BADGES = [
  { icon: <IconLock className="h-4 w-4" />, label: "Paiement securise" },
  { icon: <IconCheckCircle className="h-4 w-4" />, label: "Createurs moderes" },
  { icon: <IconDownload className="h-4 w-4" />, label: "Acces immediat" },
];

const BUYER_STEPS = [
  "Parcourez le catalogue et filtrez par categorie, tag ou outil IA.",
  "Payez en toute securite par carte bancaire ou PayPal.",
  "Recuperez votre prompt immediatement, pret a copier-coller.",
];

const CREATOR_STEPS = [
  "Creez votre compte createur en quelques minutes.",
  "Publiez vos prompts ou packs : chacun passe par une moderation avant mise en ligne.",
  "Suivez vos ventes et vos revenus depuis votre espace createur.",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]">
        {/* Lueurs douces plutot que le motif raye : un lavis de marque tres
            attenue, jamais une texture qui capte l'oeil avant le texte. */}
        <div aria-hidden="true" className="grad-brand-soft absolute inset-0" />
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl dark:bg-brand-700/20" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-800/20" />

        <div className="relative flex flex-col items-center px-4 pb-14 pt-12 text-center sm:px-10 sm:pt-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 ring-1 ring-brand-200 dark:bg-brand-900/40 dark:text-brand-300 dark:ring-brand-800">
            <IconSparkle className="h-3.5 w-3.5" />
            Marketplace de prompts IA
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50">
            Bienvenue sur Promptory
            <span className="mt-2 block text-2xl font-bold text-brand-600 sm:text-3xl dark:text-brand-400">
              Des prompts qui marchent, prets a copier-coller
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-[var(--muted)] sm:text-lg">
            Les acheteurs trouvent le prompt qu&apos;il leur faut, les createurs le fournissent. Paiement securise par
            carte ou PayPal, aucune donnee bancaire stockee.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href="#browser" size="lg">
              Explorer les prompts
            </LinkButton>
            <LinkButton href="/inscription" variant="secondary" size="lg">
              Vendre mes prompts
            </LinkButton>
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {TRUST_BADGES.map((badge) => (
              <li key={badge.label} className="flex items-center gap-1.5 text-sm font-medium text-[var(--muted)]">
                <span className="text-brand-600 dark:text-brand-400">{badge.icon}</span>
                {badge.label}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <MarketplaceStats />
          </div>

          <HeroPromptMockups />
        </div>
      </section>

      <section id="categories" className="scroll-mt-20 py-10">
        <Suspense fallback={<div className="mx-auto h-14 w-full max-w-2xl rounded-2xl bg-[var(--surface-muted)]" />}>
          <MarketplaceSearchBar />
        </Suspense>
        <div className="mt-5">
          <Suspense fallback={null}>
            <CategoryExplorer />
          </Suspense>
        </div>
      </section>

      <section id="browser" className="scroll-mt-20 pb-10">
        <h2 className="text-xl font-extrabold tracking-tight">Explorer tous les prompts</h2>
        <span aria-hidden="true" className="grad-brand mt-2 block h-[3px] w-12 rounded-full" />
        <div className="mt-6">
          <Suspense fallback={null}>
            <PromptBrowser />
          </Suspense>
        </div>
      </section>

      <FeaturedPrompts />

      <DualAudience />

      <WhyPromptory />

      <section className="py-10">
        <SellerBanner />
      </section>

      <section className="rounded-2xl bg-[var(--surface-muted)] px-4 py-10 sm:px-8">
        <h2 className="text-xl font-extrabold tracking-tight">Comment ca marche</h2>
        <span aria-hidden="true" className="grad-brand mt-2 block h-[3px] w-12 rounded-full" />

        <div className="mt-7 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">Cote acheteur</h3>
            <ol className="mt-4 flex flex-col gap-4">
              {BUYER_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="grad-brand flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">Cote createur</h3>
            <ol className="mt-4 flex flex-col gap-4">
              {CREATOR_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="grad-brand flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
