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
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[0.9375rem] text-paper outline-none transition-all duration-300 placeholder:text-paper-dim/40 hover:border-white/25 focus:border-ember focus:bg-white/[0.05] focus:ring-1 focus:ring-ember/40 shadow-inner";

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
      <label htmlFor={id} className="label flex items-center justify-between text-paper-dim font-medium tracking-wider text-[0.75rem] uppercase">
        <span className="flex items-center gap-1.5">
          {label}
          {required ? (
            <span className="text-ember font-bold" aria-hidden>
              *
            </span>
          ) : null}
        </span>
        {!required ? (
          <span className="text-mute-deep text-[0.6875rem] normal-case tracking-normal">(optional)</span>
        ) : null}
      </label>

      <div className="mt-2.5">{children}</div>

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easing.outExpo }}
            className="mt-2 text-[0.8125rem] text-ember-soft font-medium flex items-center gap-1.5"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-2 text-[0.8125rem] text-mute">
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
  maxLength,
  onChange,
  onBlur,
}: BaseProps & {
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
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
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={cn(inputBase, error && "border-ember/70 focus:border-ember")}
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
        className={cn(inputBase, "resize-y leading-relaxed", error && "border-ember/70 focus:border-ember")}
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
      <legend className="label flex items-center justify-between text-paper-dim font-medium tracking-wider text-[0.75rem] uppercase w-full">
        <span className="flex items-center gap-1.5">
          {label}
          {required ? (
            <span className="text-ember font-bold" aria-hidden>
              *
            </span>
          ) : null}
        </span>
      </legend>

      <div className="mt-3.5 flex flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = value === option;
          return (
            <label
              key={option}
              className={cn(
                "group relative cursor-pointer select-none rounded-xl border px-4 py-2.5 text-[0.875rem] transition-all duration-200",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ember",
                selected
                  ? "border-ember bg-ember/15 text-paper font-medium shadow-[0_0_15px_rgba(226,85,43,0.18)]"
                  : "border-white/12 bg-white/[0.03] text-paper-dim hover:bg-white/[0.07] hover:border-white/25 hover:text-paper shadow-sm",
                error && !selected && "border-ember/40",
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
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className={cn(
                    "size-2 rounded-full transition-all duration-300",
                    selected
                      ? "bg-ember shadow-[0_0_8px_rgba(226,85,43,0.8)] scale-110"
                      : "bg-white/30 group-hover:bg-white/60",
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
            className="mt-2.5 text-[0.8125rem] text-ember-soft font-medium"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-2.5 text-[0.8125rem] text-mute">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </fieldset>
  );
}
