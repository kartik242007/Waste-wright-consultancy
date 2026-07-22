'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ================================================================ */
/*  Reclamation Sequence                                              */
/*  Beat 1 (0.0-0.6s)  Scattered e-waste fragments fade in            */
/*  Beat 2 (0.6-2.2s)  Fragments travel along guide-lines to centre,  */
/*                     rotating + shrinking                           */
/*  Beat 3 (2.2-3.2s)  Ordered bar-chart of recovered value rises,    */
/*                     shine-green glow bloom on resolution           */
/*  Loops only on hover / replay trigger \u2014 never continuously.         */
/* ================================================================ */

const VB_W = 400
const VB_H = 300
const CENTRE = { x: VB_W / 2, y: 150 }

// Scattered fragment definitions (start positions + rotation)
const FRAGS = [
  { id: 'f1', type: 'board', x: 50,  y: 60,  rot: -14 },
  { id: 'f2', type: 'wire',  x: 340, y: 70,  rot: 26  },
  { id: 'f3', type: 'chip',  x: 70,  y: 230, rot: 32  },
  { id: 'f4', type: 'board', x: 330, y: 220, rot: -34 },
  { id: 'f5', type: 'cap',   x: 200, y: 42,  rot: 12  },
  { id: 'f6', type: 'chip',  x: 180, y: 258, rot: -55 },
  { id: 'f7', type: 'wire',  x: 30,  y: 155, rot: -8  },
  { id: 'f8', type: 'cap',   x: 370, y: 155, rot: 44  },
]

// Ordered bar-chart output positions & heights
const BARS = [
  { x: 108, w: 30, h: 62,  fill: '#4AE8A0' },
  { x: 152, w: 30, h: 108, fill: '#4AE8A0' },
  { x: 196, w: 30, h: 82,  fill: '#C9A227' },
  { x: 240, w: 30, h: 136, fill: '#4AE8A0' },
  { x: 284, w: 30, h: 100, fill: '#C9A227' },
]
const BAR_BASE_Y = 244

function FragShape({ type }) {
  switch (type) {
    case 'board':
      return (
        <g>
          <rect x="-20" y="-7" width="40" height="14" fill="none" stroke="#1F5C42" strokeWidth="1.2" />
          <line x1="-15" y1="-2" x2="15"  y2="-2" stroke="#C9A227" strokeWidth="0.9" opacity="0.75" />
          <line x1="-11" y1="2"  x2="7"   y2="2"  stroke="#C9A227" strokeWidth="0.9" opacity="0.75" />
          <circle cx="-11" cy="0" r="1.6" fill="#4AE8A0" />
          <circle cx="11"  cy="0" r="1.6" fill="#C9A227" />
        </g>
      )
    case 'wire':
      return (
        <path d="M -20 0 Q -10 -10 0 0 T 20 0" fill="none" stroke="#F4F1E9" strokeWidth="1.4" opacity="0.7" />
      )
    case 'chip':
      return (
        <g>
          <rect x="-9" y="-9" width="18" height="18" fill="none" stroke="#F4F1E9" strokeWidth="1.1" opacity="0.75" />
          {[-6, -2, 2, 6].map(x => (<line key={'t'+x} x1={x} y1="-11" x2={x} y2="-9"  stroke="#C9A227" strokeWidth="0.9" />))}
          {[-6, -2, 2, 6].map(x => (<line key={'b'+x} x1={x} y1="9"   x2={x} y2="11"  stroke="#C9A227" strokeWidth="0.9" />))}
          <circle cx="-3" cy="-3" r="1" fill="#4AE8A0" />
        </g>
      )
    case 'cap':
      return (
        <g>
          <rect x="-6" y="-11" width="12" height="16" fill="none" stroke="#F4F1E9" strokeWidth="1.05" opacity="0.7" />
          <ellipse cx="0" cy="-11" rx="6" ry="1.5" fill="none" stroke="#C9A227" strokeWidth="0.9" />
          <line x1="-3" y1="5" x2="-3" y2="11" stroke="#F4F1E9" strokeWidth="1.05" />
          <line x1="3"  y1="5" x2="3"  y2="11" stroke="#F4F1E9" strokeWidth="1.05" />
        </g>
      )
    default: return null
  }
}

