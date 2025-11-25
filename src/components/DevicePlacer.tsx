import { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls, ContactShadows, useGLTF, useCursor } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'

// Reactive state model, using Valtio ...
const modes = ['translate', 'rotate', 'scale'] as const

type State = {
  current: string | null
  mode: number
}

const state = proxy<State>({ current: null, mode: 0 })

interface ModelProps {
  name: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

function Model({ name, ...props }: ModelProps) {
  // Ties this component to the state model
  const snap = useSnapshot(state)
  // Fetching the GLTF, nodes is a collection of all the meshes
  // It's cached/memoized, it only gets loaded and parsed once
  const { nodes } = useGLTF('./models/devices/LightBulb.gltf') as any
  // Feed hover state into useCursor, which sets document.body.style.cursor to pointer|auto
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  return (
    <mesh
      // Click sets the mesh as the new target
      onClick={(e) => (e.stopPropagation(), (state.current = name))}
      // If a click happened but this mesh wasn't hit we null out the target,
      // This works because missed pointers fire before the actual hits
      onPointerMissed={(e) => e.type === 'click' && (state.current = null)}
      // Right click cycles through the transform modes
      onContextMenu={(e) => snap.current === name && (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
      name={name}
      geometry={nodes[name].geometry}
      {...props}
      dispose={null}
    >
      <meshStandardMaterial
        color={snap.current === name ? '#ff6080' : '#ffffff'}
        metalness={0.2}
        roughness={0.4}
        emissive={snap.current === name ? '#ff6080' : '#000000'}
        emissiveIntensity={snap.current === name ? 0.3 : 0}
      />
    </mesh>
  )
}

function Controls() {
  // Get notified on changes to state
  const snap = useSnapshot(state)
  const scene = useThree((state) => state.scene)
  return (
    <>
      {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
      {snap.current && <TransformControls object={scene.getObjectByName(snap.current)!} mode={modes[snap.mode] as any} />}
      {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </>
  )
}

function DevicePlacer() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <hemisphereLight color="#ffffff" groundColor="#b9b9b9" position={[-7, 25, 13]} intensity={0.85} />
      <Suspense fallback={null}>
          <Model name="LightBulb" position={[0, 0, 0]} rotation={[0, 0, 0]} />
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -2, 0]} opacity={0.25} width={10} height={10} blur={1} far={5} />
      </Suspense>
      <Controls />
    </Canvas>
  )
}

export default DevicePlacer;
