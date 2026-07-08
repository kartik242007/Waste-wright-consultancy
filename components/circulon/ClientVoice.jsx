'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  { name: 'Aditya Rao',       role: 'Textile Manufacturing',        stars: 5, q: 'Circulon took the guesswork out of our EPR compliance — from CPCB paperwork to our first BRSR filing, mapped out in weeks, not quarters.' },
  { name: 'Priya Nair',        role: 'FMCG Operations',              stars: 5, q: 'They audited three of our plants and found recovery value we didn\'t know existed. Straightforward, data-led, no fluff.' },
  { name: 'Rohit Deshmukh',    role: 'Municipal Administration',     stars: 4, q: 'Our council needed a credible partner for the diversion targets — Circulon delivered a plan we could actually act on.' },
  { name: 'Neha Kulkarni',     role: 'Electronics Recycling',        stars: 5, q: 'From e-waste licensing to full facility redesign, they handled the whole stack like an extension of our team.' },
  { name: 'Vikram Malhotra',   role: 'Auto Components',              stars: 4, q: 'Sharp, responsive, and unusually clear about costs upfront. Rare in this industry.' },
  { name: 'Ananya Iyer',       role: 'Real Estate & Construction',   stars: 5, q: 'Their compliance layer plugged straight into our ESG reporting — saved us months of back-and-forth with auditors.' },
]

const DWELL = 6500

function Stars({ count }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.25}
          className={i < count ? 'text-brass' : 'text-bone/25'}
          fill="none"
        />
      ))}
    </span>
  )
}

function Initials({ name }) {
  const parts = name.split(' ')
  const init = ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase()
  return (
    <div className="h-12 w-12 shrink-0 rounded-full border border-hairline bg-graphite/60 flex items-center justify-center font-editorial text-[15px] text-bone/85 tracking-tight">
      {init}
    </div>
  )
}

export default function ClientVoice() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' })

  useEffect(() => {
    if (!inView || paused) return
    const t = setTimeout(() => setI((v) => (v + 1) % REVIEWS.length), DWELL)
    return () => clearTimeout(t)
  }, [i, inView, paused])

  const active = REVIEWS[i]

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
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-16">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> 07 · What our clients say
            </div>
            <h2 className="font-editorial text-display-lg text-balance">
              Not a review wall. <span className="text-bone/50 italic">Six voices, on the record.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.65] text-bone/65 max-w-md md:ml-auto">
              Feedback from six live engagements across India — auto-rotating; hover the card to pause. Stars are their rating of our work, kept restrained and outlined so they read as data, not decoration.
            </p>
          </div>
        </div>

        {/* Card stage */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-lg border border-hairline bg-graphite/40 p-8 md:p-12"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Initials name={active.name} />
                  <div>
                    <div className="font-editorial text-xl text-bone">{active.name}</div>
                    <div className="font-mono2 text-[11px] tracking-[0.3em] uppercase text-bone/55 mt-1">{active.role}</div>
                  </div>
                </div>
                <Stars count={active.stars} />
              </div>

              <blockquote className="mt-8 font-editorial text-2xl md:text-3xl lg:text-[2rem] leading-[1.25] tracking-tight text-balance text-bone/90">
                &ldquo;{active.q}&rdquo;
              </blockquote>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Rotator controls */}
        <div className="mt-12 flex items-center gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show review ${idx + 1}`}
                onClick={() => setI(idx)}
                className="group relative h-6 w-10 flex items-center"
              >
                <span className={`h-px w-full transition-colors duration-500 ${idx === i ? 'bg-signal' : 'bg-bone/20 group-hover:bg-bone/40'}`} />
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
            {String(i + 1).padStart(2, '0')} <span className="text-bone/25">/</span> {String(REVIEWS.length).padStart(2, '0')}
            <span className="ml-4 text-bone/30">{paused ? '· Paused' : '· Auto'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
