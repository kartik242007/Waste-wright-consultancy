'use client'

import { useEffect, useRef } from 'react'
import { ShieldCheck, Award, BadgeCheck, FileCheck2, Globe2, Sparkles } from 'lucide-react'

const CREDENTIALS = [
  { k: 'ISO 14001',        s: 'Environmental Mgmt.',      icon: ShieldCheck, tint: 'signal' },
  { k: 'ISO 9001',         s: 'Quality Mgmt.',            icon: ShieldCheck, tint: 'bone' },
  { k: 'ISO 27001',        s: 'Information Security',     icon: ShieldCheck, tint: 'bone' },
  { k: 'ISO 45001',        s: 'Occupational H&S',         icon: ShieldCheck, tint: 'bone' },
  { k: 'R2v3',             s: 'Responsible Recycling',    icon: BadgeCheck,  tint: 'signal' },
  { k: 'GRI',              s: 'Global Reporting Init.',   icon: FileCheck2,  tint: 'bone' },
  { k: 'SASB',             s: 'Sustainability Accounting',icon: FileCheck2,  tint: 'bone' },
  { k: 'TCFD',             s: 'Climate Disclosures',      icon: FileCheck2,  tint: 'bone' },
  { k: 'ISSB',             s: 'IFRS S1 / S2',             icon: FileCheck2,  tint: 'signal' },
  { k: 'BRSR',             s: 'India ESG Disclosure',     icon: FileCheck2,  tint: 'signal' },
  { k: 'Edison Award ’24', s: 'Circular Innovation',      icon: Award,       tint: 'brass' },
  { k: 'Reuters Impact ’23', s: 'Consultancy of the Year',icon: Sparkles,    tint: 'brass' },
  { k: 'B Corp',           s: 'Certified 2019 ·  Score 128', icon: Globe2,   tint: 'bone' },
]

function Badge({ item, refCallback, index }) {
  const Icon = item.icon
  const tint =
    item.tint === 'signal' ? 'text-signal' :
    item.tint === 'brass'  ? 'text-brass'  :
    'text-bone'
  return (
    <div
      ref={(el) => refCallback(el, index)}
      data-badge
      className="cred-badge group flex items-center gap-4 pl-4 pr-6 py-4 rounded-full border border-hairline bg-graphite/50 shrink-0 transition-all duration-500 will-change-transform"
      style={{ opacity: 0.35, filter: 'blur(1px)', transform: 'scale(0.9)' }}
    >
      <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full border border-hairline ${tint}`}>
        <Icon size={14} strokeWidth={1.6} />
      </span>
      <div className="flex flex-col leading-tight">
        <span className={`font-editorial text-xl md:text-2xl tracking-tight ${tint === 'text-bone' ? 'text-bone' : tint}`}>{item.k}</span>
        <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-bone/50">{item.s}</span>
      </div>
    </div>
  )
}

export default function Credentials() {
  const badgesRef = useRef([])
  const marqueeRef = useRef(null)

  const registerBadge = (el, i) => {
    if (!el) return
    badgesRef.current[i] = el
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      badgesRef.current.forEach((el) => { if (el) { el.style.opacity = 1; el.style.filter = 'none'; el.style.transform = 'scale(1)' } })
      return
    }

    // Compute focus based on horizontal distance from viewport center on every frame
    let raf
    const centerX = () => window.innerWidth / 2
    const loop = () => {
      const cx = centerX()
      badgesRef.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const mid = rect.left + rect.width / 2
        const dist = Math.abs(mid - cx)
        // Bell curve — sharpest within 240px of center
        const norm = Math.max(0, 1 - dist / 260)          // 0..1
        const eased = norm * norm * (3 - 2 * norm)         // smoothstep
        const opacity = 0.32 + eased * 0.68
        const scale   = 0.9  + eased * 0.18
        const blur    = (1 - eased) * 1.4
        el.style.opacity = opacity.toFixed(3)
        el.style.transform = `scale(${scale.toFixed(3)})`
        el.style.filter = `blur(${blur.toFixed(2)}px)`
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="credentials" className="relative py-24 md:py-28 border-t border-hairline overflow-hidden">
      <div className="container mb-14">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> 05 · Credentials & Recognition
            </div>
            <h2 className="font-editorial text-display-lg text-balance">
              Independently attested. <span className="text-bone/50 italic">Repeatedly awarded.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.65] text-bone/65 max-w-md md:ml-auto">
              Every standard we advise on, we hold ourselves. Below is the current attestation set governing Waste Wright Consultancy's practice — the ones nearest the centerline are our most active certifications this year.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee with edge fade masks */}
      <div
        className="relative"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%)',
        }}
      >
        {/* Center indicator ticks */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-1 z-10">
          <span className="w-px h-3 bg-signal/60 mx-auto" />
          <span className="w-px h-3 bg-signal/60 mx-auto" />
        </div>

        <div
          ref={marqueeRef}
          className="flex gap-4 md:gap-6 animate-ticker whitespace-nowrap"
          style={{ animationDuration: '55s' }}
        >
          {[...CREDENTIALS, ...CREDENTIALS].map((item, i) => (
            <Badge key={i} item={item} refCallback={registerBadge} index={i} />
          ))}
        </div>
      </div>

      <div className="container mt-14 flex justify-between font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
        <span>{CREDENTIALS.length} active attestations</span>
        <span>Audit register available on request</span>
      </div>
    </section>
  )
}
