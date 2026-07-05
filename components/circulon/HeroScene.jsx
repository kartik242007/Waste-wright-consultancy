'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Blob() {
  const meshRef = useRef()
  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.08
    meshRef.current.rotation.x += delta * 0.02
    const { x, y } = state.pointer
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.35, 0.03)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.25, 0.03)
  })
  return (
    <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.75}>
        <icosahedronGeometry args={[1.35, 64]} />
        <MeshDistortMaterial
          color="#2A3138"
          emissive="#4CC38A"
          emissiveIntensity={0.22}
          roughness={0.28}
          metalness={0.75}
          distort={0.42}
          speed={1.2}
        />
      </mesh>
    </Float>
  )
}

function Rings() {
  const g = useRef()
  useFrame((_, d) => { if (g.current) g.current.rotation.z += d * 0.05 })
  return (
    <group ref={g} position={[0, 0, -0.5]}>
      {[1.9, 2.35, 2.85].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.3]}>
          <torusGeometry args={[r, 0.004, 16, 220]} />
          <meshBasicMaterial color={i === 1 ? '#C9A227' : '#4CC38A'} transparent opacity={0.22} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#F4F1E9" />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#4CC38A" />
      <Blob />
      <Rings />
      <Environment preset="studio" />
    </Canvas>
  )
}
