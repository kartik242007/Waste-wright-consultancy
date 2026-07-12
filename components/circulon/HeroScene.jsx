'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

/* ================================================================ */
/*  Reclaimed Circuit — an orbiting cluster of abstracted electronic */
/*  components around a glowing shine-green core. Fine gold traces,  */
/*  three staggered pulse-rings, subtle parallax on cursor, fog for  */
/*  depth-of-field. Premium and abstract — not literal e-waste.      */
/* ================================================================ */

const SHINE = '#4AE8A0'
const GOLD  = '#C9A227'
const DEEP  = '#0F3A26'
const MID   = '#1F5C42'

function Core() {
  const meshRef = useRef()
  const glowRef = useRef()
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35
      meshRef.current.rotation.x += delta * 0.12
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06
      glowRef.current.scale.setScalar(s)
    }
  })
  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color={DEEP}
          emissive={SHINE}
          emissiveIntensity={1.6}
          metalness={0.75}
          roughness={0.18}
          toneMapped={false}
        />
      </mesh>
      {/* soft halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.72, 24, 24]} />
        <meshBasicMaterial color={SHINE} transparent opacity={0.11} toneMapped={false} />
      </mesh>
    </group>
  )
}

function BoardFragment({ radius, angle, speed, tilt }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = angle + state.clock.elapsedTime * speed
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.6) * 0.32,
      Math.sin(t) * radius,
    )
    ref.current.rotation.set(tilt, t * 0.6, tilt * 0.5)
  })
  return (
    <group ref={ref}>
      {/* board */}
      <mesh>
        <boxGeometry args={[0.55, 0.025, 0.38]} />
        <meshStandardMaterial color={DEEP} metalness={0.5} roughness={0.55} />
      </mesh>
      {/* gold traces */}
      <mesh position={[0, 0.014, 0.06]}>
        <boxGeometry args={[0.44, 0.006, 0.008]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <mesh position={[0.09, 0.014, -0.09]}>
        <boxGeometry args={[0.24, 0.006, 0.008]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <mesh position={[-0.12, 0.014, 0.13]}>
        <boxGeometry args={[0.20, 0.006, 0.008]} />
        <meshStandardMaterial color={SHINE} emissive={SHINE} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      {/* small chip on board */}
      <mesh position={[0.14, 0.035, 0]}>
        <boxGeometry args={[0.09, 0.04, 0.09]} />
        <meshStandardMaterial color={MID} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* solder points */}
      <mesh position={[-0.18, 0.02, -0.14]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      <mesh position={[0.22, 0.02, -0.14]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color={SHINE} emissive={SHINE} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Capacitor({ radius, angle, speed, y }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = angle + state.clock.elapsedTime * speed
    ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 0.5) * 0.15, Math.sin(t) * radius)
    ref.current.rotation.set(t * 0.4, t * 0.3, 0)
  })
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 0.20, 20]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.22} />
      </mesh>
      {/* cap top ring */}
      <mesh position={[0, 0.101, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.055, 0.006, 8, 20]} />
        <meshStandardMaterial color={DEEP} metalness={0.6} roughness={0.5} />
      </mesh>
      {/* lead */}
      <mesh position={[0, -0.14, 0]}>
        <cylinderGeometry args={[0.007, 0.007, 0.09, 8]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Chip({ radius, angle, speed, y, size = 0.09 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = angle + state.clock.elapsedTime * speed
    ref.current.position.set(Math.cos(t) * radius, y + Math.cos(t * 0.7) * 0.22, Math.sin(t) * radius)
    ref.current.rotation.set(t, t * 0.5, t * 0.3)
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={DEEP} metalness={0.7} roughness={0.35} emissive={SHINE} emissiveIntensity={0.22} />
    </mesh>
  )
}

function ConnectorPin({ radius, angle, speed, y }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = angle + state.clock.elapsedTime * speed
    ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 0.9) * 0.18, Math.sin(t) * radius)
    ref.current.rotation.set(t * 0.5, t * 0.3, Math.PI / 4)
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.015, 0.28, 0.015]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} metalness={0.9} roughness={0.15} toneMapped={false} />
    </mesh>
  )
}

