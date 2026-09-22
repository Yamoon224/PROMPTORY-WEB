import { Suspense } from "react";
import { LinkButton } from "@/components/ui";
import { IconCart, IconCheckCircle, IconCoins, IconDownload, IconLock, IconSparkle } from "@/components/ui/icons";
import { AIExperienceGallery } from "@/features/marketplace/AIExperienceGallery";
import { CategoryExplorer } from "@/features/marketplace/CategoryExplorer";
import { DualAudience } from "@/features/marketplace/DualAudience";
import { FeaturedPrompts } from "@/features/marketplace/FeaturedPrompts";
import { HeroSlider } from "@/features/marketplace/HeroSlider";
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
      <section className="relative overflow-hidden rounded-2xl bg-brand-900 text-white">
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-10 sm:py-16 md:grid-cols-2">
          <div className="animate-fade-rise text-center md:text-left">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-200 md:justify-start">
              <IconSparkle className="h-4 w-4" />
              Marketplace de prompts IA
            </p>

            <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Des prompts qui marchent, prets a copier-coller
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg md:mx-0">
              Les acheteurs trouvent le prompt qu&apos;il leur faut, les createurs le fournissent. Paiement securise
              par carte ou PayPal, aucune donnee bancaire stockee.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <LinkButton href="#browser" variant="onDark" size="lg" icon={<IconCart className="h-5 w-5" />}>
                Explorer les prompts
              </LinkButton>
              <LinkButton
                href="/inscription"
                variant="onDarkOutline"
                size="lg"
                icon={<IconCoins className="h-5 w-5" />}
              >
                Vendre mes prompts
              </LinkButton>
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
              {TRUST_BADGES.map((badge) => (
                <li key={badge.label} className="flex items-center gap-1.5 text-sm font-medium text-white/90">
                  <span className="text-brand-200">{badge.icon}</span>
                  {badge.label}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center md:justify-start">
              <MarketplaceStats />
            </div>
          </div>

          <HeroSlider />
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
        <h2 className="font-display text-2xl font-semibold tracking-tight">Explorer tous les prompts</h2>
        <div className="mt-6">
          <Suspense fallback={null}>
            <PromptBrowser />
          </Suspense>
        </div>
      </section>

      <FeaturedPrompts />

      <DualAudience />

      <AIExperienceGallery />

      <WhyPromptory />

      <section className="py-10">
        <SellerBanner />
      </section>

      <section className="rounded-2xl bg-[var(--surface-muted)] px-4 py-10 sm:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Comment ca marche</h2>

        <div className="mt-7 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-brand-700 dark:text-brand-400">Cote acheteur</h3>
            <ol className="mt-4 flex flex-col gap-4">
              {BUYER_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-300 dark:text-brand-300 dark:ring-brand-700">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-brand-700 dark:text-brand-400">Cote createur</h3>
            <ol className="mt-4 flex flex-col gap-4">
              {CREATOR_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-300 dark:text-brand-300 dark:ring-brand-700">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
