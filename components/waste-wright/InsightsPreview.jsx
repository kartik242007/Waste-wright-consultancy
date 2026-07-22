'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const INSIGHTS = [
  {
    n: '01',
    kind: 'Field Brief',
    h: 'The end of annual audits.',
    l: 'Why continuous disclosure is now cheaper than the retrospective one.',
    len: '9 min read',
  },
  {
    n: '02',
    kind: 'Whitepaper',
    h: 'Circularity as a P&L line.',
    l: 'Reframing material recovery from cost center to margin engine.',
    len: 'Whitepaper · 34pp',
  },
  {
    n: '03',
    kind: 'Regulatory Note',
    h: 'CBAM, PPWR, and the shape of 2026.',
    l: 'What Brussels signals next — and what boards should already be modelling.',
    len: 'Regulatory · Q3 2025',
  },
]

function InsightCard({ item, index }) {
  const cardRef = useRef(null)
  const arrowRef = useRef(null)
  const [hover, setHover] = useState(false)

  // Magnetic hover on the arrow
  const onMove = (e) => {
    if (!arrowRef.current || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    arrowRef.current.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`
  }
  const onLeave = () => {
    setHover(false)
    if (arrowRef.current) arrowRef.current.style.transform = 'translate(0,0)'
  }

  return (
    <motion.a
      ref={cardRef}
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="col-span-12 md:col-span-4 group relative block p-8 md:p-10 bg-pine border-t border-hairline md:border-t-0 md:border-l first:md:border-l-0 overflow-hidden"
    >
      {/* Lift on hover */}
      <motion.div
        animate={{ y: hover ? -6 : 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10"
      >
        {/* Meta */}
        <div className="flex items-center justify-between font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/45">
          <span>{item.n} · {item.kind}</span>
          <span className="text-bone/35">{item.len}</span>
        </div>

        {/* Headline */}
        <h3 className="mt-16 md:mt-24 font-editorial text-3xl md:text-[2rem] leading-[1.1] tracking-tight text-balance">
          <span className="relative inline">
            {item.h}
            {/* Animated underline sweep */}
            <motion.span
              aria-hidden
              className="absolute left-0 -bottom-1 h-px bg-signal origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hover ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
              style={{ width: '100%' }}
            />
          </span>
        </h3>

        {/* Supporting line */}
        <p className="mt-6 text-[14px] leading-[1.55] text-bone/60 max-w-sm">
          {item.l}
        </p>

        {/* Read cue */}
        <div className="mt-10 flex items-center justify-between">
          <span className="font-mono2 text-[11px] tracking-[0.3em] uppercase text-signal">
            Read the piece
          </span>
          <span
            ref={arrowRef}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-hairline text-bone/70 transition-colors duration-300 group-hover:border-signal group-hover:text-signal"
            style={{ transition: 'transform 300ms cubic-bezier(.2,.8,.2,1), color 300ms, border-color 300ms' }}
          >
            <ArrowUpRight size={14} />
          </span>
        </div>
      </motion.div>

      {/* Ambient hover wash */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 100%, rgba(76,195,138,0.08) 0%, rgba(76,195,138,0) 65%)',
        }}
      />
    </motion.a>
  )
}

export default function InsightsPreview() {
  return (
    <section id="insights" className="relative py-24 md:py-28 border-t border-hairline">
      <div className="container">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-16 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> 07 · Insights
            </div>
            <h2 className="font-editorial text-display-lg text-balance">
              What we're writing. <span className="text-bone/50 italic">What boards are asking.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.65] text-bone/65 max-w-md md:ml-auto">
              A quiet feed of primary research — briefs, whitepapers, and regulatory notes written by the partners you'd meet on the engagement. Hover a card to open the piece.
            </p>
          </div>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-12 border border-hairline rounded-lg overflow-hidden">
          {INSIGHTS.map((item, i) => (
            <InsightCard key={item.n} item={item} index={i} />
          ))}
        </div>

        {/* Footer meta + view-all */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
            Updated fortnightly · Distributed to 4,200 executives
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-3 font-mono2 text-[11px] tracking-[0.3em] uppercase text-bone/80 hover:text-signal transition-colors"
          >
            View the full archive
            <span className="relative overflow-hidden inline-block w-6 h-px bg-bone/40">
              <span className="absolute inset-0 bg-signal origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
