'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const REFRAMES = [
  {
    n: '01',
    tag: 'Accountability',
    before: 'A marketplace of independent consultants.',
    after:  'One accountable partner, start to finish.',
  },
  {
    n: '02',
    tag: 'Depth',
    before: 'A compliance-filing service.',
    after:  'A strategy practice that also files.',
  },
  {
    n: '03',
    tag: 'Cadence',
    before: 'An annual audit, weeks after the fact.',
    after:  'A live continuous model — updated hourly.',
  },
  {
    n: '04',
    tag: 'Standing',
    before: 'A vendor you have to manage.',
    after:  'A partner seated at the board table.',
  },
]

function ReframeCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })
  const [revealed, setRevealed] = useState(false)
  const start = index * 220 // stagger start

  useEffect(() => {
    if (!inView) return
    // strike-through completes ~600ms in, then crossfade
    const t = setTimeout(() => setRevealed(true), start + 850)
    return () => clearTimeout(t)
  }, [inView, start])

  return (
    <div ref={ref} className="col-span-12 md:col-span-6 lg:col-span-3 bg-pine p-8 md:p-10 min-h-[300px] flex flex-col justify-between">
      <div className="flex items-center justify-between font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/45">
        <span>{item.n}</span>
        <span>{item.tag}</span>
      </div>

      <div className="mt-14 relative">
        {/* BEFORE — industry default */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: revealed ? 0 : 1, y: 0 } : {}}
          transition={{ delay: start / 1000, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0"
        >
          <div className="relative inline-block">
            <p className="font-editorial text-[22px] md:text-[24px] leading-[1.2] text-bone/45 text-balance pr-2">
              {item.before}
            </p>
            {/* Animated strike-through */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: (start + 300) / 1000, duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
              className="absolute left-0 right-0 top-1/2 h-px bg-brass origin-left"
              style={{ transform: 'translateY(-50%) scaleX(0)' }}
            />
          </div>
        </motion.div>

        {/* AFTER — Waste Wright Consultancy's reframe */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <p className="font-editorial text-[24px] md:text-[26px] leading-[1.2] text-bone text-balance">
            {item.after.split(' ').map((w, i, arr) => {
              // last 2–3 words highlighted in signal
              const highlight = i >= arr.length - 3
              return (
                <span key={i} className={highlight ? 'text-signal' : ''}>
                  {w}{i < arr.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 font-mono2 text-[10px] tracking-[0.3em] uppercase text-signal">
            <span className="inline-block w-6 h-px bg-signal" /> Waste Wright
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 md:py-28 border-t border-hairline">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 mb-14">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> 03 · Why Waste Wright
            </div>
            <h2 className="font-editorial text-display-lg text-balance">
              Four reframes. <span className="text-bone/50 italic">Zero adjectives.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.65] text-bone/65 max-w-md md:ml-auto">
              The market defaults you're used to versus how Waste Wright Consultancy is actually structured. Watch each industry assumption strike itself out, then read the model we practice instead.
            </p>
          </div>
        </div>

        {/* Grid with hairline dividers */}
        <div className="grid grid-cols-12 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
          {REFRAMES.map((item, i) => (
            <ReframeCard key={item.n} item={item} index={i} />
          ))}
        </div>

        <div className="mt-8 flex justify-between font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
          <span>Applies to every engagement · No exceptions</span>
          <span>Documented in the Master Services Agreement</span>
        </div>
      </div>
    </section>
  )
}
