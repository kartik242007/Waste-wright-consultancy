'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SERVICES } from './servicesData'

const SESSION_KEY = 'ww_lead_modal_shown'

function Field({ label, name, type = 'text', required = false, value, onChange }) {
  return (
    <label className="block">
      <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/55 flex items-center gap-2">
        {label} {required && <span className="text-signal">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full bg-transparent border-0 border-b border-hairline focus:border-signal outline-none py-2 text-[15px] text-bone placeholder-bone/30 transition-colors"
        placeholder=" "
      />
    </label>
  )
}

export default function LeadCaptureModal() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({ name: '', company: '', phone: '', email: '', service: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY)) return

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.45) {
        setOpen(true)
        sessionStorage.setItem(SESSION_KEY, '1')
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const handleOpenChange = (v) => {
    setOpen(v)
    if (!v) {
      // reset for next time modal logic is triggered manually elsewhere (not re-shown this session)
      setTimeout(() => { setSent(false) }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg w-[92vw] border-none bg-transparent shadow-none p-0 rounded-2xl">
        <DialogTitle className="sr-only">Request a briefing with Waste Wright Consultancy</DialogTitle>
        <div
          className="relative rounded-2xl border border-bone/15 p-8 md:p-10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(18,42,30,0.90), rgba(10,31,22,0.82))',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* One-time entrance specular sweep */}
          <motion.span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.18) 50%, transparent 75%)' }}
            initial={{ x: '-130%' }}
            animate={{ x: '130%' }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          />

          <div className="relative">
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-4">
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
              <>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-signal font-mono2 mb-3">
                  <span className="inline-block w-6 h-px bg-signal" /> Before you go
                </div>
                <h3 className="font-editorial text-2xl md:text-3xl font-semibold text-bone text-balance">
                  Get a directional impact model. <span className="italic text-bone/50">No cost to start.</span>
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-bone/65 max-w-md">
                  Tell us who you are and what you need — a partner will follow up within one business day.
                </p>

                <form onSubmit={onSubmit} className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
                  <div className="col-span-2 md:col-span-1"><Field label="Your name" name="name" value={data.name} onChange={set('name')} required /></div>
                  <div className="col-span-2 md:col-span-1"><Field label="Company name" name="company" value={data.company} onChange={set('company')} required /></div>
                  <div className="col-span-2 md:col-span-1"><Field label="Phone" name="phone" type="tel" value={data.phone} onChange={set('phone')} required /></div>
                  <div className="col-span-2 md:col-span-1"><Field label="Email" name="email" type="email" value={data.email} onChange={set('email')} required /></div>

                  <div className="col-span-2">
                    <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/55 flex items-center gap-2 mb-2">
                      Which service do you need? <span className="text-signal">*</span>
                    </span>
                    <Select value={data.service} onValueChange={(v) => setData((d) => ({ ...d, service: v }))} required>
                      <SelectTrigger className="w-full bg-transparent border-0 border-b border-hairline rounded-none focus:ring-0 focus:border-signal text-[15px] text-bone h-auto py-2 px-0">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-graphite border-hairline text-bone">
                        {SERVICES.map((s) => (
                          <SelectItem key={s.n} value={s.k} className="focus:bg-signal/15 focus:text-bone">{s.t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 pt-2">
                    <button type="submit" className="btn-liquid magnetic w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-signal text-pine2 font-medium text-[14px] hover:shadow-[0_0_40px_-4px_rgba(76,195,138,0.6)] transition-shadow">
                      Request a briefing
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
