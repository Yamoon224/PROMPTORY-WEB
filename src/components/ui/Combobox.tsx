"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/cn";
import { Field } from "./Field";
import { IconCheck, IconChevronDown, IconClose, IconSearch } from "./icons";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxShellProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  searchPlaceholder: string;
  children: ReactNode;
}

/**
 * Coquille partagee par les deux selecteurs a recherche : bascule d'ouverture,
 * fermeture au clic exterieur ou a Echap, et champ de recherche focalise a
 * l'ouverture.
 *
 * Rendue directement comme enfant de `.field-shell` (jamais dans un `<div>`
 * intermediaire) : elle se positionne grace au `position: relative` deja
 * porte par `.field-shell`, et n'a donc pas besoin d'un conteneur a elle -
 * conteneur qui casserait la relation de fraternite CSS exigee par le libelle
 * flottant (voir le commentaire sur `.field-control` plus bas).
 */
const ComboboxPanel = forwardRef<HTMLDivElement, ComboboxShellProps>(function ComboboxPanel(
  { isOpen, onOpenChange, query, onQueryChange, searchPlaceholder, children },
  ref,
) {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] shadow-card">
      <div className="relative border-b border-[var(--hairline)] p-1.5">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") onOpenChange(false);
          }}
          placeholder={searchPlaceholder}
          className="w-full rounded-full bg-transparent py-1.5 pl-7 pr-2 text-sm text-[var(--foreground)] outline-none placeholder:text-stone-400"
        />
      </div>
      <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
        {children}
      </ul>
    </div>
  );
});

/** Ferme le panneau au clic en dehors de l'un ou l'autre des elements references. */
function useOutsideClose(isOpen: boolean, onClose: () => void, refs: Array<RefObject<HTMLElement | null>>) {
  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      const isInside = refs.some((ref) => ref.current?.contains(target));
      if (!isInside) onClose();
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `refs` est un tableau litteral stable en pratique (memes objets ref a chaque rendu)
  }, [isOpen, onClose]);
}

interface SearchableSelectFieldProps {
  label: string;
  options: ComboboxOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  errors?: string[];
  hint?: ReactNode;
  placeholder?: string;
  emptyLabel?: string;
  required?: boolean;
  disabled?: boolean;
  clearable?: boolean;
}

/**
 * Selecteur unique avec recherche.
 *
 * Une simple `<select>` reste illisible des qu'un referentiel depasse une
 * vingtaine d'entrees (categories, dossiers) : ce composant ajoute un champ de
 * recherche au sommet de la liste deroulante, sans changer la forme de la
 * valeur (une chaine, comme un `<select>`).
 *
 * Le control est un `<button>` rendu **directement** comme frere de la
 * `<legend>` et du `<label>` flottant de `Field` - jamais enveloppe dans un
 * `<div>` a soi. `.field-control:not(:placeholder-shown) ~ .field-label` (voir
 * `globals.css`) est un selecteur de **fraternite** : un bouton ne declenche
 * jamais `:placeholder-shown`, ce qui suffit a maintenir le libelle flottant en
 * permanence, exactement comme pour un `<select>` natif - mais seulement si le
 * bouton et le libelle partagent le meme parent direct.
 */
