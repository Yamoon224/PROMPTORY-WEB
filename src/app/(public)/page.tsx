import Link from "next/link";
import { Suspense } from "react";
import { IconCheckCircle, IconDownload, IconLock, IconSparkle } from "@/components/ui/icons";
import { CategoryExplorer } from "@/features/marketplace/CategoryExplorer";
import { DualAudience } from "@/features/marketplace/DualAudience";
import { FeaturedPrompts } from "@/features/marketplace/FeaturedPrompts";
import { MarketplaceSearchForm } from "@/features/marketplace/MarketplaceSearchForm";
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
      <section className="relative overflow-hidden rounded-2xl">
        <div aria-hidden="true" className="grad-brand absolute inset-x-0 top-0 h-[28rem] sm:h-[26rem]" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[28rem] opacity-[0.12] sm:h-[26rem]"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0 18px, transparent 18px 36px)" }}
        />
        {/* Lueurs douces pour donner du relief au degrade plat, sans introduire de
            nouvelle teinte : blanc translucide, comme la texture rayee ci-dessus. */}
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative px-4 pb-12 pt-12 sm:px-10 sm:pt-16">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ring-1 ring-white/25 backdrop-blur">
              <IconSparkle className="h-3.5 w-3.5" />
              Marketplace de prompts IA
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Des prompts qui marchent, prets a copier-coller.
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
              Redaction, marketing, developpement, image : trouvez le prompt qu&apos;il vous faut, ou vendez les
              votres.
            </p>
          </div>

          <div className="mt-7 max-w-xl">
            <Suspense fallback={<div className="h-14 w-full rounded-full bg-white/15" />}>
              <MarketplaceSearchForm variant="hero" />
            </Suspense>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_BADGES.map((badge) => (
              <li key={badge.label} className="flex items-center gap-1.5 text-sm font-medium text-white/85">
                {badge.icon}
                {badge.label}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <MarketplaceStats />
          </div>

          <p className="mt-5 text-sm text-white/80">
            Vous etes createur ?{" "}
            <Link
              href="/inscription"
              className="font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
            >
              Vendez vos prompts sur Promptory →
            </Link>
          </p>
        </div>
      </section>

      <section id="categories" className="scroll-mt-20 py-10">
        <h2 className="text-xl font-extrabold tracking-tight">Explorer par categorie</h2>
        <span aria-hidden="true" className="grad-brand mt-2 block h-[3px] w-12 rounded-full" />
        <div className="mt-6">
          <CategoryExplorer />
        </div>
      </section>

      <FeaturedPrompts />

      <DualAudience />

      <section id="browser" className="scroll-mt-20 pb-10">
        <h2 className="text-xl font-extrabold tracking-tight">Explorer tous les prompts</h2>
        <span aria-hidden="true" className="grad-brand mt-2 block h-[3px] w-12 rounded-full" />
        <div className="mt-6">
          <Suspense fallback={null}>
            <PromptBrowser />
          </Suspense>
        </div>
      </section>

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
