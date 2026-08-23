"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing } from "@/lib/motion";

interface BaseProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
}

const inputBase =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[1.0625rem] text-paper outline-none transition-colors duration-300 placeholder:text-mute-deep focus:border-paper/50";

function FieldShell({
  id,
  label,
  error,
  required,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="label flex items-center gap-2 text-mute-deep">
        {label}
        {required ? (
          <span className="text-ember" aria-hidden>
            *
          </span>
        ) : (
          <span className="text-mute-deep">(optional)</span>
        )}
      </label>

      <div className="mt-2">{children}</div>

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easing.outExpo }}
            className="mt-2 text-[0.8125rem] text-ember-soft"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-2 text-[0.8125rem] text-mute-deep">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function TextField({
  label,
  name,
  value,
  error,
  required,
  hint,
  className,
  type = "text",
  placeholder,
  autoComplete,
  onChange,
  onBlur,
}: BaseProps & {
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      required={required}
      hint={hint}
      className={className}
    >
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={cn(inputBase, error && "border-ember/70")}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  name,
  value,
  error,
  required,
  hint,
  className,
  placeholder,
  rows = 5,
  maxLength,
  onChange,
  onBlur,
}: BaseProps & {
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      required={required}
      hint={hint}
      className={className}
    >
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={cn(inputBase, "resize-y leading-relaxed", error && "border-ember/70")}
      />
      {maxLength ? (
        <p className="label mt-2 text-right text-mute-deep" aria-hidden>
          {value.length} / {maxLength}
        </p>
      ) : null}
    </FieldShell>
  );
}

/**
 * Radio group rendered as selectable chips — a styled `select` never matches
 * the rest of the type, and the options are few enough to show at once.
 */
export function ChoiceField({
  label,
  name,
  value,
  options,
  error,
  required,
  hint,
  className,
  onChange,
}: BaseProps & {
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <fieldset
      className={cn("relative", className)}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
    >
      <legend className="label flex items-center gap-2 text-mute-deep">
        {label}
        {required ? (
          <span className="text-ember" aria-hidden>
            *
          </span>
        ) : null}
      </legend>

      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <label
              key={option}
              className={cn(
                "group relative cursor-pointer select-none border px-4 py-2.5 text-[0.875rem] transition-colors duration-300",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ember",
                selected
                  ? "border-ember bg-ember/12 text-paper"
                  : "border-line text-mute hover:border-line-strong hover:text-paper-dim",
                error && !selected && "border-ember/30",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-300",
                    selected ? "bg-ember" : "bg-mute-deep group-hover:bg-mute",
                  )}
                />
                {option}
              </span>
            </label>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easing.outExpo }}
            className="mt-3 text-[0.8125rem] text-ember-soft"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-3 text-[0.8125rem] text-mute-deep">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </fieldset>
  );
}