export function SearchableSelectField({
  label,
  options,
  value,
  onChange,
  errors,
  hint,
  placeholder = "Rechercher…",
  emptyLabel = "Aucun resultat",
  required,
  disabled,
  clearable = false,
}: SearchableSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const controlRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useOutsideClose(isOpen, () => setIsOpen(false), [controlRef, panelRef]);

  const selected = options.find((option) => option.value === value) ?? null;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle === "" ? options : options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, query]);

  function select(nextValue: string | null) {
    onChange(nextValue);
    setIsOpen(false);
    setQuery("");
  }

  return (
    <Field label={label} errors={errors} hint={hint} required={required} variant="select">
      {(fieldProps) => (
        <>
          <button
            ref={controlRef}
            type="button"
            id={fieldProps.id}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className={cn(
              fieldProps.className,
              "flex w-full cursor-pointer items-center justify-between gap-2 text-left disabled:cursor-not-allowed",
              clearable && selected ? "pr-16" : "pr-9",
            )}
          >
            <span className={cn("truncate", !selected && "text-[var(--field-placeholder)]")}>
              {selected ? selected.label : "Selectionner…"}
            </span>
          </button>

          <div className="pointer-events-none absolute inset-y-0 right-1.5 z-[2] flex items-center gap-1">
            {clearable && selected ? (
              <button
                type="button"
                aria-label="Effacer la selection"
                onClick={(event) => {
                  event.stopPropagation();
                  select(null);
                }}
                className="pointer-events-auto rounded-full p-1 text-stone-400 hover:text-rose-600"
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            ) : null}
            <IconChevronDown className="h-4 w-4 text-stone-400" />
          </div>

          <ComboboxPanel
            ref={panelRef}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            query={query}
            onQueryChange={setQuery}
            searchPlaceholder={placeholder}
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[var(--muted)]">{emptyLabel}</li>
            ) : (
              filtered.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => select(option.value)}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-brand-50 dark:hover:bg-brand-900/20",
                      option.value === value && "bg-brand-50 font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300",
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {option.value === value ? <IconCheck className="h-3.5 w-3.5 shrink-0" /> : null}
                  </button>
                </li>
              ))
            )}
          </ComboboxPanel>
        </>
      )}
    </Field>
  );
}

interface MultiSelectFieldProps {
  label: string;
  options: ComboboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  errors?: string[];
  hint?: ReactNode;
  placeholder?: string;
  emptyLabel?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Selecteur multiple avec recherche : tags, categories ou outils IA d'un
 * prompt. Les valeurs choisies restent visibles sous forme de jetons dans le
 * control, chacun retirable sans rouvrir la liste.
 *
 * Meme remarque que `SearchableSelectField` : le `<button>` est un frere
 * direct du libelle flottant, pas un enfant d'un `<div>` intermediaire.
 */
export function MultiSelectField({
  label,
  options,
  values,
  onChange,
  errors,
  hint,
  placeholder = "Rechercher…",
  emptyLabel = "Aucun resultat",
  required,
  disabled,
}: MultiSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const controlRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useOutsideClose(isOpen, () => setIsOpen(false), [controlRef, panelRef]);

  const selectedOptions = options.filter((option) => values.includes(option.value));

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle === "" ? options : options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, query]);

  function toggle(value: string) {
    onChange(values.includes(value) ? values.filter((existing) => existing !== value) : [...values, value]);
  }

  return (
    <Field label={label} errors={errors} hint={hint} required={required} variant="select">
      {(fieldProps) => (
        <>
          <button
            ref={controlRef}
            type="button"
            id={fieldProps.id}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className={cn(
              fieldProps.className,
              "flex min-h-11 w-full cursor-pointer flex-wrap items-center gap-1.5 py-2 pr-9 text-left disabled:cursor-not-allowed",
            )}
          >
            {selectedOptions.length === 0 ? (
              <span className="text-[var(--field-placeholder)]">Selectionner…</span>
            ) : (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded-sm bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                >
                  {option.label}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Retirer ${option.label}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggle(option.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.stopPropagation();
                        toggle(option.value);
                      }
                    }}
                    className="cursor-pointer text-brand-600 hover:text-rose-600 dark:text-brand-400"
                  >
                    <IconClose className="h-3 w-3" />
                  </span>
                </span>
              ))
            )}
          </button>

          <IconChevronDown className="pointer-events-none absolute right-2.5 top-4 z-[2] h-4 w-4 text-stone-400" />

          <ComboboxPanel
            ref={panelRef}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            query={query}
            onQueryChange={setQuery}
            searchPlaceholder={placeholder}
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[var(--muted)]">{emptyLabel}</li>
            ) : (
              filtered.map((option) => {
                const isSelected = values.includes(option.value);

                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => toggle(option.value)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-brand-50 dark:hover:bg-brand-900/20",
                        isSelected && "bg-brand-50 font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300",
                      )}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected ? <IconCheck className="h-3.5 w-3.5 shrink-0" /> : null}
                    </button>
                  </li>
                );
              })
            )}
          </ComboboxPanel>
        </>
      )}
    </Field>
  );
}
