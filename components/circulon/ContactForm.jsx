'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

function Field({ label, name, type = 'text', required = false, textarea = false, value, onChange }) {
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
          required={required}
          className="mt-2 w-full bg-transparent border-0 border-b border-hairline focus:border-signal outline-none py-2 text-[15px] text-bone placeholder-bone/30 resize-none transition-colors"
          placeholder="Tell us what you're modelling…"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-2 w-full bg-transparent border-0 border-b border-hairline focus:border-signal outline-none py-2 text-[15px] text-bone placeholder-bone/30 transition-colors"
          placeholder=" "
        />
      )}
    </label>
  )
}

export default function ContactForm() {
  const [data, setData] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    // Simple local success state — wire to /api later
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      {sent ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-signal/40 bg-signal/[0.05] p-8"
        >
          <div className="flex items-center gap-3 text-signal">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-signal/60">
              <Check size={16} />
            </span>
            <span className="font-mono2 text-[11px] tracking-[0.3em] uppercase">Request received</span>
          </div>
          <p className="mt-4 text-[15px] text-bone/75 leading-[1.6]">
            A Circulon partner will reach you at <span className="text-bone">{data.email || 'your address'}</span> within one business day.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-7">
          <div className="col-span-2 md:col-span-1"><Field label="Name"    name="name"    value={data.name}    onChange={set('name')}    required /></div>
          <div className="col-span-2 md:col-span-1"><Field label="Company" name="company" value={data.company} onChange={set('company')} required /></div>
          <div className="col-span-2 md:col-span-1"><Field label="Email"   name="email"   value={data.email}   onChange={set('email')}   required type="email" /></div>
          <div className="col-span-2 md:col-span-1"><Field label="Phone (optional)" name="phone" value={data.phone} onChange={set('phone')} type="tel" /></div>
          <div className="col-span-2"><Field label="Message" name="message" value={data.message} onChange={set('message')} textarea /></div>
          <div className="col-span-2 flex items-center justify-between gap-4 pt-2">
            <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
              We reply within one business day
            </div>
            <button type="submit" className="btn-liquid magnetic inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-signal text-pine2 font-medium text-[14px] hover:shadow-[0_0_40px_-4px_rgba(76,195,138,0.6)] transition-shadow">
              Request a briefing
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
