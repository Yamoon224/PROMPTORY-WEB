"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
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
 * Le control lui-meme est un `<button>`, jamais un `<select>` ni un `<input>` :
 * un bouton ne declenche jamais `:placeholder-shown`, exactement comme un
 * `<select>` natif, ce qui suffit a maintenir le libelle flottant en
 * permanence (voir la regle dediee dans `globals.css`) sans classe
 * supplementaire.
 */
function ComboboxPanel({ isOpen, onOpenChange, query, onQueryChange, searchPlaceholder, children }: ComboboxShellProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--surface)] shadow-card">
      <div className="relative border-b border-[var(--hairline)] p-1.5">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") onOpenChange(false);
          }}
          placeholder={searchPlaceholder}
          className="w-full rounded-sm bg-transparent py-1.5 pl-7 pr-2 text-sm text-[var(--foreground)] outline-none placeholder:text-zinc-400"
        />
      </div>
      <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
        {children}
      </ul>
    </div>
  );
}

function useOutsideClose(isOpen: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen, onClose]);

  return ref;
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
  const containerRef = useOutsideClose(isOpen, () => setIsOpen(false));

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
        <div ref={containerRef} className="relative">
          <button
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

          <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center gap-1">
            {clearable && selected ? (
              <button
                type="button"
                aria-label="Effacer la selection"
                onClick={(event) => {
                  event.stopPropagation();
                  select(null);
                }}
                className="pointer-events-auto rounded-sm p-1 text-zinc-400 hover:text-rose-600"
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            ) : null}
            <IconChevronDown className="h-4 w-4 text-zinc-400" />
          </div>

          <ComboboxPanel
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
        </div>
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
  const containerRef = useOutsideClose(isOpen, () => setIsOpen(false));

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
        <div ref={containerRef} className="relative">
          <button
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

          <IconChevronDown className="pointer-events-none absolute right-2.5 top-4 h-4 w-4 text-zinc-400" />

          <ComboboxPanel
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
        </div>
      )}
    </Field>
  );
}
