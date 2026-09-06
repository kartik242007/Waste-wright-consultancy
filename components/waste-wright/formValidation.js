'use client'

import { useState } from 'react'

/* ================================================================ */
/*  Shared form validation — used by BOTH the "Before you go"       */
/*  LeadCaptureModal and the footer ContactForm so the rules and    */
/*  the error treatment can never drift apart between the two.      */
/* ================================================================ */

// Deliberately permissive on the local part, strict on the shape:
// something@something.tld with a 2+ letter TLD.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export function validateEmail(value) {
  const v = (value || '').trim()
  if (!v) return 'Enter your email address'
  return EMAIL_RE.test(v) ? '' : 'Enter a valid email address'
}

/**
 * Indian mobile length: exactly 10 digits once separators are stripped.
 * Fewer than 10 or 11+ are both rejected. `optional` lets an untouched
 * empty field stay valid (the footer form marks Phone optional).
 */
export function validatePhone(value, { optional = false } = {}) {
  const raw = (value || '').trim()
  if (!raw) return optional ? '' : 'Enter your mobile number'
  const digits = raw.replace(/\D/g, '')
  if (digits.length !== 10) return 'Enter a valid 10-digit mobile number'
  return ''
}

export function validateRequired(value, message) {
  return (value || '').trim() ? '' : message
}

/**
 * `validate` is a pure (values) => { field: errorString } function defined
 * at module scope by each form. Errors recompute every render, so a field
 * clears the instant it becomes valid and the submit button re-enables
 * without waiting for another blur.
 */
export function useFormValidation(values, validate) {
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const errors = validate(values)
  const isValid = Object.keys(errors).every((k) => !errors[k])

  return {
    isValid,
    // An error surfaces on blur only if the user actually typed something —
    // so a malformed email is flagged the moment they leave the field, but
    // merely tabbing past an empty required field is not scolded until they
    // try to submit. (The dialog autofocuses its first input, so without this
    // the popup flagged "Enter your name" before the user touched anything.)
    // Submit stays disabled either way.
    errorFor: (k) => {
      const typedAndBlurred = touched[k] && String(values[k] ?? '').trim() !== ''
      return typedAndBlurred || submitAttempted ? errors[k] || '' : ''
    },
    blurHandler: (k) => () => setTouched((t) => (t[k] ? t : { ...t, [k]: true })),
    markSubmitted: () => setSubmitAttempted(true),
  }
}

/* Shared presentation ------------------------------------------------ */

// Underline tone for an input: rust while invalid, normal otherwise.
export const fieldBorder = (error) =>
  error ? 'border-rust focus:border-rust' : 'border-hairline focus:border-signal'

// Submit button state — visibly inactive rather than clickable-but-dead.
export const submitState = (isValid) =>
  isValid
    ? 'hover:shadow-[0_0_40px_-4px_rgba(76,195,138,0.6)]'
    : 'opacity-40 cursor-not-allowed'

export function FieldError({ children }) {
  if (!children) return null
  return (
    <span role="alert" className="mt-1.5 block font-mono2 text-[10px] leading-[1.4] tracking-[0.12em] uppercase text-rust">
      {children}
    </span>
  )
}
