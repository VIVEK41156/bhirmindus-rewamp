import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { ABOUT_SECTIONS } from './aboutSections';

const PANEL_BASE = [5.2, 3.05, 1];

function lerpWaypoint(progress, key) {
  const t = progress * (ABOUT_SECTIONS.length - 1);
  const i = Math.min(Math.floor(t), ABOUT_SECTIONS.length - 2);
  const alpha = t - i;
  const from = ABOUT_SECTIONS[i].camera[key];
  const to = ABOUT_SECTIONS[i + 1].camera[key];
  return [
    THREE.MathUtils.lerp(from[0], to[0], alpha),
    THREE.MathUtils.lerp(from[1], to[1], alpha),
    THREE.MathUtils.lerp(from[2], to[2], alpha),
  ];
}

function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  const pos = useRef(new THREE.Vector3());

  useFrame(() => {
    const [px, py, pz] = lerpWaypoint(scrollProgress, 'position');
    const [lx, ly, lz] = lerpWaypoint(scrollProgress, 'lookAt');

    pos.current.set(px, py, pz);
    lookTarget.current.set(lx, ly, lz);

    camera.position.lerp(pos.current, 0.12);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function DepthFrame({ width, height, focus }) {
  const depth = 0.14 + focus * 0.06;
  return (
    <group>
      <mesh position={[0, 0, -depth - 0.08]}>
        <boxGeometry args={[width + 0.35, height + 0.35, depth]} />
        <meshStandardMaterial
          color="#1a1a4a"
          metalness={0.65}
          roughness={0.35}
          emissive="#2D2D96"
          emissiveIntensity={0.15 + focus * 0.35}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[width + 0.12, height + 0.12]} />
        <meshBasicMaterial color="#C8A96E" transparent opacity={0.12 + focus * 0.28} />
      </mesh>
    </group>
  );
}

function SectionPanel({ section, index, scrollProgress, activeIndex }) {
  const groupRef = useRef();
  const glowRef = useRef();
  const imageRef = useRef();
  const focusRef = useRef(0);

  const focusFromScroll =
    ABOUT_SECTIONS.length > 1
      ? 1 - Math.min(1, Math.abs(scrollProgress * (ABOUT_SECTIONS.length - 1) - index))
      : 1;
  const focusFromActive = index === activeIndex ? 1 : 0;
  const focus = Math.max(focusFromScroll, focusFromActive * 0.85);
  focusRef.current = focus;

  const w = PANEL_BASE[0];
  const h = PANEL_BASE[1];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scale = 0.9 + focus * 0.22;
    groupRef.current.scale.setScalar(scale);

    const faceCamera = focus * 0.22;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (index % 2 === 0 ? -1 : 1) * (1 - focus) * 0.28 + faceCamera * 0.08,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(t * 0.4 + index) * 0.02 * focus,
      0.06
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      section.position[2] + focus * 1.8,
      0.06
    );

    if (glowRef.current) {
      glowRef.current.material.opacity = 0.08 + focus * 0.35;
    }
    if (imageRef.current?.material) {
      imageRef.current.material.opacity = 0.72 + focus * 0.28;
    }
  });

  return (
    <Float speed={1.2 + index * 0.15} rotationIntensity={0.08} floatIntensity={0.35 + focus * 0.4}>
      <group ref={groupRef} position={section.position}>
        <mesh ref={glowRef} position={[0, 0, -0.35]}>
          <planeGeometry args={[w + 1.4, h + 1.4]} />
          <meshBasicMaterial color="#3D3DB8" transparent opacity={0.2} />
        </mesh>

        <DepthFrame width={w} height={h} focus={focus} />

        <Image
          ref={imageRef}
          url={section.image}
          scale={[w, h, 1]}
          transparent
          opacity={0.85}
          toneMapped={false}
        />

        <pointLight
          position={[0.8, 0.6, 1.2]}
          intensity={0.4 + focus * 1.4}
          color="#C8A96E"
          distance={12}
        />
      </group>
    </Float>
  );
}

function AmbientParticles() {
  return (
    <Sparkles
      count={120}
      scale={[40, 18, 80]}
      position={[0, 2, -28]}
      size={1.2}
      speed={0.25}
      opacity={0.35}
      color="#3D3DB8"
    />
  );
}

function SceneContent({ scrollProgress, activeIndex }) {
  const gridRef = useRef();

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = THREE.MathUtils.lerp(
        gridRef.current.position.z,
        scrollProgress * -18,
        delta * 2
      );
    }
  });

  return (
    <>
      <color attach="background" args={['#06071A']} />
      <fog attach="fog" args={['#06071A', 14, 85]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 5]} intensity={1.25} color="#3D3DB8" />
      <directionalLight position={[-5, 3, -10]} intensity={0.45} color="#C8A96E" />
      <hemisphereLight args={['#3D3DB8', '#06071A', 0.35]} />

      <AmbientParticles />

      <group ref={gridRef} position={[0, -2.4, 0]}>
        <gridHelper args={[90, 45, '#2D2D96', '#141530']} position={[0, 0, -28]} />
      </group>

      {ABOUT_SECTIONS.map((section, index) => (
        <SectionPanel
          key={section.id}
          section={section}
          index={index}
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
        />
      ))}

      <ScrollCamera scrollProgress={scrollProgress} />
    </>
  );
}

export default function About3DScene({ scrollProgress, activeIndex = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 7.5], fov: 48, near: 0.1, far: 120 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
    >
      <Suspense fallback={null}>
        <SceneContent scrollProgress={scrollProgress} activeIndex={activeIndex} />
      </Suspense>
    </Canvas>
  );
}
