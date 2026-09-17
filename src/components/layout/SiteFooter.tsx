import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { PaymentLogos } from "@/components/brand/PaymentLogos";

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
    <footer className="no-print relative mt-16 overflow-hidden">
      <div aria-hidden="true" className="grad-brand absolute inset-0" />
      <div aria-hidden="true" className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tagline tone="onBrand" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Trouvez, achetez et vendez des prompts IA prets a l&apos;emploi pour
            ChatGPT, Claude, Midjourney et bien d&apos;autres outils.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative border-t border-white/15 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/60">© {year} Promptory. Tous droits reserves.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Paiement securise</span>
            <PaymentLogos />
          </div>
        </div>
      </div>
    </footer>
  );
}
