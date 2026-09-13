import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-[var(--hairline)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo tagline />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            Trouvez, achetez et vendez des prompts IA prets a l&apos;emploi pour
            ChatGPT, Claude, Midjourney et bien d&apos;autres outils.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Explorer</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-brand-600">
                Tous les prompts
              </Link>
            </li>
            <li>
              <Link href="/packs" className="hover:text-brand-600">
                Packs
              </Link>
            </li>
            <li>
              <Link href="/inscription" className="hover:text-brand-600">
                Devenir createur
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Compte</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/connexion" className="hover:text-brand-600">
                Se connecter
              </Link>
            </li>
            <li>
              <Link href="/espace/mes-achats" className="hover:text-brand-600">
                Mes achats
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-1 grad-brand" />
    </footer>
  );
}
