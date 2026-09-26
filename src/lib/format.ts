/**
 * Formatage des valeurs metier, en francais.
 *
 * Centralise pour une raison precise : un montant affiche avec des centimes
 * ici et sans la, sur deux ecrans, fait douter des chiffres eux-memes.
 */

const LOCALE = "fr-FR";

/** Montant en euros, toujours a deux decimales : "4,99 €", "0,00 €". */
export function formatMoney(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Nombre entier avec separateur de milliers. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat(LOCALE).format(value);
}

export function formatPercent(ratio: number, digits = 0): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(ratio);
}

function toDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(value: string | null | undefined): string {
  const date = toDate(value);
  if (!date) return "-";

  return new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium" }).format(date);
}

export function formatDateTime(value: string | null | undefined): string {
  const date = toDate(value);
  if (!date) return "-";

  return new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

/** « il y a 3 jours » - pour un journal d'activite ou l'ordre importe plus que la date exacte. */
export function formatRelative(value: string | null | undefined): string {
  const date = toDate(value);
  if (!date) return "-";

  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });

  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(diffSeconds) >= secondsInUnit) {
      return formatter.format(Math.round(diffSeconds / secondsInUnit), unit);
    }
  }

  return formatter.format(diffSeconds, "second");
}

/** Arrondi a deux decimales, tel qu'attendu par un champ prix. */
export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}
