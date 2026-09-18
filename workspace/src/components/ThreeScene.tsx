import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { Suspense, useMemo, useRef } from "react"
import type { Group, Points } from "three"
import * as THREE from "three"
import { useIsMobile } from "../hooks/useIsMobile"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { useTabVisible } from "../hooks/useTabVisible"

const NODE_DEFS = [
  { label: "User", pos: [0, 1.85, 0] as const, color: "#e8edf5" },
  { label: "React", pos: [-1.35, 0.95, 0.2] as const, color: "#64d2ff" },
  { label: "API", pos: [1.25, 0.85, -0.15] as const, color: "#7c8cff" },
  { label: "Docker", pos: [-0.85, -0.05, 0.35] as const, color: "#64d2ff" },
  { label: "K8s", pos: [0.95, -0.15, 0.1] as const, color: "#7c8cff" },
  { label: "AWS", pos: [0, -1.25, 0] as const, color: "#5eead4" },
]

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [1, 2],
  [3, 4],
]

function hash01(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<Points>(null)
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (hash01(i + 1) - 0.5) * 8
      positions[i * 3 + 1] = (hash01(i + 19) - 0.5) * 6
      positions[i * 3 + 2] = (hash01(i + 37) - 0.5) * 4
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geo
  }, [count])

  const speeds = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) s[i] = 0.15 + hash01(i + 91) * 0.35
    return s
  }, [count])

  useFrame(({ clock }) => {
    if (reduced || !ref.current) return
    const attr = ref.current.geometry.attributes.position
    const arr = attr.array as Float32Array
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      arr[i3 + 1] += Math.sin(t * speeds[i] + i) * 0.0014
      arr[i3] += Math.cos(t * speeds[i] * 0.6 + i) * 0.0007
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.018}
        color="#64d2ff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function DataPackets({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null)
  const paths = useMemo(
    () =>
      EDGES.map(([a, b], i) => ({
        from: new THREE.Vector3(...NODE_DEFS[a].pos),
        to: new THREE.Vector3(...NODE_DEFS[b].pos),
        offset: hash01(i + 4),
      })),
    [],
  )

  useFrame(({ clock }) => {
    if (reduced || !group.current) return
    const t = clock.getElapsedTime()
    paths.forEach((path, i) => {
      const mesh = group.current?.children[i]
      if (!mesh) return
      const p = (t * 0.18 + path.offset) % 1
      mesh.position.lerpVectors(path.from, path.to, p)
    })
  })

  return (
    <group ref={group}>
      {paths.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#64d2ff" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function NodeMesh({
  position,
  color,
  reduced,
}: {
  position: readonly [number, number, number]
  color: string
  reduced: boolean
}) {
  const inner = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (reduced || !inner.current) return
    const s = 1 + Math.sin(clock.getElapsedTime() * 1.4) * 0.06
    inner.current.scale.setScalar(s)
  })

  return (
    <group position={position}>
      <mesh>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
      <mesh ref={inner}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function ConnectionLines() {
  const geometry = useMemo(() => {
    const positions: number[] = []
    EDGES.forEach(([a, b]) => {
      positions.push(...NODE_DEFS[a].pos, ...NODE_DEFS[b].pos)
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    )
    return geo
  }, [])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#64d2ff" transparent opacity={0.32} />
    </lineSegments>
  )
}

function InfraRig({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const group = useRef<Group>(null)
  const target = useRef({ x: 0, y: 0 })

  useFrame(({ pointer, clock }) => {
    if (!group.current) return
    if (reduced) {
      group.current.rotation.y = 0.18
      return
    }
    target.current.x = pointer.y * 0.18
    target.current.y = pointer.x * 0.35
    group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.04
    group.current.rotation.y += (0.15 + target.current.y - group.current.rotation.y) * 0.04
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.06
  })

  return (
    <group ref={group} scale={mobile ? 0.82 : 1}>
      <ConnectionLines />
      {NODE_DEFS.map((node) => (
        <Float
          key={node.label}
          speed={reduced ? 0 : 1.1}
          rotationIntensity={reduced ? 0 : 0.25}
          floatIntensity={reduced ? 0 : 0.35}
        >
          <NodeMesh position={node.pos} color={node.color} reduced={reduced} />
        </Float>
      ))}
      {!reduced && <DataPackets reduced={reduced} />}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
        <ringGeometry args={[1.55, 1.58, 64]} />
        <meshBasicMaterial color="#7c8cff" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[2.05, 0.008, 8, 80]} />
        <meshBasicMaterial color="#64d2ff" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

function SceneContents({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#050814", 8, 16]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 3, 4]} intensity={18} color="#64d2ff" distance={12} />
      <pointLight position={[-3, -2, 2]} intensity={10} color="#7c8cff" distance={10} />
      <InfraRig mobile={mobile} reduced={reduced} />
      <Particles count={mobile ? 280 : 900} reduced={reduced} />
    </>
  )
}

function FallbackGrid() {
  return (
    <div className="absolute inset-0 grid-bg opacity-70">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,210,255,0.12),transparent_62%)]" />
    </div>
  )
}

export function ThreeScene() {
  const mobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const visible = useTabVisible()
  const webgl = typeof window === "undefined" ? true : hasWebGL()

  if (!webgl) return <FallbackGrid />

  return (
    <div className="relative h-full min-h-[280px] w-full">
      <Canvas
        dpr={mobile ? [1, 1.25] : [1, 1.6]}
        camera={{ position: [0, 0.2, 5.4], fov: 42 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        frameloop={!visible || reduced ? "demand" : "always"}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <SceneContents mobile={mobile} reduced={reduced} />
        </Suspense>
      </Canvas>
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
