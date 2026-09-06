'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SERVICES } from './servicesData'
import {
  useFormValidation, validateEmail, validatePhone, validateRequired,
  FieldError, fieldBorder, submitState,
} from './formValidation'

function Field({ label, name, type = 'text', required = false, textarea = false, value, onChange, onBlur, error }) {
  const base = `mt-2 w-full bg-transparent border-0 border-b outline-none py-3 sm:py-2 text-[16px] sm:text-[15px] text-bone placeholder-bone/30 transition-colors ${fieldBorder(error)}`
  return (
    <label className="block">
      <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/55 flex items-center gap-2">
        {label} {required && <span className="text-signal">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          className={`${base} resize-none`}
          placeholder="Tell us what you're modelling…"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          className={base}
          placeholder=" "
        />
      )}
      <FieldError>{error}</FieldError>
    </label>
  )
}

// Phone is optional here; everything else is required.
const validate = (v) => ({
  name:    validateRequired(v.name, 'Enter your name'),
  company: validateRequired(v.company, 'Enter your company name'),
  email:   validateEmail(v.email),
  phone:   validatePhone(v.phone, { optional: true }),
  service: validateRequired(v.service, 'Select the service you need'),
})

export default function ContactForm() {
  const [data, setData] = useState({ name: '', company: '', email: '', phone: '', message: '', service: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))
  const { isValid, errorFor, blurHandler, markSubmitted } = useFormValidation(data, validate)

  const onSubmit = async (e) => {
    e.preventDefault()
    markSubmitted()
    if (!isValid) return
    // Simple local success state — wire to /api later
    setSent(true)
  }

  // noValidate: errors are surfaced inline, never as a browser tooltip.
  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {sent ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-signal/40 bg-signal/[0.05] p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 text-signal">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-signal/60">
              <Check size={16} />
            </span>
            <span className="font-mono2 text-[11px] tracking-[0.3em] uppercase">Request received</span>
          </div>
          <p className="mt-4 text-[15px] text-bone/75 leading-[1.6]">
            A Waste Wright Consultancy partner will reach you at <span className="text-bone">{data.email || 'your address'}</span> within one business day.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-7">
          <div className="col-span-2 md:col-span-1 min-w-0"><Field label="Name"    name="name"    value={data.name}    onChange={set('name')}    onBlur={blurHandler('name')}    error={errorFor('name')}    required /></div>
          <div className="col-span-2 md:col-span-1 min-w-0"><Field label="Company" name="company" value={data.company} onChange={set('company')} onBlur={blurHandler('company')} error={errorFor('company')} required /></div>
          <div className="col-span-2 md:col-span-1 min-w-0"><Field label="Email"   name="email"   value={data.email}   onChange={set('email')}   onBlur={blurHandler('email')}   error={errorFor('email')}   required type="email" /></div>
          <div className="col-span-2 md:col-span-1 min-w-0"><Field label="Phone (optional)" name="phone" value={data.phone} onChange={set('phone')} onBlur={blurHandler('phone')} error={errorFor('phone')} type="tel" /></div>
          <div className="col-span-2 min-w-0"><Field label="Message" name="message" value={data.message} onChange={set('message')} textarea /></div>

          {/* Same field as the "Before you go" popup — same option list and
              required status, restyled to this form's underline inputs. */}
          <div className="col-span-2 min-w-0">
            {/* block, not flex — as a flex row the asterisk was stranded
                mid-right once this long label wrapped at 320px */}
            <span className="font-mono2 text-[10px] leading-[1.6] tracking-[0.3em] uppercase text-bone/55 block">
              Which service do you need? <span className="text-signal">*</span>
            </span>
            <Select
              value={data.service}
              onValueChange={(v) => setData((d) => ({ ...d, service: v }))}
            >
              <SelectTrigger
                aria-invalid={!!errorFor('service')}
                onBlur={blurHandler('service')}
                className={`mt-2 w-full bg-transparent border-0 border-b rounded-none focus:ring-0 text-[16px] sm:text-[15px] text-bone h-auto py-3 sm:py-2 px-0 ${fieldBorder(errorFor('service'))}`}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-graphite border-hairline text-bone">
                {SERVICES.map((s) => (
                  <SelectItem key={s.n} value={s.k} className="focus:bg-signal/15 focus:text-bone">{s.t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{errorFor('service')}</FieldError>
          </div>
          {/* Below sm the reply-time note and the button were fighting over one
              row; the button now takes the full width above its own caption. */}
          <div className="col-span-2 flex flex-col-reverse items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/40 text-center sm:text-left">
              We reply within one business day
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className={`btn-liquid magnetic inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-3 px-6 py-3.5 rounded-full bg-signal text-pine2 font-medium text-[14px] transition-shadow ${submitState(isValid)}`}
            >
              Request a briefing
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
