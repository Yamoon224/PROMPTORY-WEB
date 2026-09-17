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
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 text-white">
        {/* Formes de marque qui derivent lentement derriere le contenu :
            donne du mouvement au fond degrade sans jamais distraire du texte. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="animate-blob absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-brand-300/20 blur-3xl [animation-delay:3s]" />
          <div className="animate-blob absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl [animation-delay:6s]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-10 sm:py-16 md:grid-cols-2">
          <div className="animate-fade-rise text-center md:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
              <IconSparkle className="h-3.5 w-3.5 text-brand-200" />
              Marketplace de prompts IA
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Bienvenue sur Promptory
              <span className="mt-2 block text-2xl font-bold sm:text-3xl">
                Des prompts qui marchent, <span className="text-brand-200">prets a copier-coller</span>
              </span>
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

      <AIExperienceGallery />

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
