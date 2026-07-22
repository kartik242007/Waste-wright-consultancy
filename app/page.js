'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import LenisProvider from '@/components/waste-wright/LenisProvider'
import ContactForm from '@/components/waste-wright/ContactForm'
import LeadCaptureModal from '@/components/waste-wright/LeadCaptureModal'
import { SERVICES } from '@/components/waste-wright/servicesData'
import AboutUs from '@/components/waste-wright/AboutUs'
import EngagementModel from '@/components/waste-wright/EngagementModel'
import Credentials from '@/components/waste-wright/Credentials'
import WhyChooseUs from '@/components/waste-wright/WhyChooseUs'
import ClientVoice from '@/components/waste-wright/ClientVoice'
import FAQ from '@/components/waste-wright/FAQ'

const HeroOrbit        = dynamic(() => import('@/components/waste-wright/HeroOrbit'),       { ssr: false, loading: () => null })

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
            <div className="font-mono2 text-[10px] tracking-[0.35em] text-bone/50 uppercase">Waste Wright / Initialising</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* Nav — "Insights" removed */
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
          <span className="font-editorial text-[19px] tracking-tight">Waste Wright<span className="text-signal">.</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[13px] text-bone/70">
          {[
            { l: 'About',        h: '#about' },
            { l: 'Services',     h: '#services' },
            { l: 'Case Studies', h: '#case-studies' },
            { l: 'Careers',      h: '#careers' },
          ].map(({ l, h }) => (
            <a key={l} href={h} className="hover:text-bone transition-colors">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="btn-liquid magnetic inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bone/25 text-[13px] hover:border-signal hover:text-pine hover:bg-signal transition-colors">
          Book briefing <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  )
}

/* Hero — badges localized to India */
function Hero() {
  return (
    <section className="relative min-h-[100svh] pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 radial-fade pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-[0.35] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 -z-0 opacity-90"><Suspense fallback={null}><HeroOrbit /></Suspense></div>
      <div className="container relative z-10 pointer-events-none">
        <div className="grid grid-cols-12 gap-6 items-end min-h-[80svh]">
          <div className="col-span-12 md:col-span-9">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex items-center gap-3 text-[13px] tracking-[0.35em] uppercase text-bone/60 font-mono2 font-semibold mb-8">
              <span className="inline-block w-8 h-px bg-signal" />
              Waste Wright Consultancy · Est. 2024 · India
            </motion.div>
            <h1 className="font-editorial text-display-2xl font-semibold text-balance">
              <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.6, duration: 0.9, ease: [0.2,0.8,0.2,1] }} className="block">Engineering</motion.span>
              <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.75, duration: 0.9, ease: [0.2,0.8,0.2,1] }} className="block">the end of <span className="italic text-signal">waste</span>.</motion.span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.15, duration: 0.8 }}
              className="mt-10 max-w-xl text-[17px] leading-[1.65] text-bone/70">
              An Indian circular-economy and waste-diagnostics consultancy advising manufacturers, municipal bodies and enterprises — turning material liabilities into measurable balance-sheet gain.
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 0.8 }} className="flex flex-col gap-3 pointer-events-auto">
              <a href="#about" className="btn-liquid magnetic inline-flex items-center justify-between gap-6 px-5 py-3.5 rounded-full bg-signal text-pine2 font-medium text-[14px] hover:shadow-[0_0_40px_-4px_rgba(76,195,138,0.6)] transition-shadow">
                About Waste Wright <ArrowRight size={16} />
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
          <span>GRI · SASB · TCFD · BRSR Aligned</span>
          <span>Offices — New Delhi · Mumbai · Bengaluru · Pune</span>
        </motion.div>
      </div>
    </section>
  )
}

