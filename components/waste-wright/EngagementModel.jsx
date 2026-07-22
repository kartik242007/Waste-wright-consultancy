'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PHASES = [
  {
    n: '01',
    t: 'Diagnose',
    l: 'Instrument every material stream across the enterprise.',
    icon: (
      <>
        {/* magnifier + sample beaker */}
        <circle cx="34" cy="34" r="18" />
        <line x1="47" y1="47" x2="66" y2="66" />
        <path d="M28 30 v10 a2 2 0 0 0 2 2 h8 a2 2 0 0 0 2 -2 v-10" />
        <line x1="26" y1="30" x2="42" y2="30" />
      </>
    ),
  },
  {
    n: '02',
    t: 'Design',
    l: 'Architect strategy, systems and disclosures in parallel.',
    icon: (
      <>
        {/* compass + drafting geometry */}
        <path d="M40 12 L64 60 L16 60 Z" />
        <circle cx="40" cy="60" r="3" />
        <line x1="40" y1="12" x2="40" y2="60" />
        <line x1="24" y1="42" x2="56" y2="42" />
      </>
    ),
  },
  {
    n: '03',
    t: 'Deploy',
    l: 'Retool facilities, tech, and reporting infrastructure.',
    icon: (
      <>
        {/* gear + arrow */}
        <circle cx="40" cy="40" r="16" />
        <circle cx="40" cy="40" r="5" />
        <line x1="40" y1="16" x2="40" y2="22" />
        <line x1="40" y1="58" x2="40" y2="64" />
        <line x1="16" y1="40" x2="22" y2="40" />
        <line x1="58" y1="40" x2="64" y2="40" />
        <line x1="24" y1="24" x2="28" y2="28" />
        <line x1="52" y1="52" x2="56" y2="56" />
        <line x1="24" y1="56" x2="28" y2="52" />
        <line x1="52" y1="28" x2="56" y2="24" />
      </>
    ),
  },
  {
    n: '04',
    t: 'Disclose',
    l: 'Continuous, audit-grade evidence for every stakeholder.',
    icon: (
      <>
        {/* document + rising line */}
        <path d="M22 14 h28 l10 10 v42 h-38 z" />
        <line x1="50" y1="14" x2="50" y2="24" />
        <line x1="50" y1="24" x2="60" y2="24" />
        <polyline points="28,54 36,46 42,50 52,38" />
        <circle cx="52" cy="38" r="2" fill="#4CC38A" stroke="none" />
      </>
    ),
  },
]

function PhaseCard({ phase, active }) {
  return (
    <div className="w-[70vw] md:w-[42vw] lg:w-[32vw] shrink-0 pr-12 md:pr-16">
      <div className={`transition-colors duration-500 ${active ? 'text-bone' : 'text-bone/40'}`}>
        <div className="flex items-center gap-4 font-mono2 text-[11px] tracking-[0.3em] uppercase">
          <span className={`inline-block h-px w-8 transition-colors duration-500 ${active ? 'bg-signal' : 'bg-bone/25'}`} />
          <span>{phase.n} · Phase</span>
        </div>

        {/* Line-draw icon */}
        <svg viewBox="0 0 80 80" width="72" height="72" className="mt-5" fill="none"
          stroke={active ? '#4CC38A' : 'rgba(244,241,233,0.35)'}
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <g className={active ? 'phase-icon-active' : ''}>
            {phase.icon}
          </g>
        </svg>

        <h3 className="mt-6 font-editorial text-4xl md:text-5xl tracking-tight">
          {phase.t}<span className="text-signal">.</span>
        </h3>
        <p className={`mt-3 max-w-xs text-[14px] leading-[1.55] transition-colors duration-500 ${active ? 'text-bone/75' : 'text-bone/40'}`}>
          {phase.l}
        </p>
      </div>
    </div>
  )
}

export default function EngagementModel() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const activeRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // total scroll distance = width of the track minus viewport width
    const getDistance = () => track.scrollWidth - window.innerWidth + 96
    let distance = getDistance()

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance() + 200}`,
        pin: true,
        pinSpacing: true,
        scrub: prefersReduced ? false : 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(PHASES.length - 1, Math.floor(self.progress * PHASES.length))
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
          if (idx !== activeRef.current) {
            activeRef.current = idx
            // toggle active data-attr on phase items so CSS can update
            section.querySelectorAll('[data-phase]').forEach((el, i) => {
              el.setAttribute('data-active', i === idx ? 'true' : 'false')
            })
            // step markers
            section.querySelectorAll('[data-step]').forEach((el, i) => {
              el.setAttribute('data-active', i <= idx ? 'true' : 'false')
            })
          }
        },
      },
    })

    const refresh = () => { distance = getDistance(); ScrollTrigger.refresh() }
    window.addEventListener('resize', refresh)
    return () => {
      window.removeEventListener('resize', refresh)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="engagement-model"
      className="relative border-t border-hairline bg-pine overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Header (fixed above the horizontal track) */}
      <div className="container pt-14 md:pt-16 pb-6 md:pb-8">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 text-[13px] tracking-[0.35em] uppercase text-signal font-mono2 font-semibold mb-3">
              <span className="inline-block w-8 h-px bg-signal" /> 04 · Engagement Model
            </div>
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.02] tracking-tight text-balance">
              A single arc. <span className="text-bone/50 italic">Four disciplined phases.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[14px] leading-[1.55] text-bone/65">
              Every Waste Wright Consultancy engagement follows one continuous arc — from field-level diagnostics to board-level disclosure. Scroll to advance the model; the phase you're inside will always light up.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5">
            {/* Step markers */}
            <div className="flex items-center gap-4 md:justify-end">
              {PHASES.map((p, i) => (
                <div key={p.n} data-step data-active={i === 0 ? 'true' : 'false'} className="flex items-center gap-2 group">
                  <span className="step-dot inline-block h-2 w-2 rounded-full border border-bone/30 transition-all duration-500" />
                  <span className="step-label font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/40 transition-colors duration-500">
                    {p.t}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-px w-full bg-hairline overflow-hidden">
              <div ref={progressRef} className="h-full w-full bg-signal origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex items-start will-change-transform pl-6 md:pl-12"
          style={{ paddingRight: '16vw' }}
        >
          {PHASES.map((phase, i) => (
            <div key={phase.n} data-phase data-active={i === 0 ? 'true' : 'false'}>
              <PhaseCard phase={phase} active={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Hairline base */}
      <div className="container pt-6">
        <div className="hairline" />
        <div className="mt-3 flex justify-between font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
          <span>Median engagement · 14–22 months</span>
          <span>Board-level accountability throughout</span>
        </div>
      </div>

      {/* Data-attribute driven styles (scoped) */}
      <style jsx>{`
        [data-phase][data-active='true'] :global(h3) { color: #F4F1E9; }
        [data-phase][data-active='true'] :global(svg) { stroke: #4CC38A; }
        [data-phase][data-active='true'] :global(p) { color: rgba(244,241,233,0.78); }
        [data-phase][data-active='false'] :global(h3) { color: rgba(244,241,233,0.32); }
        [data-phase][data-active='false'] :global(svg) { stroke: rgba(244,241,233,0.28); }
        [data-step][data-active='true'] :global(.step-dot) { background: #4CC38A; border-color: #4CC38A; box-shadow: 0 0 0 4px rgba(76,195,138,0.15); }
        [data-step][data-active='true'] :global(.step-label) { color: #F4F1E9; }
      `}</style>
    </section>
  )
}
