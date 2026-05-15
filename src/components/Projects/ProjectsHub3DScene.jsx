import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function HubPanel({ project, index, scrollProgress }) {
  const groupRef = useRef();
  const angle = (index / 6) * Math.PI * 2;
  const radius = 5.5;
  const baseX = Math.cos(angle) * radius;
  const baseZ = Math.sin(angle) * radius - 8;
  const focus = 1 - Math.min(1, Math.abs(scrollProgress * 5 - index));

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scale = 0.75 + focus * 0.2;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.y = Math.sin(t * 0.5 + index) * 0.15 * focus;
    groupRef.current.rotation.y = angle + Math.sin(t * 0.3 + index) * 0.05;
  });

  return (
    <Float speed={1 + index * 0.1} floatIntensity={0.25 + focus * 0.3}>
      <group ref={groupRef} position={[baseX, 0.2, baseZ]} rotation={[0, -angle + Math.PI / 2, 0]}>
        <mesh position={[0, 0, -0.12]}>
          <boxGeometry args={[2.8, 1.65, 0.1]} />
          <meshStandardMaterial
            color="#1a1a4a"
            metalness={0.6}
            roughness={0.4}
            emissive={project.accent}
            emissiveIntensity={0.1 + focus * 0.25}
          />
        </mesh>
        <Image url={project.image} scale={[2.6, 1.5, 1]} transparent opacity={0.65 + focus * 0.35} toneMapped={false} />
      </group>
    </Float>
  );
}

function HubCamera({ scrollProgress }) {
  useFrame((state) => {
    const t = scrollProgress * Math.PI * 0.35;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t) * 1.2, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.35 + scrollProgress * 0.5, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 9 - scrollProgress * 2, 0.06);
    state.camera.lookAt(0, 0, -6);
  });
  return null;
}

function SceneContent({ projects, scrollProgress }) {
  const gridRef = useRef();

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <>
      <color attach="background" args={['#06071A']} />
      <fog attach="fog" args={['#06071A', 10, 55]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#3D3DB8" />
      <Sparkles count={80} scale={[30, 14, 30]} position={[0, 1, -4]} size={1} speed={0.2} opacity={0.28} color="#3D3DB8" />
      <group ref={gridRef} position={[0, -2, -6]}>
        <gridHelper args={[40, 24, '#2D2D96', '#141530']} />
      </group>
      {projects.map((project, index) => (
        <HubPanel key={project.id} project={project} index={index} scrollProgress={scrollProgress} />
      ))}
      <HubCamera scrollProgress={scrollProgress} />
    </>
  );
}

export default function ProjectsHub3DScene({ projects, scrollProgress }) {
  return (
    <Canvas camera={{ position: [0, 0.35, 9], fov: 50, near: 0.1, far: 80 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
      <Suspense fallback={null}>
        <SceneContent projects={projects} scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
