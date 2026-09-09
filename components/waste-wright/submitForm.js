'use client'

import { SERVICES } from './servicesData'

/* ================================================================ */
/*  Formspree delivery — shared by the "Before you go" popup and the */
/*  footer contact form. Both post to wastewrightconsultancy@gmail   */
/*  via separate endpoints so submissions are told apart at a glance */
/*  in the dashboard and in the subject line.                        */
/*                                                                   */
/*  Endpoint IDs come from env, never from committed source. Next    */
/*  inlines NEXT_PUBLIC_* at build time only for literal references, */
/*  so these two must be read statically — no process.env[key].      */
/* ================================================================ */

const ENDPOINTS = {
  briefing: process.env.NEXT_PUBLIC_FORMSPREE_BRIEFING_ID,
  contact: process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID,
}

const SOURCE_LABEL = {
  briefing: 'Briefing popup',
  contact: 'Footer contact form',
}

const SUBJECT = {
  briefing: (who) => `New briefing request — ${who}`,
  contact: (who) => `New contact form message — ${who}`,
}

function istTimestamp() {
  try {
    return `${new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata',
    }).format(new Date())} IST`
  } catch {
    return new Date().toISOString()
  }
}

/**
 * Builds the Formspree payload.
 *
 * Formspree's default notification email renders keys in payload order and
 * uses the key itself as the row label, so the key names and their order
 * below ARE the email body layout — no paid template needed. `_subject` and
 * `_replyto` are Formspree control fields, not new form inputs: nothing is
 * added to the UI and no value is collected that the forms did not already
 * validate.
 */
export function buildPayload(form, values) {
  const name = (values.name || '').trim()
  const company = (values.company || '').trim()
  const phone = (values.phone || '').trim()
  const message = (values.message || '').trim()
  // Store the short key, email the full service title.
  const service = SERVICES.find((s) => s.k === values.service)?.t || values.service || '—'

  return {
    _subject: SUBJECT[form](company || name || 'Unknown'),
    // Lets you hit Reply in Gmail and answer the lead directly.
    _replyto: (values.email || '').trim(),

    'Submitted via': SOURCE_LABEL[form],
    Name: name,
    Company: company,
    Email: (values.email || '').trim(),
    Phone: phone || 'Not provided',
    'Service requested': service,
    // Popup has no message field at all; the footer's is optional, so an
    // empty one is omitted rather than emailed as a blank row.
    ...(form === 'contact' && message ? { Message: message } : {}),
    Submitted: istTimestamp(),
  }
}

export class FormspreeNotConfigured extends Error {}

export async function submitForm(form, values) {
  const id = ENDPOINTS[form]
  if (!id) {
    // Surfaces as the same inline failure state rather than a silent no-op,
    // so a missing Vercel env var can't masquerade as a delivered lead.
    throw new FormspreeNotConfigured(`Missing endpoint id for "${form}" form`)
  }

  const res = await fetch(`https://formspree.io/f/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(buildPayload(form, values)),
  })

  if (!res.ok) {
    let detail = `${res.status}`
    try {
      const body = await res.json()
      if (body?.errors?.length) detail = body.errors.map((e) => e.message).join(', ')
    } catch { /* non-JSON error body */ }
    throw new Error(`Formspree rejected the submission (${detail})`)
  }
  return true
}

export const SUBMIT_ERROR = 'Something went wrong — please try again or email us directly.'
