"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui";
import { IconLogout, IconMenu, IconPanelLeft } from "@/components/ui/icons";
import { useAuth } from "@/features/auth/AuthContext";
import { findNavItem } from "./nav-config";

/** En-tete de l'espace : ou l'on est, le theme, la deconnexion. */
export function Topbar({ onOpenNavigation, onToggleSidebar }: { onOpenNavigation: () => void; onToggleSidebar: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isLeaving, setIsLeaving] = useState(false);

  const current = findNavItem(pathname);

  async function leave() {
    setIsLeaving(true);
    await logout().catch(() => undefined);
    router.replace("/connexion");
  }

  return (
    <header className="no-print sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-[var(--hairline)] bg-[var(--surface)]/85 px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenNavigation}
          aria-label="Ouvrir la navigation"
          className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 md:hidden dark:hover:bg-zinc-800"
        >
          <IconMenu className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Replier ou deplier la barre laterale"
          className="hidden rounded-full p-2 text-zinc-500 hover:bg-zinc-100 md:inline-flex dark:hover:bg-zinc-800"
        >
          <IconPanelLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{current?.label ?? "Mon profil"}</p>
          <p className="hidden truncate text-xs text-[var(--muted)] sm:block">
            {current?.description ?? "Compte et preferences d'affichage"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/" className="hidden text-xs font-semibold text-[var(--muted)] hover:text-brand-600 lg:inline">
          Marketplace
        </Link>
        <ThemeToggle className="hidden sm:inline-flex" />
        <Button variant="ghost" size="sm" onClick={leave} isLoading={isLeaving} icon={<IconLogout className="h-4 w-4" />}>
          <span className="hidden sm:inline">Deconnexion</span>
        </Button>
      </div>
    </header>
  );
}
