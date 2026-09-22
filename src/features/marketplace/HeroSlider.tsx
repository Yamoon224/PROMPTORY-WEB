"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  IconCart,
  IconCheckCircle,
  IconCoins,
  IconCreditCard,
  IconDownload,
  IconLock,
  IconSparkle,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const SLIDES = [
  {
    image: "/images/marketing/hero-assistant-conversationnel.webp",
    icon: IconCart,
    badge: "bg-white text-brand-700",
    title: "Comment acheter vos prompts",
    text: "Trouvez et payez en quelques clics",
    items: ["1. Parcourez le catalogue", "2. Choisissez votre prompt", "3. Payez par carte ou PayPal"],
  },
  {
    image: "/images/marketing/hero-redaction-marketing.webp",
    icon: IconCoins,
    badge: "bg-brand-200 text-brand-800",
    title: "Devenez createur",
    text: "Publiez vos prompts et suivez vos ventes",
    items: ["1. Creez votre compte createur", "2. Publiez prompts ou packs", "3. Suivez vos revenus en direct"],
  },
  {
    image: "/images/marketing/hero-generation-image.webp",
    icon: IconDownload,
    badge: "bg-white text-brand-700",
    title: "Acces immediat",
    text: "Pret a copier-coller des l'achat valide",
    items: ["1. Paiement confirme", "2. Prompt livre a l'instant", "3. Disponible dans votre espace"],
  },
  {
    image: "/images/marketing/showcase-outils-assistants-virtuels.webp",
    icon: IconLock,
    badge: "bg-brand-200 text-brand-800",
    title: "Paiement securise",
    text: "Aucune donnee bancaire stockee chez nous",
    items: ["1. Createurs moderes", "2. Paiement carte ou PayPal", "3. Support reactif en cas de souci"],
  },
];

const SLIDE_DURATION_MS = 4500;

/**
 * Vignette produit du hero : un carrousel de quatre etapes cle du parcours
 * (achat, vente, livraison du prompt, securite), chacune illustree par une
 * photo. Avance seule et se relance au clic sur un point, comme une
 * mini-demo plutot qu'une simple image statique.
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-pop-in relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute -top-6 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-xl ring-2 ring-brand-300/40">
          <Image src="/brand/logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
          <span className="text-sm font-extrabold text-brand-700">Promptory</span>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/30">
        {SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.title}
            className={cn(
              "absolute inset-0 transition-all duration-700",
              slideIndex === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0",
            )}
          >
            <Image src={slide.image} alt={slide.title} fill sizes="(min-width: 768px) 28rem, 90vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
            <div className="relative flex h-full flex-col items-center justify-end p-6 text-center text-white">
              <div
                className={cn(
                  "mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg",
                  slide.badge,
                )}
              >
                <slide.icon className="h-4 w-4" />
                Etape {slideIndex + 1} sur {SLIDES.length}
              </div>
              <h3 className="font-display text-2xl font-semibold drop-shadow-lg">{slide.title}</h3>
              <p className="mt-1 text-sm opacity-95 drop-shadow">{slide.text}</p>
              <ul className="mt-3 w-full space-y-1.5 text-left text-sm">
                {slide.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/15 px-3 py-1.5 backdrop-blur-sm">
                    <IconCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="absolute -left-3 top-8 z-10 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-brand-700 shadow-xl ring-1 ring-[var(--hairline)] animate-float-fast">
          <span className="flex items-center gap-2">
            <IconCreditCard className="h-4 w-4 text-brand-500" />
            Carte / PayPal
          </span>
        </div>
        <div className="absolute -right-3 top-1/3 z-10 rounded-2xl bg-brand-500 px-3 py-2 text-xs font-bold text-white shadow-xl animate-float-slow">
          <span className="inline-flex items-center gap-1">
            <IconSparkle className="h-3.5 w-3.5" />
            Createurs verifies
          </span>
        </div>
        <div className="absolute -bottom-2 left-1/4 z-10 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-brand-700 shadow-xl ring-1 ring-[var(--hairline)] animate-float-fast [animation-delay:1s]">
          <span className="flex items-center gap-2">
            <IconDownload className="h-4 w-4 text-brand-500" />
            Acces immediat
          </span>
        </div>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Etape ${slideIndex + 1}`}
              onClick={() => setIndex(slideIndex)}
              className={cn(
                "h-2 rounded-full transition-all",
                slideIndex === index ? "w-6 bg-white" : "w-2 bg-white/50",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
