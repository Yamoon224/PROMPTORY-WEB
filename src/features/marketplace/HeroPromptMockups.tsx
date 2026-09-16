import { IconPrompt, IconRobot, IconSparkle } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const MOCKUPS = [
  { icon: IconRobot, label: "Assistant conversationnel", rotate: "-rotate-6 -translate-x-20 sm:-translate-x-28", z: "z-10" },
  { icon: IconSparkle, label: "Generation d'image", rotate: "rotate-0", z: "z-20" },
  { icon: IconPrompt, label: "Redaction & marketing", rotate: "rotate-6 translate-x-20 sm:translate-x-28", z: "z-10" },
];

/**
 * Le hero de reference n'a pas d'illustration produit (juste du texte) : sans
 * photo de prompt a montrer, on dessine plutot une mini-maquette de la carte
 * produit reelle (`PromptCard`) — trois exemplaires en eventail, texte
 * factice. Plus honnete qu'une photo de stock sans rapport avec le produit.
 */
export function HeroPromptMockups() {
  return (
    <div className="relative mt-10 flex h-36 w-full items-center justify-center sm:h-44">
      {MOCKUPS.map((mockup) => (
        <div
          key={mockup.label}
          aria-hidden="true"
          className={cn(
            "absolute w-40 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-3 text-left shadow-card sm:w-52",
            mockup.rotate,
            mockup.z,
          )}
        >
          <div className="flex items-center gap-2">
            <span className="grad-brand flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-white">
              <mockup.icon className="h-3.5 w-3.5" />
            </span>
            <span className="truncate text-[11px] font-bold text-zinc-700 dark:text-zinc-200">{mockup.label}</span>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <span className="block h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <span className="block h-1.5 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <span className="block h-1.5 w-3/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
