import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useEffect, useMemo, useRef } from "react"
import type { Group, Points } from "three"
import * as THREE from "three"
import { useIsMobile } from "../hooks/useIsMobile"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { useTabVisible } from "../hooks/useTabVisible"

function hash01(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function StarField({ count, size, radius }: { count: number; size: number; radius: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius * (0.55 + hash01(i + 1) * 0.45)
      const theta = hash01(i + 3) * Math.PI * 2
      const phi = Math.acos(2 * hash01(i + 7) - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const t = hash01(i + 13)
      if (t < 0.72) {
        colors[i * 3] = 0.78 + hash01(i + 17) * 0.2
        colors[i * 3 + 1] = 0.84 + hash01(i + 19) * 0.12
        colors[i * 3 + 2] = 1
      } else if (t < 0.9) {
        colors[i * 3] = 0.62
        colors[i * 3 + 1] = 0.74
        colors[i * 3 + 2] = 1
      } else {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0.9
        colors[i * 3 + 2] = 0.76
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [count, radius])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function MilkyWay({ count }: { count: number }) {
  const ref = useRef<Points>(null)
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const spread = Math.pow(hash01(i + 2), 1.35)
      const x = (hash01(i + 4) - 0.5) * 92
      const y = (hash01(i + 8) - 0.5) * (2.2 + spread * 9)
      const z = (hash01(i + 12) - 0.5) * (10 + spread * 14)
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const dust = hash01(i + 21)
      if (dust < 0.45) {
        colors[i * 3] = 0.55
        colors[i * 3 + 1] = 0.62
        colors[i * 3 + 2] = 0.95
      } else if (dust < 0.75) {
        colors[i * 3] = 0.86
        colors[i * 3 + 1] = 0.78
        colors[i * 3 + 2] = 1
      } else {
        colors[i * 3] = 0.95
        colors[i * 3 + 1] = 0.72
        colors[i * 3 + 2] = 0.55
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.018) * 0.02
  })

  return (
    <points ref={ref} geometry={geometry} rotation={[0.42, 0.18, -0.55]}>
      <pointsMaterial
        size={0.085}
        vertexColors
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Nebula({
  position,
  color,
  scale,
}: {
  position: [number, number, number]
  color: string
  scale: number
}) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.045}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function Planet({
  position,
  radius,
  color,
  atmosphere,
  ring,
  speed,
}: {
  position: [number, number, number]
  radius: number
  color: string
  atmosphere: string
  ring?: boolean
  speed: number
}) {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * speed
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.82}
          metalness={0.08}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.12, 24, 24]} />
        <meshBasicMaterial
          color={atmosphere}
          transparent
          opacity={0.1}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {ring && (
        <mesh rotation={[Math.PI / 2.6, 0.2, 0.15]}>
          <ringGeometry args={[radius * 1.35, radius * 1.85, 64]} />
          <meshBasicMaterial
            color="#c9b8a0"
            transparent
            opacity={0.28}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}

function SpaceRig({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const group = useRef<Group>(null)
  const scrollY = useRef(0)
  const smooth = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()
    const target = reduced ? 0 : scrollY.current
    smooth.current += (target - smooth.current) * 0.045
    const s = smooth.current

    if (group.current) {
      const spin = reduced ? 0 : t * 0.008
      group.current.rotation.y = spin + s * 0.00014
      group.current.rotation.x = (reduced ? 0 : Math.sin(t * 0.04) * 0.025) + s * 0.00009
      group.current.position.y = -s * 0.0018
      group.current.position.x = reduced ? 0 : Math.sin(t * 0.03) * 0.12
    }

    camera.position.set(0, 0.15 + s * 0.0006, mobile ? 16 : 15)
    camera.lookAt(0, -s * 0.0004, 0)
  })

  return (
    <group ref={group}>
      <StarField count={mobile ? 900 : 2200} size={mobile ? 0.07 : 0.055} radius={90} />
      <StarField count={mobile ? 180 : 420} size={mobile ? 0.16 : 0.13} radius={70} />
      {!mobile && <MilkyWay count={1600} />}
      {mobile && <MilkyWay count={700} />}
      <Nebula position={[-18, 4, -22]} color="#3d4d8c" scale={22} />
      <Nebula position={[16, -6, -18]} color="#5a3d6e" scale={18} />
      <Nebula position={[2, 8, -28]} color="#2b4a62" scale={26} />
      <Planet
        position={[-7.2, 1.6, -6]}
        radius={0.85}
        color="#6f7d93"
        atmosphere="#8ea7c8"
        speed={0.04}
      />
      <Planet
        position={[6.4, -1.4, -8]}
        radius={1.15}
        color="#8a6a58"
        atmosphere="#c4a48a"
        ring
        speed={0.025}
      />
      {!mobile && (
        <Planet
          position={[1.8, 3.4, -14]}
          radius={0.42}
          color="#4d6a7a"
          atmosphere="#7aa0b4"
          speed={0.06}
        />
      )}
    </group>
  )
}

function Scene({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  return (
    <>
      <color attach="background" args={["#050814"]} />
      <fog attach="fog" args={["#050814", 18, 70]} />
      <ambientLight intensity={0.22} />
      <pointLight position={[-12, 8, 10]} intensity={12} color="#7ea4d6" distance={40} />
      <pointLight position={[10, -6, 6]} intensity={8} color="#8b6a9a" distance={36} />
      <directionalLight position={[4, 6, 8]} intensity={0.35} color="#c9d6ea" />
      <SpaceRig mobile={mobile} reduced={reduced} />
    </>
  )
}

function CssFallback() {
  return (
    <div className="absolute inset-0 bg-[#050814]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(70,90,140,0.18),transparent_55%)]" />
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(1px_1px_at_10%_20%,rgba(255,255,255,0.5)_50%,transparent_51%),radial-gradient(1px_1px_at_30%_70%,rgba(200,220,255,0.45)_50%,transparent_51%),radial-gradient(1px_1px_at_70%_30%,rgba(255,255,255,0.4)_50%,transparent_51%),radial-gradient(1px_1px_at_85%_80%,rgba(180,200,255,0.35)_50%,transparent_51%),radial-gradient(1.5px_1.5px_at_55%_40%,rgba(255,240,210,0.4)_50%,transparent_51%)]" />
    </div>
  )
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}

export function SpaceBackground() {
  const mobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const visible = useTabVisible()
  const webgl = typeof window === "undefined" ? true : hasWebGL()

  if (!webgl) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <CssFallback />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={mobile ? [1, 1.15] : [1, 1.5]}
        camera={{ position: [0, 0.15, 15], fov: 48, near: 0.1, far: 200 }}
        gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance" }}
        frameloop={!visible ? "demand" : "always"}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <Scene mobile={mobile} reduced={reduced} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(5,8,20,0.55)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/25 via-transparent to-[#050814]/75" />
    </div>
  )
}
