'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, Suspense } from 'react'
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Minus, Plus } from 'lucide-react'
import LenisProvider from '@/components/circulon/LenisProvider'

const HeroScene = dynamic(() => import('@/components/circulon/HeroScene'), { ssr: false, loading: () => null })
const CircularityEngine = dynamic(() => import('@/components/circulon/CircularityEngine'), { ssr: false, loading: () => null })
const EngagementModel = dynamic(() => import('@/components/circulon/EngagementModel'), { ssr: false, loading: () => null })
const Credentials = dynamic(() => import('@/components/circulon/Credentials'), { ssr: false, loading: () => null })
const WhyChooseUs = dynamic(() => import('@/components/circulon/WhyChooseUs'), { ssr: false, loading: () => null })
const ClientVoice = dynamic(() => import('@/components/circulon/ClientVoice'), { ssr: false, loading: () => null })
const InsightsPreview = dynamic(() => import('@/components/circulon/InsightsPreview'), { ssr: false, loading: () => null })

/* Loader */
function Loader() {
  const [visible, setVisible] = useState(true)
  useEffect(() => { const t = setTimeout(() => setVisible(false), 1400); return () => clearTimeout(t) }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-pine"
          initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.7, 0, 0.3, 1] } }}>
          <div className="flex flex-col items-center gap-6">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <motion.circle cx="60" cy="60" r="42" stroke="#F4F1E9" strokeWidth="1.2" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} />
              <motion.path d="M60 18 A42 42 0 0 1 102 60" stroke="#4CC38A" strokeWidth="2" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.15, duration: 0.9, ease: 'easeInOut' }} />
              <motion.circle cx="102" cy="60" r="3" fill="#C9A227"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0, duration: 0.4 }} />
            </svg>
            <div className="font-mono2 text-[10px] tracking-[0.35em] text-bone/50 uppercase">Circulon / Initialising</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* Nav */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-pine/60 border-b border-hairline">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="42" stroke="#F4F1E9" strokeWidth="2" fill="none" />
            <path d="M60 18 A42 42 0 0 1 102 60" stroke="#4CC38A" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="102" cy="60" r="4" fill="#C9A227" />
          </svg>
          <span className="font-editorial text-[19px] tracking-tight">Circulon<span className="text-signal">.</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[13px] text-bone/70">
          {['Services','Case Studies','Insights','About','Careers'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} className="hover:text-bone transition-colors">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="btn-liquid magnetic inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bone/25 text-[13px] hover:border-signal hover:text-pine hover:bg-signal transition-colors">
          Book briefing <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  )
}

/* Hero */
function Hero() {
  return (
    <section className="relative min-h-[100svh] pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 radial-fade pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-[0.35] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 -z-0 opacity-90"><Suspense fallback={null}><HeroScene /></Suspense></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-12 gap-6 items-end min-h-[80svh]">
          <div className="col-span-12 md:col-span-9">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-bone/60 font-mono2 mb-8">
              <span className="inline-block w-8 h-px bg-signal" />
              Circulon Advisory Group · Est. 2011
            </motion.div>
            <h1 className="font-editorial text-display-2xl text-balance">
              <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.6, duration: 0.9, ease: [0.2,0.8,0.2,1] }} className="block">Engineering</motion.span>
              <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.75, duration: 0.9, ease: [0.2,0.8,0.2,1] }} className="block">the end of <span className="italic text-signal">waste</span>.</motion.span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.15, duration: 0.8 }}
              className="mt-10 max-w-xl text-[17px] leading-[1.65] text-bone/70">
              We advise governments, municipalities and Fortune 500 manufacturers on waste diagnostics, ESG reporting, and circular-economy transformation — turning material liabilities into measurable balance-sheet gain.
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 0.8 }} className="flex flex-col gap-3">
              <a href="#engine" className="btn-liquid magnetic inline-flex items-center justify-between gap-6 px-5 py-3.5 rounded-full bg-signal text-pine2 font-medium text-[14px] hover:shadow-[0_0_40px_-4px_rgba(76,195,138,0.6)] transition-shadow">
                Explore the engine <ArrowRight size={16} />
              </a>
              <a href="#services" className="magnetic inline-flex items-center justify-between gap-6 px-5 py-3.5 rounded-full border border-bone/25 text-[14px] hover:border-bone/60 transition-colors">
                Our services <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.8 }}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-4 text-[12px] font-mono2 tracking-widest uppercase text-bone/55">
          <span>ISO 14001 Certified</span>
          <span>GRI · SASB · TCFD Aligned</span>
          <span>Offices — London · Singapore · Chicago · Rotterdam</span>
        </motion.div>
      </div>
    </section>
  )
}