/* Draw the guide line from a fragment's start position to the centre.
   Rendered as a dashed thin path; drawn (dashoffset animation) during Beat 2. */
function GuideLine({ from }) {
  const len = Math.hypot(from.x - CENTRE.x, from.y - CENTRE.y)
  return (
    <line
      className="guide"
      x1={from.x} y1={from.y} x2={CENTRE.x} y2={CENTRE.y}
      stroke="#4AE8A0" strokeWidth="0.6" opacity="0"
      strokeDasharray={len} strokeDashoffset={len}
    />
  )
}

export default function AboutUs() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // ------- Reveal for text block (unchanged from previous About) -------
      gsap.utils.toArray('[data-au-reveal]').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        )
      })

      // ------- Reclamation Sequence timeline -------
      if (prefersReduced) {
        // Static Beat 3 fallback \u2014 skip animation, show final bars
        gsap.set('.frag', { autoAlpha: 0 })
        gsap.set('.guide', { opacity: 0 })
        gsap.set('.bar', { autoAlpha: 1, scaleY: 1, transformOrigin: 'bottom center' })
        gsap.set('.bloom', { opacity: 0.2, scale: 1 })
        return
      }

      // Initial states
      gsap.set('.frag',  { autoAlpha: 0, scale: 1, transformOrigin: '50% 50%' })
      gsap.set('.guide', { opacity: 0 })
      gsap.set('.bar',   { autoAlpha: 0, scaleY: 0, transformOrigin: 'bottom center' })
      gsap.set('.bloom', { opacity: 0, scale: 0.3, transformOrigin: 'center center' })

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

      // ---- Beat 1 \u2014 Input: scattered fragments fade in ----
      tl.to('.frag', { autoAlpha: 1, duration: 0.55, stagger: 0.05, ease: 'power2.out' }, 0)

      // ---- Beat 2 \u2014 Process: guide lines draw + fragments converge ----
      tl.to('.guide', { opacity: 0.55, duration: 0.25 }, 0.55)
        .to('.guide', { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.05 }, 0.55)

      // For each fragment, animate its inner <g> to move toward centre, rotate,
      // and shrink. We tween the CSS transform on the child .frag-inner element.
      tl.to('.frag-inner', {
        x:      (i, el) => (CENTRE.x - Number(el.dataset.startX)),
        y:      (i, el) => (CENTRE.y - Number(el.dataset.startY)),
        rotate: '+=210',
        scale:  0.18,
        duration: 1.35,
        stagger: 0.06,
        ease: 'power2.inOut',
      }, 0.75)

      // Fade fragments out just before Beat 3 resolves
      tl.to('.frag',  { autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, 2.0)
      tl.to('.guide', { opacity: 0,   duration: 0.4 }, 2.05)

      // ---- Beat 3 \u2014 Output: ordered bars rise + glow bloom ----
      tl.to('.bloom', { opacity: 0.55, scale: 1.15, duration: 0.6, ease: 'power2.out' }, 2.15)
      tl.to('.bar',   { autoAlpha: 1, duration: 0.2 }, 2.2)
      tl.to('.bar',   { scaleY: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, 2.25)
      tl.to('.bloom', { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 2.8)

      tlRef.current = tl

      // Play on scroll into view (once)
      ScrollTrigger.create({
        trigger: svgRef.current,
        start: 'top 78%',
        once: true,
        onEnter: () => tl.play(0),
      })

      // Replay on hover of the graphic panel
      const panel = svgRef.current?.parentElement
      if (panel) {
        const onEnter = () => {
          if (tl.progress() === 1 || tl.isActive() === false) tl.restart()
        }
        panel.addEventListener('mouseenter', onEnter)
        panel.addEventListener('click', onEnter)
        return () => {
          panel.removeEventListener('mouseenter', onEnter)
          panel.removeEventListener('click', onEnter)
        }
      }
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
          {/* Text block \u2014 unchanged copy + position */}
          <div className="col-span-12 lg:col-span-7">
            <div data-au-reveal className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-6">
              <span className="inline-block w-8 h-px bg-signal" /> 01 · About Us
            </div>
            <h2 data-au-reveal className="font-editorial text-display-lg text-balance">
              We do the parts of waste management <span className="italic text-bone/60">most firms won't.</span>
            </h2>
            <p data-au-reveal className="mt-8 max-w-xl text-[16px] leading-[1.7] text-bone/70">
              Waste Wright Consultancy is an Indian circular-economy and waste-diagnostics consultancy. We audit, design, and implement — from CPCB and state pollution-control-board compliance to full material recovery — for manufacturers, municipal bodies, and enterprises across India.
            </p>

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

          {/* Animation panel \u2014 replaces the previous dot-grid */}
          <div data-au-reveal className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-lg surface-gradient border border-hairline overflow-hidden cursor-pointer">
              <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} width="100%" height="100%" className="block">
                {/* Guide lines (behind fragments) */}
                {FRAGS.map(f => (<GuideLine key={'g-'+f.id} from={{ x: f.x, y: f.y }} />))}

                {/* Bloom halo (Beat 3) */}
                <g className="bloom" style={{ transformOrigin: `${CENTRE.x}px ${BAR_BASE_Y - 40}px` }}>
                  <circle cx={CENTRE.x} cy={BAR_BASE_Y - 40} r="80" fill="url(#bloom-grad)" />
                </g>

                {/* Ordered output bars (Beat 3) */}
                <g>
                  {BARS.map((b, i) => (
                    <rect
                      key={'bar-'+i}
                      className="bar"
                      x={b.x} y={BAR_BASE_Y - b.h}
                      width={b.w} height={b.h}
                      fill={b.fill}
                      style={{ transformBox: 'fill-box', transformOrigin: 'bottom center', filter: 'drop-shadow(0 0 6px rgba(74,232,160,0.35))' }}
                    />
                  ))}
                  {/* baseline */}
                  <line x1={90} y1={BAR_BASE_Y + 0.5} x2={330} y2={BAR_BASE_Y + 0.5} stroke="rgba(244,241,233,0.25)" strokeWidth="1" />
                </g>

                {/* Fragments (Beat 1 + 2) */}
                {FRAGS.map(f => (
                  <g key={f.id}
                     className="frag"
                     transform={`translate(${f.x} ${f.y})`}>
                    <g className="frag-inner"
                       data-start-x={f.x}
                       data-start-y={f.y}
                       transform={`rotate(${f.rot})`}>
                      <FragShape type={f.type} />
                    </g>
                  </g>
                ))}

                {/* corner ticks + labels (static, part of the existing lab-instrument aesthetic) */}
                {[[6,6],[VB_W-20,6],[6,VB_H-20],[VB_W-20,VB_H-20]].map(([x,y],k)=> (
                  <g key={'ck'+k} stroke="rgba(244,241,233,0.35)" strokeWidth="1" fill="none">
                    <line x1={x} y1={y} x2={x+14} y2={y} />
                    <line x1={x} y1={y} x2={x} y2={y+14} />
                  </g>
                ))}

                {/* Bloom gradient def */}
                <defs>
                  <radialGradient id="bloom-grad">
                    <stop offset="0%"  stopColor="#4AE8A0" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="#4AE8A0" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#4AE8A0" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Labels overlaid on the panel — keeps parity with hero's data-lab styling */}
              <div className="absolute top-4 left-4 font-mono2 text-[10px] tracking-widest text-bone/45 uppercase">FIG.01 · RECLAMATION SEQUENCE</div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono2 text-[10px] tracking-widest text-bone/45 uppercase pointer-events-none">
                <span>INPUT</span><span className="text-bone/70">→</span><span className="text-signal">RECOVERED VALUE</span>
              </div>
              <div className="absolute top-4 right-4 font-mono2 text-[10px] tracking-widest text-signal uppercase">Hover to replay</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
