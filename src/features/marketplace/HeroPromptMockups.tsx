import Image from "next/image";
import { IconPrompt } from "@/components/ui/icons";
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
    image: null,
    rotate: "rotate-6 translate-x-20 sm:translate-x-28",
    z: "z-10",
  },
];

/**
 * Fan de trois cartes reprenant le format de `PromptCard` : deux illustrees
 * par une photo (usage reel d'un assistant IA), la troisieme gardee en
 * maquette texte pour ne pas repeter trois fois la meme photo de stock.
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
          {mockup.image ? (
            <div className="relative h-24 w-full sm:h-32">
              <Image src={mockup.image} alt="" fill sizes="208px" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 grad-brand-soft h-1/2" />
              <span className="absolute bottom-1.5 left-2.5 truncate text-[11px] font-bold text-white drop-shadow-sm">
                {mockup.label}
              </span>
            </div>
          ) : (
            <div className="p-3 text-left">
              <div className="flex items-center gap-2">
                <span className="grad-brand flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-white">
                  <IconPrompt className="h-3.5 w-3.5" />
                </span>
                <span className="truncate text-[11px] font-bold text-zinc-700 dark:text-zinc-200">{mockup.label}</span>
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                <span className="block h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <span className="block h-1.5 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <span className="block h-1.5 w-3/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
