"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Field } from "./Field";
import { IconChevronDown, IconEye, IconEyeOff, IconSearch } from "./icons";

/**
 * Champs prets a l'emploi, tous a libelle flottant.
 *
 * Le placeholder est **obligatoire** dans le type : c'est lui qui alimente
 * `:placeholder-shown`, la pseudo-classe qui fait monter le libelle, et c'est
 * lui qui montre le format attendu au moment ou l'on s'apprete a taper. Son
 * oubli se voit a la compilation plutot qu'en recette.
 */

interface CommonFieldProps {
  label: string;
  errors?: string[];
  hint?: ReactNode;
  fieldClassName?: string;
}

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "placeholder">,
    CommonFieldProps {
  placeholder: string;
  adornment?: ReactNode;
}

export function TextField({ label, errors, hint, fieldClassName, required, adornment, className, ...props }: TextFieldProps) {
  return (
    <Field label={label} errors={errors} hint={hint} required={required} className={fieldClassName} adornment={adornment}>
      {(fieldProps) => (
        <input
          {...fieldProps}
          required={required}
          {...props}
          className={cn(fieldProps.className, adornment ? "pr-10" : null, className)}
        />
      )}
    </Field>
  );
}

export interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type" | "placeholder">,
    CommonFieldProps {
  placeholder: string;
}

export function PasswordField({ label, errors, hint, fieldClassName, required, ...props }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Field
      label={label}
      errors={errors}
      hint={hint}
      required={required}
      className={fieldClassName}
      adornment={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-pressed={isVisible}
          aria-label={isVisible ? "masquer le mot de passe" : "afficher le mot de passe"}
          className="flex h-8 w-8 items-center justify-center rounded-sm text-zinc-400 transition-colors hover:text-brand-600"
        >
          {isVisible ? <IconEyeOff /> : <IconEye />}
        </button>
      }
    >
      {(fieldProps) => (
        <input
          {...fieldProps}
          type={isVisible ? "text" : "password"}
          required={required}
          {...props}
          className={cn(fieldProps.className, "pr-11")}
        />
      )}
    </Field>
  );
}

export interface NumberFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "placeholder" | "type" | "value" | "onChange">,
    CommonFieldProps {
  placeholder?: string;
  value: number | "";
  /** Toujours un nombre a virgule flottante (ou "" pendant la saisie) : jamais un entier arrondi. */
  onChange: (value: number | "") => void;
  step?: number;
}

/**
 * Champ numerique a virgule (prix, taux…). `step="0.01"` par defaut : un prix
 * de marketplace se saisit au centime pres, jamais arrondi a l'unite.
 */
export function NumberField({
  label,
  errors,
  hint,
  fieldClassName,
  required,
  value,
  onChange,
  step = 0.01,
  placeholder = "0.00",
  ...props
}: NumberFieldProps) {
  return (
    <Field label={label} errors={errors} hint={hint} required={required} className={fieldClassName}>
      {(fieldProps) => (
        <input
          {...fieldProps}
          type="number"
          inputMode="decimal"
          step={step}
          min={0}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            const raw = event.target.value;
            onChange(raw === "" ? "" : Number.parseFloat(raw));
          }}
          {...props}
        />
      )}
    </Field>
  );
}

export interface TextareaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "placeholder">,
    CommonFieldProps {
  placeholder: string;
}

export function TextareaField({ label, errors, hint, fieldClassName, required, rows = 3, ...props }: TextareaFieldProps) {
  return (
    <Field label={label} errors={errors} hint={hint} required={required} variant="textarea" className={fieldClassName}>
      {(fieldProps) => (
        <textarea {...fieldProps} rows={rows} required={required} {...props} className={cn(fieldProps.className, "resize-y")} />
      )}
    </Field>
  );
}

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id">, CommonFieldProps {
  children: ReactNode;
}

export function SelectField({ label, errors, hint, fieldClassName, required, children, ...props }: SelectFieldProps) {
  return (
    <Field
      label={label}
      errors={errors}
      hint={hint}
      required={required}
      variant="select"
      className={fieldClassName}
      adornment={<IconChevronDown className="pointer-events-none mr-1.5 h-4 w-4 text-zinc-400" />}
    >
      {(fieldProps) => (
        <select
          {...fieldProps}
          required={required}
          {...props}
          className={cn(fieldProps.className, "cursor-pointer appearance-none pr-9")}
        >
          {children}
        </select>
      )}
    </Field>
  );
}

/**
 * Recherche, libelle flottant comme tous les autres champs.
 *
 * La loupe est un adornment a droite (comme l'oeil de `PasswordField`) plutot
 * qu'a gauche : un pictogramme a gauche entrerait en collision avec le
 * libelle flottant, ancre lui aussi a gauche.
 */
export function SearchInput({
  label = "Rechercher",
  placeholder = "Rechercher…",
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder"> & { label?: string; placeholder?: string }) {
  return (
    <Field label={label} adornment={<IconSearch className="h-4 w-4 text-zinc-400" />}>
      {(fieldProps) => (
        <input
          {...fieldProps}
          type="search"
          placeholder={placeholder}
          {...props}
          className={cn(fieldProps.className, "pr-10", className)}
        />
      )}
    </Field>
  );
}
