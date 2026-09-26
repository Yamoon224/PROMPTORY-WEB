"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { usePreference } from "@/hooks/usePreference";

export type CartItemKind = "prompt" | "pack";

export interface CartItem {
  kind: CartItemKind;
  id: number;
  title: string;
  slug: string;
  price: number;
  isFree: boolean;
  creatorName: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isInCart: (kind: CartItemKind, id: number) => boolean;
  add: (item: CartItem) => void;
  remove: (kind: CartItemKind, id: number) => void;
  toggle: (item: CartItem) => void;
  clear: () => void;
}

const CART_STORAGE_KEY = "promptory_cart";
const EMPTY_CART = "[]";

const CartContext = createContext<CartContextValue | null>(null);

function sameItem(item: CartItem, kind: CartItemKind, id: number): boolean {
  return item.kind === kind && item.id === id;
}

function parseCart(raw: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

/**
 * Panier multi-articles (prompts et packs), uniquement cote client.
 *
 * Il n'existe aucune ressource « panier » cote API : chaque article s'achete
 * deja un par un via `/prompts/{id}/purchase` ou `/packs/{id}/purchase`. Le
 * panier ne fait donc que regrouper ces achats a l'ecran et les rejoue en
 * sequence au moment de payer (voir `CartView`).
 *
 * Persiste via `usePreference` - le meme stockage que le theme - plutot qu'un
 * `useState` + `useEffect` maison : le rendu serveur et la premiere passe
 * d'hydratation voient donc un panier vide sans jamais diverger du client, et
 * plusieurs onglets restent synchronises.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = usePreference(CART_STORAGE_KEY, EMPTY_CART);
  const items = useMemo(() => parseCart(raw), [raw]);

  const isInCart = useCallback((kind: CartItemKind, id: number) => items.some((item) => sameItem(item, kind, id)), [items]);

  const add = useCallback(
    (item: CartItem) => {
      if (items.some((existing) => sameItem(existing, item.kind, item.id))) return;
      setRaw(JSON.stringify([...items, item]));
    },
    [items, setRaw],
  );

  const remove = useCallback(
    (kind: CartItemKind, id: number) => {
      setRaw(JSON.stringify(items.filter((item) => !sameItem(item, kind, id))));
    },
    [items, setRaw],
  );

  const toggle = useCallback(
    (item: CartItem) => {
      const next = items.some((existing) => sameItem(existing, item.kind, item.id))
        ? items.filter((existing) => !sameItem(existing, item.kind, item.id))
        : [...items, item];
      setRaw(JSON.stringify(next));
    },
    [items, setRaw],
  );

  const clear = useCallback(() => setRaw(EMPTY_CART), [setRaw]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.isFree ? 0 : item.price), 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, count: items.length, subtotal, isInCart, add, remove, toggle, clear }),
    [items, subtotal, isInCart, add, remove, toggle, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart doit etre utilise a l'interieur d'un CartProvider.");
  }

  return context;
}
