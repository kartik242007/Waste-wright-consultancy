'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Recycle, ShieldCheck, BatteryCharging, Leaf, Disc, ClipboardCheck } from 'lucide-react'
import { SERVICES } from './servicesData'

/* ================================================================ */
/*  HeroOrbit — 2D/CSS pseudo-3D replacement for the old R3F hero.    */
/*  Extruded WW mark (stacked, tilted PNG layers) with a specular     */
/*  sweep, orbited by six glass "chips" moving on a genuine tilted    */
/*  ellipse (cos/sin per-frame, not a fixed CSS circle) that scale,   */
/*  brighten and z-shift as they pass in front of / behind the mark.  */
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
const LAYERS = 11

export default function HeroOrbit() {
  const [angle, setAngle] = useState(0)
  const [hoverIdx, setHoverIdx] = useState(null)
  const [reduced, setReduced] = useState(false)
  const [radius, setRadius] = useState({ x: 190, y: 68 })
  const rafRef = useRef(null)
  const lastRef = useRef(null)

  // Respect prefers-reduced-motion — freeze into a static, legible layout
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // Responsive orbit radius
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setRadius(mq.matches ? { x: 108, y: 40 } : { x: 190, y: 68 })
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
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
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: '1400px' }}
    >
      {/* Emerald glow — matches .radial-fade color/opacity language */}
      <div
        aria-hidden
        className="absolute w-[380px] h-[380px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74,232,160,0.30) 0%, rgba(74,232,160,0) 65%)',
          filter: 'blur(34px)',
        }}
      />

      {/* Extruded WW mark */}
      <motion.div
        className="relative w-[128px] h-[128px] md:w-[168px] md:h-[168px]"
        style={{ transformStyle: 'preserve-3d' }}
        animate={reduced ? {} : { rotateY: [-15, 15, -15], rotateX: [-6, 6, -6] }}
        transition={reduced ? {} : { duration: 8.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {Array.from({ length: LAYERS }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `translateZ(${-i * 5}px)`,
              filter: `brightness(${Math.max(0.32, 1 - i * 0.065)})`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/waste-wright-mark.png"
              alt=""
              draggable={false}
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>
        ))}

        {/* Specular sweep — clipped to the mark's own alpha shape */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: 'translateZ(6px)',
              WebkitMaskImage: 'url(/brand/waste-wright-mark.png)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(/brand/waste-wright-mark.png)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              background: 'linear-gradient(105deg, transparent 32%, rgba(255,255,255,0.85) 50%, transparent 68%)',
              mixBlendMode: 'overlay',
            }}
            animate={{ x: ['-55%', '55%', '-55%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>

      {/* Orbiting service chips */}
      {chips.map((c) => (
        <ChipItem
          key={c.i}
          chip={c}
          hovered={hoverIdx === c.i}
          onEnter={() => setHoverIdx(c.i)}
          onLeave={() => setHoverIdx(null)}
        />
      ))}
    </motion.div>
  )
}

function ChipItem({ chip, hovered, onEnter, onLeave }) {
  const { x, y, scale, opacity, z, caption, service, Icon } = chip
  const flipLeft = x > 15

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
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onEnter}
    >
      <div className="relative h-[58px] w-[58px] rounded-full border border-bone/25 bg-bone/10 backdrop-blur-md flex items-center justify-center text-bone shadow-[0_6px_24px_-6px_rgba(0,0,0,0.5)]">
        <Icon size={20} strokeWidth={1.6} />
      </div>
      <span className="font-mono2 text-[9px] tracking-[0.18em] uppercase text-bone/75 text-center whitespace-nowrap">
        {caption}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className={`absolute top-1/2 -translate-y-1/2 ${flipLeft ? 'right-full mr-4' : 'left-full ml-4'} w-64 rounded-lg border border-bone/20 p-5 overflow-hidden`}
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