/* Expanding trace pulse — thin ring that grows outward from the core */
function TracePulse({ delay = 0, duration = 2.6 }) {
  const ref = useRef()
  const matRef = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = (((state.clock.elapsedTime + delay) % duration) / duration) // 0..1
    const r = 0.6 + t * 3.2
    ref.current.scale.setScalar(r)
    if (matRef.current) {
      // gentle in-out — never a hard strobe
      matRef.current.opacity = Math.max(0, 0.55 * Math.sin(Math.PI * t))
    }
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.98, 1.005, 128]} />
      <meshBasicMaterial ref={matRef} color={SHINE} transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* Static PCB trace-line "spokes" that fade in/out sequentially */
function TraceSpoke({ angle, delay = 0, length = 2.2 }) {
  const ref = useRef()
  const matRef = useRef()
  const pts = useMemo(() => {
    return [
      new THREE.Vector3(Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5),
      new THREE.Vector3(Math.cos(angle) * length, 0, Math.sin(angle) * length),
    ]
  }, [angle, length])
  useFrame((state) => {
    if (!matRef.current) return
    const t = ((state.clock.elapsedTime + delay) % 3.2) / 3.2
    matRef.current.opacity = 0.35 * Math.max(0, Math.sin(Math.PI * t))
  })
  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(pts.flatMap(p => [p.x, p.y, p.z]))} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial ref={matRef} color={SHINE} transparent opacity={0} toneMapped={false} />
    </line>
  )
}

function Cluster() {
  const g = useRef()
  useFrame((state, delta) => {
    if (!g.current) return
    g.current.rotation.y += delta * 0.06
    // Subtle cursor parallax
    const { x, y } = state.pointer
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, y * 0.15, 0.04)
    g.current.position.x = THREE.MathUtils.lerp(g.current.position.x, x * 0.18, 0.04)
  })
  return (
    <group ref={g}>
      <Core />

      {/* Ring 1 — Board fragments */}
      {[0, 1.05, 2.1, 3.15, 4.2, 5.25].map((a, i) => (
        <BoardFragment key={'b'+i} radius={1.45} angle={a} speed={0.22} tilt={0.35 + i * 0.05} />
      ))}

      {/* Ring 2 — Capacitors */}
      {[0.3, 1.55, 2.8, 4.05, 5.3].map((a, i) => (
        <Capacitor key={'c'+i} radius={2.1} angle={a} speed={0.15} y={i % 2 === 0 ? 0.35 : -0.32} />
      ))}

      {/* Ring 3 — Chips */}
      {[0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4].map((a, i) => (
        <Chip key={'k'+i} radius={2.65} angle={a} speed={0.28} y={i % 2 === 0 ? 0.55 : -0.52} size={i % 3 === 0 ? 0.11 : 0.08} />
      ))}

      {/* Outermost — thin gold connector pins */}
      {[0.5, 2.0, 3.6, 5.1].map((a, i) => (
        <ConnectorPin key={'p'+i} radius={3.0} angle={a} speed={0.34} y={i % 2 === 0 ? -0.6 : 0.6} />
      ))}

      {/* Trace-line pulse rings (staggered, gentle sinusoidal opacity) */}
      <TracePulse delay={0}   duration={2.6} />
      <TracePulse delay={0.9} duration={2.6} />
      <TracePulse delay={1.8} duration={2.6} />

      {/* PCB "spokes" — fine radial trace-lines that fade in/out */}
      {[0, Math.PI/3, (2*Math.PI)/3, Math.PI, (4*Math.PI)/3, (5*Math.PI)/3].map((a, i) => (
        <TraceSpoke key={'sp'+i} angle={a} delay={i * 0.35} length={2.0} />
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 5.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Fog gives an approximate depth-of-field look without postprocessing */}
      <fog attach="fog" args={['#0A1F16', 4, 9.5]} />
      <ambientLight intensity={0.22} />
      <pointLight position={[0, 0, 0]} intensity={4.5} color={SHINE} distance={7} />
      <directionalLight position={[3, 4, 4]} intensity={0.55} color="#F4F1E9" />
      <directionalLight position={[-3, -2, -3]} intensity={0.28} color={SHINE} />
      <Cluster />
      <Environment preset="warehouse" />
    </Canvas>
  )
}
