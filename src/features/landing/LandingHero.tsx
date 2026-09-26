import { LinkButton } from "@/components/ui";
import { IconArrowRight, IconBolt, IconCheck, IconSparkle, IconStar } from "@/components/ui/icons";

const TOOLS = [
  { name: "ChatGPT", letter: "C" },
  { name: "Claude", letter: "A" },
  { name: "Gemini", letter: "G" },
  { name: "Perplexity", letter: "P" },
];

const FOLDERS = [
  { label: "Marketing", count: 12 },
  { label: "SEO", count: 8 },
  { label: "Dev", count: 15 },
  { label: "Copywriting", count: 6 },
];

const PROMPTS = [
  { title: "Rédacteur d'articles SEO", tag: "SEO", starred: true },
  { title: "Générateur de composants React", tag: "Dev", starred: false },
  { title: "Machine à emails froids", tag: "Copy", starred: true, price: "14€" },
];

/**
 * Hero de la landing publique : la promesse produit a gauche, une
 * reconstitution de l'app (pas une vraie capture) a droite. La maquette est
 * decorative - le contenu utile a un lecteur d'ecran est deja dans le texte
 * qui la precede.
 */
export function LandingHero() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[var(--surface-muted)]">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
        <p className="grad-brand-soft mx-auto inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
          <IconSparkle className="h-3.5 w-3.5" />
          Extension Chrome gratuite incluse
        </p>

        <h1 className="font-display mx-auto mt-6 max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-[4rem]">
          Créez, organisez et vendez vos prompts IA.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          La plateforme complète pour créer des prompts IA, les organiser dans votre bibliothèque privée et les
          vendre sur la marketplace.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/inscription" size="lg" icon={<IconBolt className="h-5 w-5" />}>
            Installer gratuitement
          </LinkButton>
          <LinkButton href="/#marketplace" variant="secondary" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
            Voir la marketplace
          </LinkButton>
        </div>

        <p className="mt-4 text-sm text-[var(--muted)]">Gratuit · Sans carte bancaire · Installé en 30s</p>

        <div className="relative mx-auto mt-14 max-w-4xl" aria-hidden="true">
          <AppMockup />

          <div className="animate-float-slow absolute -bottom-6 -left-4 hidden rounded-md border border-[var(--hairline)] bg-[var(--surface)] p-3.5 text-left shadow-card sm:block">
            <p className="text-xs font-medium text-[var(--muted)]">Ventes ce mois</p>
            <p className="font-display mt-1 text-xl font-semibold text-[var(--foreground)]">1 840€</p>
            <p className="mt-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">↗ +23% vs mois dernier</p>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Fonctionne avec vos outils IA
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TOOLS.map((tool) => (
              <span key={tool.name} className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
                <span className="grad-brand-soft flex h-6 w-6 items-center justify-center rounded-sm text-[11px] font-bold text-brand-700 dark:text-brand-300">
                  {tool.letter}
                </span>
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AppMockup() {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--surface)] shadow-card-hover">
      <div className="flex items-center gap-2 border-b border-[var(--hairline)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="mx-auto rounded-md bg-[var(--surface-muted)] px-4 py-1 text-xs text-[var(--muted)]">
          app.promptory.io
        </span>
      </div>

      <div className="grid grid-cols-1 text-left sm:grid-cols-[13rem_1fr]">
        <aside className="hidden border-r border-[var(--hairline)] p-4 sm:block">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Dossiers</p>
          <ul className="mt-3 space-y-2">
            {FOLDERS.map((folder) => (
              <li key={folder.label} className="flex items-center justify-between text-sm text-[var(--foreground)]/80">
                <span>{folder.label}</span>
                <span className="text-xs text-[var(--muted)]">{folder.count}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-medium text-[var(--muted)]">Favoris</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Injectés récemment</p>
        </aside>

        <div className="min-w-0 p-4">
          <div className="flex items-center gap-2">
            <span className="flex-1 rounded-md bg-[var(--surface-muted)] px-3.5 py-2 text-sm text-[var(--muted)]">
              Rechercher un prompt…
            </span>
            <span className="grad-brand flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white">
              +
            </span>
          </div>

          <div className="relative mt-4">
            <ul className="divide-y divide-[var(--hairline)] overflow-hidden rounded-sm border border-[var(--hairline)]">
              {PROMPTS.map((prompt) => (
                <li key={prompt.title} className="flex items-center justify-between gap-3 bg-[var(--surface)] px-3 py-2.5">
                  <span className="flex min-w-0 items-center gap-2">
                    <IconStar
                      className={`h-3.5 w-3.5 shrink-0 ${prompt.starred ? "fill-brand-500 text-brand-500" : "text-[var(--muted)]"}`}
                    />
                    <span className="truncate text-sm font-medium text-[var(--foreground)]">{prompt.title}</span>
                    <span className="grad-brand-soft shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:text-brand-300">
                      {prompt.tag}
                    </span>
                  </span>
                  {prompt.price ? (
                    <span className="shrink-0 text-xs font-semibold text-[var(--muted)]">{prompt.price}</span>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="animate-float-fast absolute -right-3 -top-6 hidden items-center gap-2 rounded-md border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1.5 shadow-card sm:flex">
              <IconBolt className="h-3.5 w-3.5 text-brand-500" />
              <span className="text-xs font-semibold text-[var(--foreground)]">Prompt injecté</span>
              <span className="text-[11px] text-[var(--muted)]">via ALT+P · ChatGPT</span>
            </div>
          </div>

          <div className="mt-4 rounded-sm border border-[var(--hairline)] p-3.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                Aperçu · Machine à emails froids
              </p>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Publié
              </span>
            </div>
            <p className="mt-2.5 font-mono text-[13px] leading-relaxed text-[var(--foreground)]/80">
              Tu es un expert en <Var>domaine</Var>. Ton objectif est de <Var>objectif</Var> en adoptant un ton{" "}
              <Var>ton</Var>.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-[var(--hairline)] pt-3">
              <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                <IconCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                3 variables · Injecté dans ChatGPT
              </span>
              <span className="rounded-md border border-[var(--hairline)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                ▷ Tester
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Var({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-brand-50 px-1 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">{`{${children}}`}</span>;
}
