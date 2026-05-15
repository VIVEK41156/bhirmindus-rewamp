import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS_SCROLL } from './projectsScrollData';

const PANEL = [6.2, 3.6, 1];

function lerpCamera(progress, key) {
  const sections = PROJECTS_SCROLL;
  if (sections.length <= 1) return sections[0].camera[key];
  const t = progress * (sections.length - 1);
  const i = Math.min(Math.floor(t), sections.length - 2);
  const a = t - i;
  const from = sections[i].camera[key];
  const to = sections[i + 1].camera[key];
  return [
    THREE.MathUtils.lerp(from[0], to[0], a),
    THREE.MathUtils.lerp(from[1], to[1], a),
    THREE.MathUtils.lerp(from[2], to[2], a),
  ];
}

function CinematicCamera({ scrollProgress }) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());

  useFrame(() => {
    const [px, py, pz] = lerpCamera(scrollProgress, 'position');
    const [lx, ly, lz] = lerpCamera(scrollProgress, 'lookAt');
    pos.current.set(px, py, pz);
    look.current.set(lx, ly, lz);
    camera.position.lerp(pos.current, 0.1);
    camera.lookAt(look.current);
  });

  return null;
}

function ProjectPanel({ project, index, scrollProgress, activeIndex }) {
  const groupRef = useRef();
  const glowRef = useRef();
  const imgRef = useRef();
  const n = PROJECTS_SCROLL.length - 1;
  const focusScroll = n > 0 ? 1 - Math.min(1, Math.abs(scrollProgress * n - index)) : 1;
  const focus = Math.max(focusScroll, index === activeIndex ? 1 : 0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const s = 0.86 + focus * 0.2;
    groupRef.current.scale.setScalar(s);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (project.align === 'left' ? -1 : 1) * (1 - focus) * 0.2,
      0.07
    );
    groupRef.current.rotation.z = Math.sin(t * 0.25 + index) * 0.008 * focus;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      project.position[2] + focus * 2.2,
      0.05
    );
    if (glowRef.current?.material) glowRef.current.material.opacity = 0.12 + focus * 0.45;
    if (imgRef.current?.material) imgRef.current.material.opacity = 0.65 + focus * 0.35;
  });

  return (
    <Float speed={1.15 + index * 0.08} floatIntensity={0.28 + focus * 0.35}>
      <group ref={groupRef} position={project.position}>
        <mesh ref={glowRef} position={[0, 0, -0.4]}>
          <planeGeometry args={[PANEL[0] + 2, PANEL[1] + 2]} />
          <meshBasicMaterial color={project.accent} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.14]}>
          <boxGeometry args={[PANEL[0] + 0.28, PANEL[1] + 0.28, 0.12]} />
          <meshStandardMaterial
            color="#12143a"
            metalness={0.7}
            roughness={0.3}
            emissive={project.accent}
            emissiveIntensity={0.08 + focus * 0.3}
          />
        </mesh>
        <Image
          ref={imgRef}
          url={project.image}
          scale={PANEL}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
        <pointLight
          position={[1, 0.8, 1.5]}
          intensity={0.5 + focus * 1.8}
          color={project.accent}
          distance={16}
        />
      </group>
    </Float>
  );
}

function Scene({ scrollProgress, activeIndex }) {
  const gridRef = useRef();

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = THREE.MathUtils.lerp(
        gridRef.current.position.z,
        scrollProgress * -24,
        delta * 1.8
      );
    }
  });

  return (
    <>
      <color attach="background" args={['#050614']} />
      <fog attach="fog" args={['#050614', 10, 95]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[8, 12, 6]} intensity={1.15} color="#3D3DB8" />
      <directionalLight position={[-6, 4, -12]} intensity={0.38} color="#C8A96E" />
      <Sparkles count={140} scale={[50, 20, 90]} position={[0, 3, -40]} size={1.3} speed={0.2} opacity={0.32} />
      <group ref={gridRef} position={[0, -2.5, 0]}>
        <gridHelper args={[100, 50, '#2D2D96', '#0e0f28']} position={[0, 0, -32]} />
      </group>
      {PROJECTS_SCROLL.map((p, i) => (
        <ProjectPanel
          key={p.id}
          project={p}
          index={i}
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
        />
      ))}
      <CinematicCamera scrollProgress={scrollProgress} />
    </>
  );
}

export default function Projects3DScene({ scrollProgress, activeIndex }) {
  return (
    <Canvas camera={{ position: [0, 0.2, 7.2], fov: 46, near: 0.1, far: 140 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} activeIndex={activeIndex} />
      </Suspense>
    </Canvas>
  );
}