/* TRUST BAR — generic descriptors, no real named companies */
function TrustBar() {
  const clients = [
    'TIER-1 FMCG MANUFACTURER',
    'STATE POLLUTION CONTROL BOARD',
    'NATIONAL LOGISTICS CARRIER',
    'MUNICIPAL CORPORATION',
    'GLOBAL AUTOMOTIVE OEM',
    'INDIAN ELECTRONICS OEM',
    'TEXTILES CONGLOMERATE',
    'SOVEREIGN INFRA FUND',
    'PORT AUTHORITY',
    'PSU ENERGY MAJOR',
  ]
  return (
    <section className="py-16 border-t border-hairline overflow-hidden">
      <div className="container mb-8 flex items-center justify-between">
        <div className="font-mono2 text-[10px] tracking-[0.35em] uppercase text-bone/50">Trusted counsel to</div>
        <div className="font-mono2 text-[10px] tracking-[0.35em] uppercase text-bone/50">Anonymised until client consent — 12+ Indian states</div>
      </div>
      <div className="flex gap-16 animate-ticker whitespace-nowrap font-editorial text-2xl md:text-3xl text-bone/40">
        {[...clients, ...clients].map((c, i) => (
          <span key={i} className="hover:text-bone transition-colors">{c}</span>
        ))}
      </div>
    </section>
  )
}

