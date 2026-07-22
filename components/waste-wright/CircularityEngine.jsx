'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

const COUNT = 2200

// Fibonacci-lattice sphere points (ordered target)
function fibonacciSphere(n, radius = 1.6) {
  const pts = new Float32Array(n * 3)
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    pts[i * 3 + 0] = Math.cos(theta) * r * radius
    pts[i * 3 + 1] = y * radius
    pts[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return pts
}

// Chaotic pile shape (weighted downward, jagged)
function chaoticPile(n, spread = 2.4) {
  const pts = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 0.6) * spread
    const theta = Math.random() * Math.PI * 2
    const yBias = Math.pow(Math.random(), 1.8) * 1.6 - 1.1
    pts[i * 3 + 0] = Math.cos(theta) * r + (Math.random() - 0.5) * 0.4
    pts[i * 3 + 1] = yBias + (Math.random() - 0.5) * 0.25
    pts[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 0.4
  }
  return pts
}

function ParticleField({ progress }) {
  const meshRef = useRef()
  const linesRef = useRef()
  const chaos = useMemo(() => chaoticPile(COUNT), [])
  const order = useMemo(() => fibonacciSphere(COUNT), [])
  const tmpObj = useMemo(() => new THREE.Object3D(), [])
  const tmpColor = useMemo(() => new THREE.Color(), [])
  const chaosColor = useMemo(() => new THREE.Color('#6b5a3c'), []) // dusty brass-brown
  const orderColor = useMemo(() => new THREE.Color('#4CC38A'), [])
  const brassColor = useMemo(() => new THREE.Color('#C9A227'), [])

  // build a set of neighbor pairs for the lattice "network" lines (drawn only when ordered)
  const linePositions = useMemo(() => {
    const pairs = []
    // connect each ordered point to its next-in-fibonacci sibling for a network look
    const stride = 7
    for (let i = 0; i < COUNT; i += stride) {
      const a = i, b = (i + stride) % COUNT
      pairs.push(order[a * 3], order[a * 3 + 1], order[a * 3 + 2], order[b * 3], order[b * 3 + 1], order[b * 3 + 2])
    }
    return new Float32Array(pairs)
  }, [order])

  const groupRef = useRef()
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
    }
    if (!meshRef.current) return
    const p = progress.current // 0 = chaos, 1 = ordered
    const easing = p * p * (3 - 2 * p) // smoothstep
    const time = state.clock.elapsedTime

    for (let i = 0; i < COUNT; i++) {
      const cx = chaos[i * 3], cy = chaos[i * 3 + 1], cz = chaos[i * 3 + 2]
      const ox = order[i * 3], oy = order[i * 3 + 1], oz = order[i * 3 + 2]
      // add a mild vibration that fades as things order
      const jitter = (1 - easing) * 0.06
      const jx = Math.sin(time * 2 + i) * jitter
      const jy = Math.cos(time * 2.3 + i * 0.7) * jitter
      const jz = Math.sin(time * 1.7 + i * 0.5) * jitter
      tmpObj.position.set(
        cx + (ox - cx) * easing + jx,
        cy + (oy - cy) * easing + jy,
        cz + (oz - cz) * easing + jz,
      )
      const scale = 0.018 + easing * 0.014 + Math.sin(time * 3 + i) * 0.002
      tmpObj.scale.setScalar(scale)
      tmpObj.updateMatrix()
      meshRef.current.setMatrixAt(i, tmpObj.matrix)

      // color: mostly signal green when ordered, sprinkle brass on every 11th
      const target = i % 11 === 0 ? brassColor : orderColor
      tmpColor.copy(chaosColor).lerp(target, easing)
      meshRef.current.setColorAt(i, tmpColor)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true

    if (linesRef.current) {
      linesRef.current.material.opacity = Math.pow(easing, 2) * 0.55
    }
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          vertexColors
          metalness={0.55}
          roughness={0.35}
          emissive={new THREE.Color('#4CC38A')}
          emissiveIntensity={0.35}
          toneMapped={false}
        />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#4CC38A" transparent opacity={0} toneMapped={false} />
      </lineSegments>
    </group>
  )
}

function GroundHalo() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
      <ringGeometry args={[1.4, 3.2, 128]} />
      <meshBasicMaterial color="#4CC38A" transparent opacity={0.05} />
    </mesh>
  )
}

export default function CircularityEngine({ progress }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.6, 5.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 4]} intensity={35} color="#F4F1E9" distance={20} />
      <pointLight position={[-4, -2, -3]} intensity={20} color="#4CC38A" distance={20} />
      <ParticleField progress={progress} />
      <GroundHalo />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} enableDamping />
    </Canvas>
  )
}
