import Image from "next/image";
import { cn } from "@/lib/cn";

const PHOTOS = [
  {
    src: "/images/marketing/showcase-interaction-humaine-ia.webp",
    alt: "Interaction humaine avec une intelligence artificielle generative",
    rotate: "-rotate-3 sm:-translate-y-2",
  },
  {
    src: "/images/marketing/showcase-outils-assistants-virtuels.webp",
    alt: "Ingenieur de prompt utilisant des assistants virtuels IA",
    rotate: "rotate-2",
  },
  {
    src: "/images/marketing/showcase-chat-ia-technology.webp",
    alt: "Conversation avec un chatbot IA depuis un ordinateur portable",
    rotate: "-rotate-2 sm:translate-y-2",
  },
];

/**
 * Bande visuelle entre le pitch acheteur/createur et les raisons de choisir
 * Promptory : montre l'usage reel de l'IA au quotidien, en reprenant le
 * meme langage de cartes legerement pivotees que le hero.
 */
export function AIExperienceGallery() {
  return (
    <section className="py-10">
      <h2 className="font-display text-2xl font-semibold tracking-tight">L&apos;IA, un outil du quotidien</h2>
      <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
        Des prompts penses pour les memes usages que vous pratiquez deja : assistants conversationnels, generation de
        contenu, automatisation.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--hairline)] shadow-card transition-transform duration-300 hover:z-10 hover:-translate-y-1.5 hover:rotate-0",
              photo.rotate,
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