/* SERVICES — six real services, shared with the HeroOrbit hover-cards via servicesData.js */
function Services() {
  return (
    <section id="services" className="py-28 md:py-36 border-t border-hairline">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 text-[13px] tracking-[0.35em] uppercase text-signal font-mono2 font-semibold mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> 02 · Services
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-editorial text-display-xl font-semibold text-balance">
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

/* IMPACT — currency to INR */
function Impact() {
  const stats = [
    { v: '2.4M',      l: 'Tonnes diverted from landfill',        c: 'signal' },
    { v: '₹340 Cr',  l: 'Economic value returned to clients',   c: 'brass'  },
    { v: '48',        l: 'Enterprise engagements delivered',       c: 'bone'   },
    { v: '12+',       l: 'Indian states under active advisory',    c: 'bone'   },
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

/* CASE STUDY — Pune municipal corporation */
function CaseStudy() {
  return (
    <section id="case-studies" className="py-28 md:py-36 border-t border-hairline">
      <div className="container">
        <div className="flex items-center gap-3 text-[13px] tracking-[0.35em] uppercase text-signal font-mono2 font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-signal" /> 06 · Featured Engagement
        </div>
        <div className="grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 lg:col-span-5">
            <div className="font-mono2 text-[11px] tracking-widest uppercase text-bone/50 mb-4">Case · CS-114 · Pune</div>
            <h3 className="font-editorial text-display-lg font-semibold text-balance">
              Rebuilding a municipal corporation's waste ledger — <span className="italic text-signal">82% diversion in 18 months.</span>
            </h3>
            <p className="mt-8 text-[15px] leading-[1.7] text-bone/65 max-w-lg">
              A tier-1 Indian municipal corporation faced mounting non-compliance risk under the Solid Waste Management Rules and rising landfill costs. Waste Wright Consultancy designed the diagnostic protocol, modernised two material recovery facilities, and stood up a compliance data-layer feeding directly into CPCB reporting and the corporation's BRSR disclosures.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-hairline pt-8">
              <div><div className="font-editorial text-3xl text-signal">82%</div><div className="mt-1 text-[11px] tracking-widest uppercase text-bone/45 font-mono2">Diversion</div></div>
              <div><div className="font-editorial text-3xl">₹34 Cr</div><div className="mt-1 text-[11px] tracking-widest uppercase text-bone/45 font-mono2">Saved / yr</div></div>
              <div><div className="font-editorial text-3xl text-brass">18 mo</div><div className="mt-1 text-[11px] tracking-widest uppercase text-bone/45 font-mono2">To full-scale</div></div>
            </div>
            <a href="#contact" className="mt-12 inline-flex items-center gap-2 text-[14px] border-b border-signal/60 pb-1 hover:gap-4 transition-all">Read the full engagement <ArrowRight size={14} /></a>
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
        <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/50">Before · 2023</div>
        <div className="mt-8 flex items-end gap-2 h-[calc(100%-4rem)]">
          {[32, 74, 22, 58, 88, 42, 62, 84, 28, 70, 46, 80].map((h, i) => (<div key={i} className="flex-1 bg-bone/25" style={{ height: `${h}%` }} />))}
        </div>
      </div>
      <div className="absolute inset-0 bg-pine2 p-10" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <div className="font-mono2 text-[10px] tracking-widest uppercase text-signal">After · 2024</div>
        <div className="mt-8 flex items-end gap-2 h-[calc(100%-4rem)]">
          {[72, 78, 82, 76, 86, 80, 84, 88, 82, 86, 90, 92].map((h, i) => (<div key={i} className="flex-1 bg-signal/80 shadow-[0_0_20px_-2px_rgba(76,195,138,0.5)]" style={{ height: `${h}%` }} />))}
        </div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10" />
      <div className="absolute top-0 bottom-0 w-px bg-bone/70 pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-bone text-pine2 flex items-center justify-center text-xs font-mono2">⇔</div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono2 text-[10px] tracking-widest uppercase text-bone/60 pointer-events-none">
        <span>Drag to compare</span><span className="text-signal">+62 pts diversion</span>
      </div>
    </div>
  )
}

/* Closing CTA — contact form added, impact-report download removed */
function CTA() {
  return (
    <section id="contact" className="py-28 md:py-36 border-t border-hairline relative overflow-hidden">
      <div className="absolute inset-0 radial-fade pointer-events-none" />
      <div className="container relative">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center gap-3 text-[13px] tracking-[0.35em] uppercase text-signal font-mono2 font-semibold mb-6">
              <span className="inline-block w-8 h-px bg-signal" /> Begin
            </div>
            <h2 className="font-editorial text-display-xl font-semibold text-balance">
              Model your material future. <span className="italic text-bone/50">In one briefing.</span>
            </h2>
            <p className="mt-8 max-w-xl text-[16px] text-bone/65 leading-[1.7]">
              A confidential 45-minute engagement with a Waste Wright Consultancy partner. We'll assess your waste ledger, regulatory exposure, and circular-economy readiness — and issue a directional impact model within seven days.
            </p>
            <div className="mt-10">
              <a href="#form" className="btn-liquid magnetic inline-flex items-center gap-3 px-6 py-4 rounded-full bg-signal text-pine2 font-medium text-[15px]">
                Book a private briefing <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Direct-line meta */}
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-hairline pt-8 max-w-md">
              <div>
                <div className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/45 mb-2">Direct line</div>
                <div className="text-[14px] text-bone/80">partners@wastewright.in</div>
                <div className="text-[14px] text-bone/60">+91 22 6816 5100</div>
              </div>
              <div>
                <div className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/45 mb-2">Response time</div>
                <div className="text-[14px] text-bone/80">Within one business day</div>
                <div className="text-[14px] text-bone/60">IST · Mon–Fri</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div id="form" className="col-span-12 lg:col-span-6">
            <div className="rounded-lg border border-hairline bg-graphite/40 p-8 md:p-10">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-bone/55 font-mono2 mb-8">
                <span className="inline-block w-6 h-px bg-signal" /> Request a briefing
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Footer — Insights removed from Firm list, offices localized */
function Footer() {
  return (
    <footer className="border-t border-hairline py-16">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="font-editorial text-4xl">Waste Wright<span className="text-signal">.</span></div>
            <p className="mt-4 max-w-sm text-[13px] text-bone/55 leading-relaxed">Waste Wright Consultancy is an Indian strategy and engineering consultancy in the circular economy.</p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/45 mb-4">Firm</div>
            <ul className="space-y-2 text-[13px] text-bone/75">
              <li><a href="#about" className="hover:text-signal">About</a></li>
              <li><a href="#careers" className="hover:text-signal">Careers</a></li>
              <li><a href="#case-studies" className="hover:text-signal">Case Studies</a></li>
              <li><a href="#contact" className="hover:text-signal">Press</a></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/45 mb-4">Offices</div>
            <ul className="space-y-2 text-[13px] text-bone/75"><li>New Delhi</li><li>Mumbai</li><li>Bengaluru</li><li>Pune</li></ul>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/45 mb-4">Direct</div>
            <div className="text-[13px] text-bone/75">partners@wastewright.in</div>
            <div className="text-[13px] text-bone/75">+91 22 6816 5100</div>
          </div>
        </div>
        <div className="hairline my-10" />
        <div className="flex flex-col md:flex-row justify-between gap-4 font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
          <span>© 2025 Waste Wright Consultancy Pvt. Ltd.</span>
          <span>ISO 14001 · GRI · SASB · TCFD · BRSR</span>
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
      <LeadCaptureModal />
      <main>
        <Hero />
        <AboutUs />
        <TrustBar />
        <Services />
        <Impact />
        <WhyChooseUs />
        <EngagementModel />
        <Credentials />
        <CaseStudy />
        <ClientVoice />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
