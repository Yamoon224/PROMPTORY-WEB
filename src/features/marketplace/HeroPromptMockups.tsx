import Image from "next/image";
import { cn } from "@/lib/cn";

const MOCKUPS = [
  {
    label: "Assistant conversationnel",
    image: "/images/marketing/hero-assistant-conversationnel.webp",
    rotate: "-rotate-6 -translate-x-20 sm:-translate-x-28",
    z: "z-10",
  },
  {
    label: "Generation d'image",
    image: "/images/marketing/hero-generation-image.webp",
    rotate: "rotate-0",
    z: "z-20",
  },
  {
    label: "Redaction & marketing",
    image: "/images/marketing/hero-redaction-marketing.webp",
    rotate: "rotate-6 translate-x-20 sm:translate-x-28",
    z: "z-10",
  },
];

/**
 * Fan de trois cartes reprenant le format de `PromptCard`, chacune illustree
 * par une photo d'usage reel d'un assistant IA plutot que par des lignes
 * de texte factices.
 */
export function HeroPromptMockups() {
  return (
    <div className="relative mt-10 flex h-36 w-full items-center justify-center sm:h-44">
      {MOCKUPS.map((mockup) => (
        <div
          key={mockup.label}
          aria-hidden="true"
          className={cn(
            "absolute w-40 overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--surface)] shadow-card transition-transform duration-300 hover:z-30 hover:-translate-y-1 sm:w-52",
            mockup.rotate,
            mockup.z,
          )}
        >
          <div className="relative h-24 w-full sm:h-32">
            <Image src={mockup.image} alt="" fill sizes="208px" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 grad-brand-soft h-1/2" />
            <span className="absolute bottom-1.5 left-2.5 truncate text-[11px] font-bold text-white drop-shadow-sm">
              {mockup.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
