import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Explorer",
    links: [
      { href: "/", label: "Tous les prompts" },
      { href: "/packs", label: "Packs" },
      { href: "/#categories", label: "Categories" },
    ],
  },
  {
    title: "Createurs",
    links: [
      { href: "/inscription", label: "Devenir createur" },
      { href: "/espace/mes-prompts/nouveau", label: "Publier un prompt" },
      { href: "/espace/mes-packs/nouveau", label: "Publier un pack" },
    ],
  },
  {
    title: "Compte",
    links: [
      { href: "/connexion", label: "Se connecter" },
      { href: "/espace/mes-achats", label: "Mes achats" },
      { href: "/espace", label: "Mon espace" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print mt-16 border-t border-[var(--hairline)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tagline />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            Trouvez, achetez et vendez des prompts IA prets a l&apos;emploi pour
            ChatGPT, Claude, Midjourney et bien d&apos;autres outils.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-zinc-600 hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--hairline)] px-4 py-4 sm:px-6">
        <p className="mx-auto max-w-6xl text-xs text-[var(--muted)]">© {year} Promptory. Tous droits reserves.</p>
      </div>
      <div className="h-1 grad-brand" />
    </footer>
  );
}
