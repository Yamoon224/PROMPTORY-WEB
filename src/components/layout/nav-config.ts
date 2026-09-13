import type { ComponentType } from "react";
import {
  IconCart,
  IconCheckCircle,
  IconCoins,
  IconCreditCard,
  IconDashboard,
  IconFolder,
  IconGrid,
  IconHistory,
  IconPackage,
  IconPrompt,
  IconRobot,
  IconTag,
  IconUser,
  IconUsers,
} from "@/components/ui/icons";
import type { IconProps } from "@/components/ui/icons";

/**
 * Navigation de l'espace connecte.
 *
 * Une permission vide (`""`) signifie « visible pour tout compte connecte » :
 * a la difference d'un back-office multi-role classique, chaque utilisateur
 * de Promptory a un espace createur (ses prompts, ses achats, son
 * abonnement), permission ou non. Seules la moderation et l'administration
 * exigent une permission dediee.
 */
export interface NavItem {
  href: string;
  label: string;
  description: string;
  permission: string;
  icon: ComponentType<IconProps>;
  group: "Mon activite" | "Moderation" | "Administration";
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/espace",
    label: "Tableau de bord",
    description: "Vue d'ensemble de votre activite",
    permission: "",
    icon: IconDashboard,
    group: "Mon activite",
  },
  {
    href: "/espace/mes-prompts",
    label: "Mes prompts",
    description: "Creation, edition et suivi de vos prompts",
    permission: "",
    icon: IconPrompt,
    group: "Mon activite",
  },
  {
    href: "/espace/mes-dossiers",
    label: "Mes dossiers",
    description: "Organisation de vos prompts crees et achetes",
    permission: "",
    icon: IconFolder,
    group: "Mon activite",
  },
  {
    href: "/espace/mes-packs",
    label: "Mes packs",
    description: "Lots de prompts groupes a prix unique",
    permission: "",
    icon: IconPackage,
    group: "Mon activite",
  },
  {
    href: "/espace/mes-achats",
    label: "Mes achats",
    description: "Historique de vos prompts achetes",
    permission: "",
    icon: IconCart,
    group: "Mon activite",
  },
  {
    href: "/espace/mes-ventes",
    label: "Mes ventes",
    description: "Revenus generes par vos creations",
    permission: "",
    icon: IconCoins,
    group: "Mon activite",
  },
  {
    href: "/espace/mon-abonnement",
    label: "Mon abonnement",
    description: "Createur premium et extension premium",
    permission: "",
    icon: IconCreditCard,
    group: "Mon activite",
  },
  {
    href: "/espace/profil",
    label: "Profil",
    description: "Informations de votre compte",
    permission: "",
    icon: IconUser,
    group: "Mon activite",
  },
  {
    href: "/espace/moderation/prompts",
    label: "Prompts a valider",
    description: "File d'attente de moderation",
    permission: "prompts.moderate",
    icon: IconCheckCircle,
    group: "Moderation",
  },
  {
    href: "/espace/moderation/packs",
    label: "Packs a valider",
    description: "File d'attente de moderation",
    permission: "prompts.moderate",
    icon: IconPackage,
    group: "Moderation",
  },
  {
    href: "/espace/categories",
    label: "Categories",
    description: "Referentiel partage de la marketplace",
    permission: "platform.manage",
    icon: IconGrid,
    group: "Administration",
  },
  {
    href: "/espace/tags",
    label: "Tags",
    description: "Referentiel partage de la marketplace",
    permission: "platform.manage",
    icon: IconTag,
    group: "Administration",
  },
  {
    href: "/espace/ia-models",
    label: "Outils IA",
    description: "ChatGPT, Claude, Midjourney…",
    permission: "platform.manage",
    icon: IconRobot,
    group: "Administration",
  },
  {
    href: "/espace/utilisateurs",
    label: "Utilisateurs",
    description: "Comptes et roles",
    permission: "platform.manage",
    icon: IconUsers,
    group: "Administration",
  },
  {
    href: "/espace/ventes",
    label: "Toutes les ventes",
    description: "Suivi des transactions de la plateforme",
    permission: "platform.manage",
    icon: IconCoins,
    group: "Administration",
  },
  {
    href: "/espace/abonnements",
    label: "Abonnements",
    description: "Createurs et extension premium",
    permission: "platform.manage",
    icon: IconCreditCard,
    group: "Administration",
  },
  {
    href: "/espace/journal",
    label: "Journal d'activite",
    description: "Qui a fait quoi, et quand",
    permission: "platform.manage",
    icon: IconHistory,
    group: "Administration",
  },
];

export function findNavItem(pathname: string): NavItem | undefined {
  // L'entree la plus specifique l'emporte : « /espace » ne doit pas capter
  // « /espace/mes-prompts ».
  return [...NAV_ITEMS]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
}
