import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@/components/ui/icons";

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Produit",
    links: [
      { href: "/#marketplace", label: "Marketplace" },
      { href: "/#packs", label: "Packs" },
      { href: "/#fonctionnalites", label: "Fonctionnalités" },
      { href: "/#tarifs", label: "Tarifs" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/documentation-api", label: "Documentation API" },
      { href: "/aide", label: "Centre d'aide" },
      { href: "/statut", label: "Statut du service" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
      { href: "/mentions-legales", label: "Mentions légales" },
    ],
  },
];

const SOCIALS = [
  { href: "https://x.com/promptory", label: "X (Twitter)", icon: IconBrandX },
  { href: "https://linkedin.com", label: "LinkedIn", icon: IconBrandLinkedin },
  { href: "https://github.com", label: "GitHub", icon: IconBrandGithub },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print mt-16 border-t border-[var(--hairline)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            La plateforme tout-en-un pour créer, organiser et monétiser vos prompts IA - avec une extension Chrome
            pour les injecter en un clic.
          </p>
          <div className="mt-4 flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--hairline)] text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-[var(--foreground)]">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[var(--muted)] hover:text-[var(--foreground)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">Contact</p>
          <p className="mt-3 text-sm text-[var(--muted)]">Paris, France</p>
          <a href="mailto:hello@promptory.io" className="mt-2 block text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
            hello@promptory.io
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--hairline)] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-[var(--muted)]">© {year} Promptory. Tous droits réservés.</p>
          <p className="text-xs text-[var(--muted)]">Conçu pour les créateurs et développeurs</p>
        </div>
      </div>
    </footer>
  );
}
