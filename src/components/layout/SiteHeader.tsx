"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LinkButton } from "@/components/ui";
import { IconCart, IconClose, IconMenu, IconPackage, IconUser } from "@/components/ui/icons";
import { useAuth } from "@/features/auth/AuthContext";
import { useCart } from "@/features/cart/CartContext";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/#marketplace", label: "Marketplace" },
  { href: "/#fonctionnalites", label: "Fonctionnalités" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * En-tete de la marketplace publique.
 *
 * Detachee des bords plutot que collee en bandeau plein largeur : une
 * capsule qui flotte au-dessus du canevas, avec le papier qui respire tout
 * autour. Le menu mobile se deplie sous cette capsule, en carte propre,
 * plutot qu'en bandeau qui reprendrait la largeur entiere de l'ecran.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { count } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="no-print sticky top-3 z-30 sm:top-4">
      <div className="mx-[5%] flex h-14 items-center justify-between gap-4 rounded-md border border-[var(--hairline)] bg-[var(--surface)]/90 px-3 shadow-card backdrop-blur-md sm:px-4">
        <Link href="/" className="rounded-md pl-1" aria-label="Promptory, accueil">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "rounded-md px-3.5 py-2 text-sm font-semibold transition-colors",
                pathname === link.href
                  ? "grad-brand-soft text-brand-700 dark:text-brand-300"
                  : "text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-50",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <CartLink count={count} />
          <ThemeToggle />
          {user ? (
            <LinkButton href="/espace" variant="secondary" size="sm" icon={<IconUser className="h-3.5 w-3.5" />}>
              Mon espace
            </LinkButton>
          ) : (
            <>
              <Link
                href="/connexion"
                className="rounded-md px-3.5 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-50"
              >
                Connexion
              </Link>
              <LinkButton href="/inscription" size="sm">
                S&apos;inscrire
              </LinkButton>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <CartLink count={count} />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="rounded-md p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {isOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="animate-fade-rise mx-[5%] mt-2 rounded-md border border-[var(--hairline)] bg-[var(--surface)] p-4 shadow-card md:hidden">
          <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-brand-50 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                <IconPackage className="h-4 w-4 text-brand-600" />
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--hairline)] pt-3">
            <ThemeToggle showLabels />
            {user ? (
              <LinkButton href="/espace" variant="secondary" size="sm" onClick={() => setIsOpen(false)}>
                Mon espace
              </LinkButton>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/connexion"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-stone-600 dark:text-stone-300"
                >
                  Connexion
                </Link>
                <LinkButton href="/inscription" size="sm" onClick={() => setIsOpen(false)}>
                  S&apos;inscrire
                </LinkButton>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** Lien vers le panier, avec le compte d'articles en pastille des qu'il n'est pas vide. */
function CartLink({ count }: { count: number }) {
  return (
    <Link
      href="/panier"
      aria-label={count > 0 ? `Panier, ${count} article${count > 1 ? "s" : ""}` : "Panier"}
      className="relative flex h-9 w-9 items-center justify-center rounded-sm text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50"
    >
      <IconCart className="h-5 w-5" />
      {count > 0 ? (
        <span className="grad-brand absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}
