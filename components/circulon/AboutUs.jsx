'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*  Simple decorative graphic:
    ~54 dots gently drift between a soft cluster (chaos) and an ordered
    12-column grid, on a 6-second loop. Pure SVG + Framer Motion — no
    canvas, no interaction. Calm and light.
*/
function DotGraphic() {
  const COLS = 9
  const ROWS = 6
  const W = 400
  const H = 340
  const dots = useMemo(() => {
    const arr = []
    const gx = W / (COLS + 1)
    const gy = H / (ROWS + 1)
    let i = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const ordered = { x: gx * (c + 1), y: gy * (r + 1) }
        // Chaotic position: gaussian-ish around centre
        const cx = W / 2 + (Math.random() - 0.5) * W * 0.9
        const cy = H / 2 + (Math.random() - 0.5) * H * 0.7
        const chaos = { x: cx, y: cy }
        // Alternate green / bone tint
        const tint = i % 9 === 0 ? '#C9A227' : (i % 3 === 0 ? '#4CC38A' : '#F4F1E9')
        arr.push({ ordered, chaos, tint, delay: (Math.random() * 0.9) })
        i++
      }
    }
    return arr
  }, [])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="block">
      {/* soft frame */}
      <rect x="1" y="1" width={W-2} height={H-2} fill="none" stroke="rgba(244,241,233,0.08)" />
      {/* corner tick marks */}
      {[[0,0],[W-14,0],[0,H-14],[W-14,H-14]].map(([x,y],k)=> (
        <g key={k} stroke="rgba(244,241,233,0.35)" strokeWidth="1" fill="none">
          <line x1={x} y1={y} x2={x+14} y2={y} />
          <line x1={x} y1={y} x2={x} y2={y+14} />
        </g>
      ))}

      {dots.map((d, idx) => (
        <motion.circle
          key={idx}
          r={d.tint === '#C9A227' ? 3.2 : 2.2}
          fill={d.tint}
          initial={{ cx: d.chaos.x, cy: d.chaos.y, opacity: 0.35 }}
          animate={{
            cx: [d.chaos.x, d.ordered.x, d.ordered.x, d.chaos.x],
            cy: [d.chaos.y, d.ordered.y, d.ordered.y, d.chaos.y],
            opacity: [0.35, 0.9, 0.9, 0.35],
          }}
          transition={{
            duration: 6,
            times: [0, 0.42, 0.58, 1],
            ease: [0.7, 0, 0.3, 1],
            repeat: Infinity,
            delay: d.delay,
          }}
        />
      ))}

      {/* faint grid hint that appears near ordered state */}
      <motion.g
        stroke="rgba(76,195,138,0.14)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.9, 0] }}
        transition={{ duration: 6, times: [0, 0.45, 0.55, 1], repeat: Infinity }}
      >
        {Array.from({ length: COLS }).map((_, c) => {
          const x = (W / (COLS + 1)) * (c + 1)
          return <line key={'v'+c} x1={x} y1={20} x2={x} y2={H-20} />
        })}
        {Array.from({ length: ROWS }).map((_, r) => {
          const y = (H / (ROWS + 1)) * (r + 1)
          return <line key={'h'+r} x1={20} y1={y} x2={W-20} y2={y} />
        })}
      </motion.g>
    </svg>
  )
}

export default function AboutUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-au-reveal]').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const chips = [
    'Founded in 2024',
    '12+ Indian states',
    'Six practice areas',
    'ISO 14001 certified',
  ]

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-32 border-t border-hairline">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div className="col-span-12 lg:col-span-7">
            <div data-au-reveal className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-6">
              <span className="inline-block w-8 h-px bg-signal" /> 01 · About Us
            </div>
            <h2 data-au-reveal className="font-editorial text-display-lg text-balance">
              We do the parts of waste management <span className="italic text-bone/60">most firms won't.</span>
            </h2>
            <p data-au-reveal className="mt-8 max-w-xl text-[16px] leading-[1.7] text-bone/70">
              Circulon is an Indian circular-economy and waste-diagnostics consultancy. We audit, design, and implement — from CPCB and state pollution-control-board compliance to full material recovery — for manufacturers, municipal bodies, and enterprises across India.
            </p>

            {/* Chips */}
            <div data-au-reveal className="mt-10 flex flex-wrap gap-3">
              {chips.map((c, i) => (
                <span key={c}
                  className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-graphite/50 text-[12px] font-mono2 tracking-[0.15em] uppercase ${i === 0 ? 'text-signal' : i === chips.length - 1 ? 'text-brass' : 'text-bone/75'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-signal' : i === chips.length - 1 ? 'bg-brass' : 'bg-bone/40'}`} />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Decorative graphic */}
          <div data-au-reveal className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[6/5] rounded-lg bg-graphite/40 border border-hairline overflow-hidden">
              <div className="absolute inset-6">
                <DotGraphic />
              </div>
              <div className="absolute top-4 left-4 font-mono2 text-[10px] tracking-widest text-bone/45 uppercase">FIG.01 · CHAOS → ORDER</div>
              <div className="absolute bottom-4 right-4 font-mono2 text-[10px] tracking-widest text-signal uppercase">Loop</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
