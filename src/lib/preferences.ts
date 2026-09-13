/**
 * Stockage local des preferences (theme, densite de table, etc.), avec
 * abonnement pour que plusieurs onglets restent synchronises.
 *
 * Isole ici pour que `usePreference` n'ait jamais a se soucier d'un
 * `localStorage` indisponible (navigation privee) ou d'un evenement `storage`
 * qui ne se declenche pas dans l'onglet emetteur.
 */

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();

export function readPreference(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writePreference(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* navigation privee ou stockage plein : la preference ne survivra pas au rechargement */
  }
  notify(key);
}

function notify(key: string): void {
  listeners.get(key)?.forEach((listener) => listener());
}

export function subscribePreference(key: string, listener: Listener): () => void {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === key) listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.get(key)?.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
