'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Recycle, ShieldCheck, BatteryCharging, Leaf, Disc, ClipboardCheck, X } from 'lucide-react'
import { SERVICES } from './servicesData'

/* ================================================================ */
/*  HeroOrbit — 2D/CSS pseudo-3D hero visual, shifted right to fill  */
/*  the empty space beside the headline. Single clean/shiny WW mark  */
/*  (no stacked "block" layers) with a soft backlit glow + a         */
/*  specular sweep, ringed by a visible elliptical orbit track that  */
/*  six glass "chips" travel on via genuine cos/sin motion (not a    */
/*  fixed CSS circle) — scaling / brightening as they pass in front  */
/*  of the mark, dimming as they pass behind it.                     */
/* ================================================================ */

const CAPTIONS = [
  'Plastic EPR',
  'Plastic Compliance',
  'Battery EPR',
  'Environmental Consultancy',
  'Waste Tyres',
  'Audit Support',
]
const ICONS = [Recycle, ShieldCheck, BatteryCharging, Leaf, Disc, ClipboardCheck]
const BASE_ANGLES = [0, 60, 120, 180, 240, 300].map((d) => (d * Math.PI) / 180)
const SPEED = 0.00026 // radians / ms

export default function HeroOrbit() {
  const [angle, setAngle] = useState(0)
  const [hoverIdx, setHoverIdx] = useState(null)
  const [reduced, setReduced] = useState(false)
  const [layout, setLayout] = useState({ center: { x: '70%', y: '48%' }, radius: { x: 340, y: 148 }, logo: 380 })
  // `compact` = ≤768px: tighter orbit + wrapping captions sized to the chip.
  // `belowLg` = <1024px: the hover flyout is unreachable on touch, so the
  // detail card is presented as a tap-opened sheet instead. At exactly 1024px
  // both stay false-side/desktop so `lg:` and up renders exactly as before.
  const [compact, setCompact] = useState(false)
  const [belowLg, setBelowLg] = useState(false)
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef(null)
  const lastRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  // Respect prefers-reduced-motion — freeze into a static, legible layout
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // Responsive center / radius / logo size — anchored to the right on
  // desktop to fill the space beside the headline; centered + compact on mobile.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mqTablet = window.matchMedia('(max-width: 1024px)')
    const mqMobile = window.matchMedia('(max-width: 768px)')
    const mqBelowLg = window.matchMedia('(max-width: 1023.98px)')
    const update = () => {
      if (mqMobile.matches) {
        // Taller/rounder ellipse than before so the three chip rows clear each
        // other vertically once captions are allowed to wrap (see ChipItem).
        setLayout({ center: { x: '50%', y: '84%' }, radius: { x: 112, y: 86 }, logo: 150 })
      } else if (mqTablet.matches) {
        setLayout({ center: { x: '62%', y: '46%' }, radius: { x: 230, y: 100 }, logo: 260 })
      } else {
        setLayout({ center: { x: '70%', y: '48%' }, radius: { x: 340, y: 148 }, logo: 380 })
      }
      setCompact(mqMobile.matches)
      setBelowLg(mqBelowLg.matches)
    }
    update()
    mqTablet.addEventListener?.('change', update)
    mqMobile.addEventListener?.('change', update)
    mqBelowLg.addEventListener?.('change', update)
    return () => {
      mqTablet.removeEventListener?.('change', update)
      mqMobile.removeEventListener?.('change', update)
      mqBelowLg.removeEventListener?.('change', update)
    }
  }, [])

  // Continuous elliptical motion via requestAnimationFrame (paused on hover)
  useEffect(() => {
    if (reduced) return
    const step = (ts) => {
      if (lastRef.current == null) lastRef.current = ts
      const dt = ts - lastRef.current
      lastRef.current = ts
      if (hoverIdx === null) setAngle((a) => a + dt * SPEED)
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastRef.current = null
    }
  }, [hoverIdx, reduced])

  const { center, radius, logo } = layout

  const chips = useMemo(() => {
    return BASE_ANGLES.map((base, i) => {
      const a = reduced ? base : base + angle
      const x = Math.cos(a) * radius.x
      const y = Math.sin(a) * radius.y
      const depth = Math.sin(a) // -1 (behind) .. 1 (in front)
      const t = (depth + 1) / 2
      const scale = 0.58 + t * 0.62
      const opacity = 0.38 + t * 0.62
      const z = depth > 0 ? 30 : 4
      return { i, x, y, scale, opacity, z, caption: CAPTIONS[i], service: SERVICES[i], Icon: ICONS[i] }
    })
  }, [angle, reduced, radius])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 1.3, ease: [0.2, 0.8, 0.2, 1] }}
      className="absolute inset-0"
    >
      {/* Everything below anchors to this single point — moving `center`
          moves the glow, ring, mark and orbit together as one unit. Uses an
          explicit-size, self-centered wrapper (rather than a zero-size one)
          so the logo/glow/ring are guaranteed to share one true center. */}
      <div
        className="absolute"
        style={{
          top: center.y,
          left: center.x,
          width: radius.x * 2,
          height: radius.y * 2,
          transform: 'translate(-50%, -50%)',
          isolation: 'isolate',
        }}
      >

        {/* Emerald glow — matches .radial-fade color/opacity language */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: radius.x * 1.65,
            height: radius.y * 2.6,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(74,232,160,0.26) 0%, rgba(74,232,160,0) 65%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Visible orbit track — thin elliptical ring the chips travel on */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: radius.x * 2,
            height: radius.y * 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(74,232,160,0.20)',
            boxShadow: 'inset 0 0 40px rgba(74,232,160,0.05)',
          }}
        />

        {/* Clean single-plane WW mark — soft backlit glow + crisp mark + shine sweep.
            Intentionally no 3D rotation here: combining rotateX/Y + perspective with
            the masked/blended specular sweep caused a ghosting render artifact in
            Chromium, so depth/life comes from a subtle 2D breathing scale instead. */}
        <div
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: logo,
            height: logo,
            transform: 'translate(-50%, -50%)',
            isolation: 'isolate',
          }}
        >
          {/* Scale-breathing lives on this inner wrapper — framer-motion's
              `animate` takes over the `transform` property entirely, which
              was silently discarding the outer translate(-50%,-50%) centering
              above and making the logo appear off-center from the ring. */}
          <motion.div
            className="absolute inset-0"
            animate={reduced ? {} : { scale: [1, 1.035, 1] }}
            transition={reduced ? {} : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
          {/* crisp single logo layer — no filters on the rotating plane itself
              (avoids drop-shadow + 3D-transform rendering artifacts); glow
              comes purely from the separate ambient radial-gradient behind it */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/waste-wright-mark.png" alt="Waste Wright" draggable={false} className="w-full h-full object-contain select-none pointer-events-none" />
          </div>

          {/* Specular sweep — clipped to the mark's own alpha shape. The masked
              element itself stays perfectly static (aligned with the real logo);
              only the gradient's background-position sweeps within that fixed
              clip, so there is never a second moving silhouette/ghost. */}
          {!reduced && (
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                WebkitMaskImage: 'url(/brand/waste-wright-mark.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/brand/waste-wright-mark.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                backgroundImage: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.95) 50%, transparent 62%)',
                backgroundSize: '320% 100%',
                backgroundRepeat: 'no-repeat',
                mixBlendMode: 'overlay',
              }}
              animate={{ backgroundPositionX: ['-110%', '110%', '-110%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          </motion.div>
        </div>

        {/* Orbiting service chips */}
        {chips.map((c) => (
          <ChipItem
            key={c.i}
            chip={c}
            compact={compact}
            belowLg={belowLg}
            hovered={hoverIdx === c.i}
            onEnter={() => setHoverIdx(c.i)}
            onLeave={() => setHoverIdx(null)}
          />
        ))}
      </div>

      {/* Touch/small-viewport detail sheet — the `w-64` side flyout has nowhere
          to render beside a 112px-radius orbit, and hover doesn't exist on
          touch. Same card content, same framer-motion timing, presented as a
          full-width bottom sheet instead. Portalled to <body> so it escapes the
          hero's transformed/opacity-reduced ancestors. */}
      {mounted && belowLg && createPortal(
        <AnimatePresence>
          {hoverIdx !== null && (
            <motion.div
              className="fixed inset-0 z-[90] flex items-end lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <button
                type="button"
                aria-label="Close service detail"
                className="absolute inset-0 bg-pine/60 backdrop-blur-[2px]"
                onClick={() => setHoverIdx(null)}
              />
              <motion.div
                role="dialog"
                aria-label={SERVICES[hoverIdx].t}
                initial={{ opacity: 0, scale: 0.94, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 4 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative w-full rounded-t-lg border-t border-x border-bone/20 p-6 pb-8 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(18,42,30,0.96), rgba(10,31,22,0.92))',
                  backdropFilter: 'blur(18px)',
                  paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
                }}
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)' }}
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                />
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setHoverIdx(null)}
                  className="absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/70"
                >
                  <X size={16} />
                </button>
                <div className="relative pr-12">
                  <div className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-signal mb-2">{SERVICES[hoverIdx].k}</div>
                  <div className="font-editorial text-xl text-bone leading-snug mb-2">{SERVICES[hoverIdx].t}</div>
                  <p className="text-[13px] leading-[1.6] text-bone/70">{SERVICES[hoverIdx].d}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  )
}

function ChipItem({ chip, hovered, onEnter, onLeave, compact, belowLg }) {
  const { x, y, scale, opacity, z, caption, service, Icon } = chip
  const flipLeft = x > 15
  // Vertical anchor: near the top/bottom of the orbit, anchor the card to the
  // chip's near edge (so it grows toward the open side of the viewport)
  // instead of always centering it, which previously let it run off-screen.
  const vAnchor = y < -40 ? 'top-0' : y > 40 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'

  return (
    <div
      className="absolute flex flex-col items-center gap-2 cursor-pointer"
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${hovered ? Math.max(scale, 0.95) : scale})`,
        // Snap to full opacity while hovered so a chip that happens to be in
        // the "behind" orbit phase (dim) — and its info card — stay legible.
        opacity: hovered ? 1 : opacity,
        // Hovered chip's whole stacking context is elevated above everything
        // (including "front" chips and the logo) so its info card is never
        // trapped behind a sibling chip that has a higher base z-index.
        zIndex: hovered ? 100 : z,
      }}
      onMouseEnter={belowLg ? undefined : onEnter}
      onMouseLeave={belowLg ? undefined : onLeave}
      onClick={hovered && belowLg ? onLeave : onEnter}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`${service.t} — view detail`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onEnter() } }}
        className={`relative rounded-full border border-bone/25 bg-bone/10 backdrop-blur-md flex items-center justify-center text-bone shadow-[0_6px_24px_-6px_rgba(0,0,0,0.5)] ${compact ? 'h-12 w-12' : 'h-[58px] w-[58px]'}`}
      >
        <Icon size={compact ? 18 : 20} strokeWidth={1.6} />
      </div>
      {/* Captions wrap inside a fixed box on mobile — `whitespace-nowrap` at a
          112px orbit radius ran "Environmental Consultancy" straight off the
          viewport and into its neighbours. */}
      <span
        className={
          compact
            ? 'font-mono2 text-[8px] leading-[1.25] tracking-[0.1em] uppercase text-bone/75 text-center w-[76px]'
            : 'font-mono2 text-[9px] tracking-[0.18em] uppercase text-bone/75 text-center whitespace-nowrap'
        }
      >
        {caption}
      </span>

      <AnimatePresence>
        {hovered && !belowLg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className={`absolute ${vAnchor} ${flipLeft ? 'right-full mr-4' : 'left-full ml-4'} w-64 rounded-lg border border-bone/20 p-5 overflow-hidden`}
            style={{
              background: 'linear-gradient(135deg, rgba(18,42,30,0.88), rgba(10,31,22,0.78))',
              backdropFilter: 'blur(18px)',
              zIndex: 60,
            }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)' }}
              initial={{ x: '-120%' }}
              animate={{ x: '120%' }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <div className="relative">
              <div className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-signal mb-2">{service.k}</div>
              <div className="font-editorial text-lg text-bone leading-snug mb-2">{service.t}</div>
              <p className="text-[12px] leading-[1.55] text-bone/70">{service.d}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
