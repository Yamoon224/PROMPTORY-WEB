import { LandingCtaBanner } from "@/features/landing/LandingCtaBanner";
import { LandingFaq } from "@/features/landing/LandingFaq";
import { LandingFeatures } from "@/features/landing/LandingFeatures";
import { LandingFinalCta } from "@/features/landing/LandingFinalCta";
import { LandingHero } from "@/features/landing/LandingHero";
import { LandingMarketplace } from "@/features/landing/LandingMarketplace";
import { LandingPacks } from "@/features/landing/LandingPacks";
import { LandingPricing } from "@/features/landing/LandingPricing";
import { LandingStats } from "@/features/landing/LandingStats";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingCtaBanner />
      <LandingMarketplace />
      <LandingPacks />
      <LandingPricing />
      <LandingStats />
      <LandingFaq />
      <LandingFinalCta />
    </>
  );
}
