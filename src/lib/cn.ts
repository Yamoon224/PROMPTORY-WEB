/**
 * Concatenation conditionnelle de classes, sans dependance externe.
 *
 * Un simple `.filter(Boolean).join(" ")` suffit au besoin reel : composer une
 * dependance de plus (clsx, tailwind-merge) pour cinq lignes de logique
 * ajouterait un import a suivre pour rien.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