/* Animated Counter */
function AnimatedCounter({ value, suffix = '', decimals = 0, prefix = '' }) {
  const spring = useSpring(0, { stiffness: 80, damping: 22 })
  const display = useTransform(spring, (latest) => {
    const v = decimals ? latest.toFixed(decimals) : Math.round(latest).toLocaleString()
    return `${prefix}${v}${suffix}`
  })
  useEffect(() => { spring.set(value) }, [value, spring])
  return <motion.span>{display}</motion.span>
}

/* THE CIRCULARITY ENGINE */
function CircularityEngineSection() {
  const [tons, setTons] = useState(1_800_000)
  const MIN = 100_000, MAX = 12_000_000
  const progress = useRef(0)
  useEffect(() => {
    const p = (tons - MIN) / (MAX - MIN)
    progress.current = Math.max(0, Math.min(1, p))
  }, [tons])

  const co2Avoided = tons * 0.85
  const materialsRecovered = tons * 0.62
  const landfillDiverted = Math.min(0.94, 0.34 + (tons / MAX) * 0.6) * 100
  const dollarsUnlocked = tons * 118

  return (
    <section id="engine" className="relative py-28 md:py-36 border-t border-hairline">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> Signature Instrument
            </div>
            <h2 className="font-editorial text-display-xl max-w-4xl text-balance">
              The Circularity Engine.<br/>
              <span className="text-bone/50">From chaotic mass</span> <span className="italic text-signal">to</span> <span className="text-bone/50">recovered resource.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-[1.65] text-bone/60">
            Drag the slider to model annual throughput. Watch material transform from a landfill topology into an ordered recovery network — with impact quantified in real time.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 relative">
            <div className="relative aspect-[16/11] rounded-lg bg-graphite/60 border border-hairline overflow-hidden">
              <div className="absolute inset-0"><Suspense fallback={null}><CircularityEngine progress={progress} /></Suspense></div>
              <div className="absolute top-4 left-4 font-mono2 text-[10px] tracking-widest text-bone/45 uppercase">SCENE_01 · Material_Flow</div>
              <div className="absolute top-4 right-4 font-mono2 text-[10px] tracking-widest text-signal uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" /> LIVE MODEL
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono2 text-[10px] tracking-widest text-bone/45 uppercase">
                <span>CHAOTIC INPUT</span><span className="text-bone/70">→</span><span className="text-signal">ORDERED RECOVERY</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono2 text-[11px] tracking-[0.3em] uppercase text-bone/60">Tons Processed Annually</div>
                <div className="font-editorial text-3xl md:text-4xl tabular-nums">
                  <AnimatedCounter value={tons} /> <span className="text-bone/40 text-lg">t</span>
                </div>
              </div>
              <input
                type="range" min={MIN} max={MAX} step={10000}
                value={tons} onChange={(e) => setTons(Number(e.target.value))}
                className="w-full accent-signal h-1 appearance-none bg-bone/15 rounded-full outline-none cursor-grab active:cursor-grabbing
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-signal
                           [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(76,195,138,0.15)]
                           [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
                           [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-signal
                           [&::-moz-range-thumb]:border-0"
              />
              <div className="mt-3 flex justify-between font-mono2 text-[10px] tracking-widest text-bone/40 uppercase">
                <span>100 K</span><span>Median Client</span><span>12 M</span>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button onClick={() => setTons(t => Math.max(MIN, t - 200_000))} className="magnetic p-2 rounded-full border border-bone/20 hover:border-bone/60"><Minus size={14}/></button>
                <button onClick={() => setTons(t => Math.min(MAX, t + 200_000))} className="magnetic p-2 rounded-full border border-bone/20 hover:border-bone/60"><Plus size={14}/></button>
                <button onClick={() => setTons(1_800_000)} className="ml-2 font-mono2 text-[11px] tracking-widest uppercase text-bone/50 hover:text-signal">Reset</button>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="rounded-lg border border-hairline bg-graphite/40 p-8 h-full flex flex-col justify-between">
              <div className="space-y-8">
                <KpiRow label="CO₂e Avoided" unit="tonnes" value={co2Avoided} tint="signal" />
                <div className="hairline" />
                <KpiRow label="Materials Recovered" unit="tonnes" value={materialsRecovered} tint="bone" />
                <div className="hairline" />
                <KpiRow label="Landfill Diverted" unit="%" value={landfillDiverted} decimals={1} tint="brass" />
                <div className="hairline" />
                <KpiRow label="Economic Value Unlocked" unit="USD" prefix="$" value={dollarsUnlocked} tint="bone" />
              </div>
              <p className="mt-10 font-mono2 text-[10px] tracking-widest uppercase text-bone/40 leading-relaxed">
                Coefficients derived from Circulon's 2024 benchmarking dataset across 217 facility engagements. Directional estimate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function KpiRow({ label, unit, value, decimals = 0, prefix = '', tint = 'bone' }) {
  const color = tint === 'signal' ? 'text-signal' : tint === 'brass' ? 'text-brass' : 'text-bone'
  return (
    <div>
      <div className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/55 mb-2">{label}</div>
      <div className={`font-editorial text-4xl md:text-5xl tabular-nums ${color}`}>
        <AnimatedCounter value={value} decimals={decimals} prefix={prefix} />
        <span className="text-bone/40 text-base ml-2">{unit}</span>
      </div>
    </div>
  )
}

/* TRUST BAR */
function TrustBar() {
  const clients = ['UNILEVER','SIEMENS','MITSUBISHI','NESTLÉ','ØRSTED','ARAMCO','LVMH','ROLLS-ROYCE','GSK','MAERSK']
  return (
    <section className="py-16 border-t border-hairline overflow-hidden">
      <div className="container mb-8 flex items-center justify-between">
        <div className="font-mono2 text-[10px] tracking-[0.35em] uppercase text-bone/50">Trusted counsel to</div>
        <div className="font-mono2 text-[10px] tracking-[0.35em] uppercase text-bone/50">217 engagements · 41 countries</div>
      </div>
      <div className="flex gap-16 animate-ticker whitespace-nowrap font-editorial text-3xl text-bone/40">
        {[...clients, ...clients].map((c, i) => (
          <span key={i} className="hover:text-bone transition-colors">{c}</span>
        ))}
      </div>
    </section>
  )
}

/* SERVICES */
const SERVICES = [
  { n: '01', t: 'Waste Audit & Diagnostics', d: 'Full-stack material flow analysis, MRF sampling, and hidden-liability discovery across your facility footprint.', k: 'Diagnostics' },
  { n: '02', t: 'Circular Economy Strategy', d: 'Board-level roadmaps aligning product design, procurement and reverse logistics with circularity KPIs.', k: 'Strategy' },
  { n: '03', t: 'Regulatory & Compliance Advisory', d: 'EPR, PPWR, CBAM, and jurisdiction-specific readiness with legal-grade documentation.', k: 'Compliance' },
  { n: '04', t: 'Digital & Tech Transformation', d: 'IoT, computer-vision sortation and MRF automation — plus a proprietary tracking layer.', k: 'Technology' },
  { n: '05', t: 'ESG Reporting & Assurance', d: 'GRI, SASB, TCFD, ISSB — audit-ready disclosures backed by primary data.', k: 'Reporting' },
  { n: '06', t: 'Facility Design & Optimisation', d: 'Greenfield MRFs and retrofits engineered for throughput, purity, and unit economics.', k: 'Engineering' },
]
function Services() {
  return (
    <section id="services" className="py-28 md:py-36 border-t border-hairline">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> 02 · Practice Areas
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-editorial text-display-xl text-balance">
              Six disciplines. <span className="text-bone/50 italic">One integrated engagement model.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
          {SERVICES.map((s) => (<ServiceCard key={s.n} s={s} />))}
        </div>
      </div>
    </section>
  )
}
function ServiceCard({ s }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="col-span-12 md:col-span-6 lg:col-span-4 bg-pine p-8 md:p-10 group cursor-pointer relative overflow-hidden min-h-[280px] flex flex-col justify-between">
      <motion.div aria-hidden className="absolute inset-0 bg-signal" initial={false}
        animate={{ y: hover ? '0%' : '101%' }} transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }} />
      <div className={`relative z-10 flex items-center justify-between font-mono2 text-[11px] tracking-[0.3em] uppercase transition-colors ${hover ? 'text-pine2' : 'text-bone/45'}`}>
        <span>{s.n}</span><span>{s.k}</span>
      </div>
      <div className="relative z-10 mt-16">
        <h3 className={`font-editorial text-2xl md:text-3xl text-balance transition-colors ${hover ? 'text-pine2' : 'text-bone'}`}>{s.t}</h3>
        <p className={`mt-4 text-[14px] leading-[1.65] max-w-sm transition-colors ${hover ? 'text-pine2/80' : 'text-bone/55'}`}>{s.d}</p>
        <div className={`mt-6 inline-flex items-center gap-2 text-[13px] transition-colors ${hover ? 'text-pine2' : 'text-signal'}`}>
          Explore <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.div>
  )
}

