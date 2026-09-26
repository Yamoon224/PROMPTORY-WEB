import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  IconBolt,
  IconCheck,
  IconCoins,
  IconFolder,
  IconPencil,
  IconStar,
} from "@/components/ui/icons";

const FEATURES: Array<{
  index: string;
  tag: string;
  icon: ReactNode;
  title: string;
  description: string;
  mockup: ReactNode;
}> = [
  {
    index: "01",
    tag: "Créer",
    icon: <IconPencil className="h-4 w-4" />,
    title: "Construisez des prompts puissants.",
    description:
      "Éditeur intuitif avec variables, aperçu en temps réel et tests instantanés. Créez des prompts professionnels sans code, en quelques minutes.",
    mockup: <EditorMockup />,
  },
  {
    index: "02",
    tag: "Organiser",
    icon: <IconFolder className="h-4 w-4" />,
    title: "Gardez tout organisé et accessible.",
    description:
      "Bibliothèque cloud avec dossiers, tags et recherche. Accédez à tous vos prompts depuis n'importe quel appareil, n'importe quand, en sync automatique.",
    mockup: <OrganizeMockup />,
  },
  {
    index: "03",
    tag: "Vendre",
    icon: <IconCoins className="h-4 w-4" />,
    title: "Monétisez vos prompts sur la marketplace.",
    description:
      "Publiez vos meilleurs prompts, touchez 90% des ventes et construisez un revenu passif. L'extension Chrome gratuite facilite l'injection dans ChatGPT, Claude et Gemini.",
    mockup: <SellMockup />,
  },
  {
    index: "04",
    tag: "Injecter",
    icon: <IconBolt className="h-4 w-4" />,
    title: "Injectez vos prompts en un clic.",
    description:
      "L'extension Chrome gratuite insère vos prompts directement dans ChatGPT, Claude ou Gemini — sans copier-coller, via le raccourci ALT+P.",
    mockup: <InjectMockup />,
  },
];

export function LandingFeatures() {
  return (
    <section id="fonctionnalites" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
          Fonctionnalités
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Créez. Organisez. Vendez.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
          Un workflow complet, de la rédaction du prompt à sa monétisation.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-20">
        {FEATURES.map((feature, position) => (
          <div
            key={feature.index}
            className={cn(
              "grid items-center gap-10 md:grid-cols-2 md:gap-16",
              position % 2 === 1 && "md:[&>*:first-child]:order-2",
            )}
          >
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
                <span>{feature.index}</span>
                <span className="grad-brand-soft rounded-full px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
                  {feature.tag}
                </span>
              </div>
              <span className="grad-brand-soft mt-4 flex h-10 w-10 items-center justify-center rounded-sm text-brand-600 dark:text-brand-400">
                {feature.icon}
              </span>
              <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--muted)]">{feature.description}</p>
            </div>

            <div aria-hidden="true">{feature.mockup}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MockupWindow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--surface)] shadow-card">
      <div className="flex items-center gap-2 border-b border-[var(--hairline)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="mx-auto rounded-full bg-[var(--surface-muted)] px-4 py-1 text-xs text-[var(--muted)]">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function EditorMockup() {
  return (
    <MockupWindow title="prompt_editor.txt">
      <p className="font-mono text-[13px] leading-relaxed text-[var(--foreground)]/80">
        Tu es un expert en <Var>domaine</Var>.
        <br />
        Ton objectif est de <Var>objectif</Var>
        <br />
        en adoptant un ton <Var>ton</Var>.
        <br />
        <span className="text-[var(--muted)]"># Contraintes</span>
        <br />- Maximum <Var>nb_mots</Var> mots
        <br />- Format : <Var>format</Var>
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-[var(--hairline)] pt-3">
        <span className="text-xs text-[var(--muted)]">4 variables · Prêt</span>
        <span className="grad-brand rounded-full px-3 py-1 text-xs font-semibold text-white">Tester</span>
      </div>
    </MockupWindow>
  );
}

function OrganizeMockup() {
  const items = [
    { title: "Email froid B2B", tag: "Copy", starred: true },
    { title: "Rédacteur d'articles SEO", tag: "SEO", starred: true },
    { title: "Générateur de composants React", tag: "Dev", starred: false },
    { title: "Plan de présentation Pitch Deck", tag: "Business", starred: false },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--surface)] shadow-card">
      <ul className="divide-y divide-[var(--hairline)]">
        {items.map((item) => (
          <li key={item.title} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="flex min-w-0 items-center gap-2">
              <IconStar
                className={cn("h-3.5 w-3.5 shrink-0", item.starred ? "fill-brand-500 text-brand-500" : "text-[var(--muted)]")}
              />
              <span className="truncate text-sm font-medium text-[var(--foreground)]">{item.title}</span>
              <span className="grad-brand-soft shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:text-brand-300">
                {item.tag}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-[var(--hairline)] px-4 py-3">
        <span className="text-xs text-[var(--muted)]">4 prompts · Synchronisé</span>
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">+ Nouveau</span>
      </div>
    </div>
  );
}

function SellMockup() {
  const items = [
    { title: "Pack LinkedIn Ultime", seller: "0xAlpha", stars: 4.9, sales: 312, price: "29€" },
    { title: "Machine à emails froids", seller: "SalesAI", stars: 4.7, sales: 198, price: "14€" },
    { title: "Constructeur de clusters SEO", seller: "DevSys", stars: 4.5, sales: 840, price: "Gratuit" },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--surface)] shadow-card">
      <div className="flex items-center justify-between border-b border-[var(--hairline)] px-4 py-3">
        <span className="text-sm font-semibold text-[var(--foreground)]">Marketplace</span>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--muted)]">
          <span className="grad-brand rounded-full px-2.5 py-1 text-white">Tous</span>
          <span className="px-2.5 py-1">Premium</span>
          <span className="px-2.5 py-1">Free</span>
        </div>
      </div>
      <ul className="divide-y divide-[var(--hairline)]">
        {items.map((item) => (
          <li key={item.title} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--foreground)]">{item.title}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--muted)]">
                {item.seller}
                <IconStar className="h-3 w-3 fill-current text-amber-400" />
                {item.stars} · {item.sales} ventes
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-[var(--foreground)]">{item.price}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-[var(--hairline)] px-4 py-3 text-xs">
        <span className="text-[var(--muted)]">4,800+ prompts disponibles</span>
        <span className="font-semibold text-brand-600 dark:text-brand-400">Explorer →</span>
      </div>
    </div>
  );
}

function InjectMockup() {
  return (
    <MockupWindow title="chatgpt.com">
      <p className="text-xs font-medium text-[var(--muted)]">Zone de prompt ChatGPT</p>
      <p className="mt-2 rounded-md border border-dashed border-[var(--hairline)] px-3 py-3 text-sm text-[var(--muted)]">
        Envoyer un message à ChatGPT…
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-md bg-stone-900 px-3 py-2.5 text-white">
        <IconCheck className="h-4 w-4 shrink-0 text-emerald-400" />
        <span className="min-w-0 truncate text-sm font-medium">Machine à emails froids injectée</span>
        <span className="ml-auto shrink-0 text-[11px] text-white/60">via ALT+P · Promptory</span>
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">Compatible · ChatGPT · Claude · Gemini</p>
    </MockupWindow>
  );
}

function Var({ children }: { children: ReactNode }) {
  return <span className="rounded bg-brand-50 px-1 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">{`{${children}}`}</span>;
}
