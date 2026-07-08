'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const QUOTES = [
  {
    q: 'Circulon rebuilt our waste ledger and CSRD posture in a single arc — no vendors to manage.',
    role: 'Chief Sustainability Officer',
    org: 'Global Logistics Carrier',
    kpi: '78% diversion · 22 months',
  },
  {
    q: 'Their diagnostic phase alone exposed nine figures of latent liability our auditors had missed.',
    role: 'Group CFO',
    org: 'Tier-1 Consumer Packaged Goods',
    kpi: '$142M liability surfaced',
  },
  {
    q: 'The only firm we hire whose engagement partner still shows up in year three.',
    role: 'Managing Director',
    org: 'Sovereign Infrastructure Fund',
    kpi: '5 concurrent mandates',
  },
]

const DWELL = 6500

export default function ClientVoice() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' })

  useEffect(() => {
    if (!inView || paused) return
    const t = setTimeout(() => setI((v) => (v + 1) % QUOTES.length), DWELL)
    return () => clearTimeout(t)
  }, [i, inView, paused])

  const active = QUOTES[i]

  return (
    <section
      id="client-voice"
      ref={sectionRef}
      className="relative py-28 md:py-32 border-t border-hairline overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 radial-fade pointer-events-none opacity-70" />
      <div className="container relative">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> 06 · Client Voice
            </div>
            <h2 className="font-editorial text-display-lg text-balance">
              Not a review wall. <span className="text-bone/50 italic">A single sentence, on the record.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.65] text-bone/65 max-w-md md:ml-auto">
              Three voices from the boardrooms we sit inside. Quotes rotate on their own; hover the section to pause and read carefully. Attribution kept to role and sector — as it is in every engagement.
            </p>
          </div>
        </div>

        {/* Stage */}
        <div className="relative grid grid-cols-12 gap-10 items-start">
          {/* Giant quote glyph */}
          <div className="col-span-12 md:col-span-1">
            <div className="font-editorial text-brass leading-none select-none text-[9rem] md:text-[11rem]" aria-hidden>“</div>
          </div>

          <div className="col-span-12 md:col-span-11 relative min-h-[280px] md:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <blockquote className="font-editorial text-3xl md:text-5xl lg:text-[3.4rem] leading-[1.1] tracking-tight text-balance">
                  {active.q}
                </blockquote>
                <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <div className="font-mono2 text-[11px] tracking-[0.35em] uppercase text-bone/50">Attribution</div>
                    <div className="mt-2 text-[15px] text-bone/85">
                      — {active.role}, <span className="text-bone/60">{active.org}</span>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <div className="font-mono2 text-[11px] tracking-[0.35em] uppercase text-bone/50">Engagement result</div>
                    <div className="mt-2 font-editorial text-2xl text-signal tabular-nums">{active.kpi}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Rotator controls */}
        <div className="mt-16 flex items-center gap-6">
          <div className="flex items-center gap-3">
            {QUOTES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show quote ${idx + 1}`}
                onClick={() => setI(idx)}
                className="group relative h-6 w-16 flex items-center"
              >
                <span className={`h-px w-full transition-colors duration-500 ${idx === i ? 'bg-signal' : 'bg-bone/20 group-hover:bg-bone/40'}`} />
                {/* Progress fill for the active one */}
                {idx === i && !paused && (
                  <motion.span
                    key={i + '-fill'}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-signal origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: DWELL / 1000, ease: 'linear' }}
                    style={{ width: '100%' }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="ml-auto font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
            {String(i + 1).padStart(2, '0')} <span className="text-bone/25">/</span> {String(QUOTES.length).padStart(2, '0')}
            <span className="ml-4 text-bone/30">{paused ? '· Paused' : '· Auto'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
