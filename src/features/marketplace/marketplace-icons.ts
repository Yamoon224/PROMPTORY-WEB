import { IconArchive, IconGrid, IconPrompt, IconRobot, IconSparkle, IconTag } from "@/components/ui/icons";

/**
 * Rotation decorative partagee (chips de categorie, couverture de carte) :
 * un identifiant stable (id de categorie, de prompt…) choisit toujours la
 * meme icone, pour que le meme repere visuel revienne d'un ecran a l'autre
 * sans porter de sens propre.
 *
 * Expose seulement le tableau plutot qu'une fonction de selection : un appel
 * de fonction dont le resultat sert de balise JSX est lu par la regle
 * `react-hooks/static-components` comme un composant recree a chaque rendu,
 * alors qu'un simple acces indexe (`DECORATIVE_ICONS[i]`) ne l'est pas.
 */
export const DECORATIVE_ICONS = [IconSparkle, IconRobot, IconPrompt, IconGrid, IconTag, IconArchive];
