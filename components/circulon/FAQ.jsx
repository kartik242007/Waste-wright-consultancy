'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'Are engagements confidential?',
    a: 'Every mandate is bound by mutual NDA before scoping. Client identities and data appear in our marketing only with written, revocable consent.',
    tag: 'Confidentiality',
  },
  {
    q: 'What is a typical engagement timeline?',
    a: 'Diagnose runs 6–10 weeks. Full four-phase engagements average 14–22 months to reach steady-state disclosure.',
    tag: 'Timeline',
  },
  {
    q: 'How is Circulon priced?',
    a: 'Fixed-fee for Diagnose. Value-shared or milestone-based for Design → Deploy → Disclose. No hourly billing, ever.',
    tag: 'Commercials',
  },
  {
    q: 'Where do you operate?',
    a: 'Active mandates across 41 countries from four offices — London, Rotterdam, Chicago and Singapore. Local partners handle jurisdictional filing.',
    tag: 'Coverage',
  },
  {
    q: 'What do you need from us to start?',
    a: 'A 45-minute briefing plus your last twelve months of waste ledger and disclosure filings. We return a directional impact model within seven days.',
    tag: 'On-boarding',
  },
]

function Item({ item, index, open, onToggle }) {
  return (
    <div className={`relative group border-t border-hairline ${index === FAQS.length - 1 ? 'border-b' : ''}`}>
      {/* animated left accent */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleY: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-signal origin-top"
      />
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start md:items-center gap-6 py-7 md:py-8 px-4 md:px-8"
        aria-expanded={open}
      >
        {/* Row number */}
        <span className="font-mono2 text-[11px] tracking-[0.3em] uppercase text-bone/40 pt-1 md:pt-0 w-8 shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <h3 className={`flex-1 font-editorial text-2xl md:text-3xl lg:text-[2rem] leading-tight tracking-tight transition-colors duration-500 ${open ? 'text-bone' : 'text-bone/85 group-hover:text-bone'}`}>
          {item.q}
        </h3>

        {/* Tag (right) */}
        <span className="hidden md:inline font-mono2 text-[10px] tracking-[0.3em] uppercase text-bone/40 min-w-[110px] text-right">
          {item.tag}
        </span>

        {/* Plus / minus */}
        <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline group-hover:border-bone/40 transition-colors">
          <span className="absolute inset-x-2 h-px bg-bone/80" />
          <motion.span
            aria-hidden
            className="absolute inset-y-2 w-px bg-bone/80 origin-center"
            initial={false}
            animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
            transition={{ duration: 0.35, ease: [0.7, 0, 0.2, 1] }}
          />
          <motion.span
            aria-hidden
            initial={false}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          />
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-4 md:pl-20 pr-4 md:pr-8 pb-8 md:pb-10 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-8">
                <p className="text-[16px] md:text-[17px] leading-[1.6] text-bone/75 max-w-2xl">
                  {item.a}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 flex md:justify-end items-end">
                <a href="#contact" className="inline-flex items-center gap-2 font-mono2 text-[11px] tracking-[0.3em] uppercase text-signal border-b border-signal/40 pb-1 hover:gap-3 transition-all">
                  Ask a partner directly →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative py-24 md:py-28 border-t border-hairline">
      <div className="container">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-16 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-signal font-mono2 mb-4">
              <span className="inline-block w-8 h-px bg-signal" /> 08 · Before You Book
            </div>
            <h2 className="font-editorial text-display-lg text-balance">
              Five questions. <span className="text-bone/50 italic">Five short answers.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.65] text-bone/65 max-w-md md:ml-auto">
              The handful of things enterprise buyers ask before scheduling a partner briefing — answered on the record, without the boilerplate. If yours isn't here, the closing CTA below opens a direct line.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="relative">
          {FAQS.map((item, i) => (
            <Item
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        {/* Footer meta */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-mono2 text-[10px] tracking-widest uppercase text-bone/40">
            Full pre-engagement Q&amp;A available in the digital datapack
          </div>
          <a href="#" className="font-mono2 text-[11px] tracking-[0.3em] uppercase text-bone/80 hover:text-signal transition-colors">
            Request datapack →
          </a>
        </div>
      </div>
    </section>
  )
}