/* IMPACT */
function Impact() {
  const stats = [
    { v: '38.4M', l: 'Tonnes diverted from landfill', c: 'signal' },
    { v: '$4.1B',  l: 'Economic value returned to clients', c: 'brass' },
    { v: '217',    l: 'Enterprise engagements delivered', c: 'bone' },
    { v: '41',     l: 'Countries under active advisory', c: 'bone' },
  ]
  return (
    <section className="py-28 border-t border-hairline">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline">
        {stats.map((s, i) => (
          <div key={i} className="bg-pine p-8 md:p-10">
            <div className={`font-editorial text-5xl md:text-6xl tabular-nums ${s.c === 'signal' ? 'text-signal' : s.c === 'brass' ? 'text-brass' : 'text-bone'}`}>{s.v}</div>
            <div className="mt-4 text-[13px] text-bone/60 max-w-[16ch] leading-snug">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* CASE STUDY */
function CaseStudy() {
  return (
    <section id="case-studies" className="py-28 md:py-36 border-t border-hairline">
      <div className="container">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-8">
          <span className="inline-block w-8 h-px bg-signal" /> 03 · Featured Engagement
        </div>
        <div className="grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 lg:col-span-5">
            <div className="font-mono2 text-[11px] tracking-widest uppercase text-bone/50 mb-4">Case · CS-207 · Rotterdam</div>
            <h3 className="font-editorial text-display-lg text-balance">
              Rebuilding a port authority's waste ledger — <span className="italic text-signal">78% diversion in 22 months.</span>
            </h3>
            <p className="mt-8 text-[15px] leading-[1.7] text-bone/65 max-w-lg">
              A tier-1 European port operator faced regulatory exposure across 14 terminals. Circulon designed the diagnostic protocol, retooled two MRFs, and stood up a compliance data-layer feeding directly into their CSRD disclosures.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-hairline pt-8">
              <div><div className="font-editorial text-3xl text-signal">78%</div><div className="mt-1 text-[11px] tracking-widest uppercase text-bone/45 font-mono2">Diversion</div></div>
              <div><div className="font-editorial text-3xl">€42M</div><div className="mt-1 text-[11px] tracking-widest uppercase text-bone/45 font-mono2">Saved / yr</div></div>
              <div><div className="font-editorial text-3xl text-brass">22 mo</div><div className="mt-1 text-[11px] tracking-widest uppercase text-bone/45 font-mono2">To full-scale</div></div>
            </div>
            <a href="#" className="mt-12 inline-flex items-center gap-2 text-[14px] border-b border-signal/60 pb-1 hover:gap-4 transition-all">Read the full engagement <ArrowRight size={14} /></a>
          </div>
          <div className="col-span-12 lg:col-span-7"><BeforeAfter /></div>
        </div>
      </div>
    </section>
  )
}
function BeforeAfter() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-hairline select-none">
      <div className="absolute inset-0 bg-graphite p-10">
        <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/50">Before · 2022</div>
        <div className="mt-8 flex items-end gap-2 h-[calc(100%-4rem)]">
          {[35, 78, 20, 55, 92, 40, 66, 88, 30, 72, 48, 84].map((h, i) => (<div key={i} className="flex-1 bg-bone/25" style={{ height: `${h}%` }} />))}
        </div>
      </div>
      <div className="absolute inset-0 bg-pine2 p-10" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <div className="font-mono2 text-[10px] tracking-widest uppercase text-signal">After · 2024</div>
        <div className="mt-8 flex items-end gap-2 h-[calc(100%-4rem)]">
          {[68, 72, 78, 74, 82, 76, 80, 84, 78, 82, 86, 90].map((h, i) => (<div key={i} className="flex-1 bg-signal/80 shadow-[0_0_20px_-2px_rgba(76,195,138,0.5)]" style={{ height: `${h}%` }} />))}
        </div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10" />
      <div className="absolute top-0 bottom-0 w-px bg-bone/70 pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-bone text-pine2 flex items-center justify-center text-xs font-mono2">⇔</div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono2 text-[10px] tracking-widest uppercase text-bone/60 pointer-events-none">
        <span>Drag to compare</span><span className="text-signal">+58 pts diversion</span>
      </div>
    </div>
  )
}

/* CTA */
function CTA() {
  return (
    <section id="contact" className="py-28 md:py-40 border-t border-hairline relative overflow-hidden">
      <div className="absolute inset-0 radial-fade pointer-events-none" />
      <div className="container relative">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-6">
            <span className="inline-block w-8 h-px bg-signal" /> Begin
          </div>
          <h2 className="font-editorial text-display-2xl text-balance">
            Model your material future. <span className="italic text-bone/50">In one briefing.</span>
          </h2>
          <p className="mt-10 max-w-xl text-[16px] text-bone/65 leading-[1.7]">
            A confidential 45-minute engagement with a Circulon partner. We'll assess your waste ledger, regulatory exposure, and circular-economy readiness — and issue a directional impact model within seven days.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href="mailto:partners@circulon.io" className="btn-liquid magnetic inline-flex items-center gap-3 px-6 py-4 rounded-full bg-signal text-pine2 font-medium text-[15px]">
              Book a private briefing <ArrowUpRight size={16} />
            </a>
            <a href="#" className="magnetic inline-flex items-center gap-3 px-6 py-4 rounded-full border border-bone/25 text-[15px] hover:border-bone/60">
              Download 2024 impact report
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Footer */
function Footer() {
  return (
    <footer className="border-t border-hairline py-16">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="font-editorial text-4xl">Circulon<span className="text-signal">.</span></div>
            <p className="mt-4 max-w-sm text-[13px] text-bone/55 leading-relaxed">Circulon Advisory Group is a global strategy and engineering consultancy in the circular economy.</p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/45 mb-4">Firm</div>
            <ul className="space-y-2 text-[13px] text-bone/75">
              <li><a href="#" className="hover:text-signal">About</a></li>
              <li><a href="#" className="hover:text-signal">Careers</a></li>
              <li><a href="#" className="hover:text-signal">Insights</a></li>
              <li><a href="#" className="hover:text-signal">Press</a></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/45 mb-4">Offices</div>
            <ul className="space-y-2 text-[13px] text-bone/75"><li>London</li><li>Singapore</li><li>Chicago</li><li>Rotterdam</li></ul>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/45 mb-4">Direct</div>
            <div className="text-[13px] text-bone/75">partners@circulon.io</div>
            <div className="text-[13px] text-bone/75">+44 20 4526 8100</div>
          </div>
        </div>
        <div className="hairline my-10" />
        <div className="flex flex-col md:flex-row justify-between gap-4 font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
          <span>© 2025 Circulon Advisory Group Ltd.</span>
          <span>ISO 14001 · GRI · SASB · TCFD</span>
          <span>Privacy · Terms · Modern Slavery</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <LenisProvider />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <CircularityEngineSection />
        <TrustBar />
        <Services />
        <Impact />
        <WhyChooseUs />
        <EngagementModel />
        <Credentials />
        <CaseStudy />
        <ClientVoice />
        <InsightsPreview />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
