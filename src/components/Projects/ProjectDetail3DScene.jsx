import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PANEL_BASE = [5.4, 3.15, 1];

function lerpWaypoint(sections, progress, key) {
  if (sections.length <= 1) {
    return sections[0].camera[key];
  }
  const t = progress * (sections.length - 1);
  const i = Math.min(Math.floor(t), sections.length - 2);
  const alpha = t - i;
  const from = sections[i].camera[key];
  const to = sections[i + 1].camera[key];
  return [
    THREE.MathUtils.lerp(from[0], to[0], alpha),
    THREE.MathUtils.lerp(from[1], to[1], alpha),
    THREE.MathUtils.lerp(from[2], to[2], alpha),
  ];
}

function ScrollCamera({ sections, scrollProgress }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  const pos = useRef(new THREE.Vector3());

  useFrame(() => {
    const [px, py, pz] = lerpWaypoint(sections, scrollProgress, 'position');
    const [lx, ly, lz] = lerpWaypoint(sections, scrollProgress, 'lookAt');
    pos.current.set(px, py, pz);
    lookTarget.current.set(lx, ly, lz);
    camera.position.lerp(pos.current, 0.11);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function DepthFrame({ width, height, focus, accent }) {
  const depth = 0.14 + focus * 0.06;
  return (
    <group>
      <mesh position={[0, 0, -depth - 0.08]}>
        <boxGeometry args={[width + 0.35, height + 0.35, depth]} />
        <meshStandardMaterial
          color="#1a1a4a"
          metalness={0.65}
          roughness={0.35}
          emissive={accent || '#2D2D96'}
          emissiveIntensity={0.12 + focus * 0.35}
        />
      </mesh>
    </group>
  );
}

function SectionPanel({ section, index, sections, scrollProgress, activeIndex, heroImage, accent }) {
  const groupRef = useRef();
  const glowRef = useRef();
  const imageRef = useRef();

  const focusFromScroll =
    sections.length > 1
      ? 1 - Math.min(1, Math.abs(scrollProgress * (sections.length - 1) - index))
      : 1;
  const focusFromActive = index === activeIndex ? 1 : 0;
  const focus = Math.max(focusFromScroll, focusFromActive * 0.85);

  const w = PANEL_BASE[0];
  const h = PANEL_BASE[1];
  const imageUrl = index === 0 ? heroImage : heroImage;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scale = 0.88 + focus * 0.24;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (index % 2 === 0 ? -1 : 1) * (1 - focus) * 0.26,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(t * 0.35 + index) * 0.025 * focus,
      0.06
    );
    if (glowRef.current?.material) {
      glowRef.current.material.opacity = 0.1 + focus * 0.4;
    }
    if (imageRef.current?.material) {
      imageRef.current.material.opacity = 0.7 + focus * 0.3;
    }
  });

  return (
    <Float speed={1.1 + index * 0.12} rotationIntensity={0.06} floatIntensity={0.3 + focus * 0.35}>
      <group ref={groupRef} position={section.position}>
        <mesh ref={glowRef} position={[0, 0, -0.35]}>
          <planeGeometry args={[w + 1.5, h + 1.5]} />
          <meshBasicMaterial color={accent || '#3D3DB8'} transparent opacity={0.25} />
        </mesh>
        <DepthFrame width={w} height={h} focus={focus} accent={accent} />
        <Image
          ref={imageRef}
          url={imageUrl}
          scale={[w, h, 1]}
          transparent
          opacity={0.88}
          toneMapped={false}
        />
        <pointLight position={[0.6, 0.5, 1]} intensity={0.35 + focus * 1.5} color={accent || '#C8A96E'} distance={14} />
      </group>
    </Float>
  );
}

function SceneContent({ sections, scrollProgress, activeIndex, heroImage, accent }) {
  const gridRef = useRef();

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = THREE.MathUtils.lerp(
        gridRef.current.position.z,
        scrollProgress * -22,
        delta * 2
      );
    }
  });

  return (
    <>
      <color attach="background" args={['#06071A']} />
      <fog attach="fog" args={['#06071A', 12, 90]} />
      <ambientLight intensity={0.48} />
      <directionalLight position={[6, 10, 5]} intensity={1.2} color="#3D3DB8" />
      <directionalLight position={[-5, 3, -10]} intensity={0.4} color={accent || '#C8A96E'} />

      <Sparkles
        count={90}
        scale={[36, 16, 70]}
        position={[0, 2, -20]}
        size={1.1}
        speed={0.22}
        opacity={0.3}
        color={accent || '#3D3DB8'}
      />

      <group ref={gridRef} position={[0, -2.3, 0]}>
        <gridHelper args={[90, 45, '#2D2D96', '#141530']} position={[0, 0, -28]} />
      </group>

      {sections.map((section, index) => (
        <SectionPanel
          key={section.id}
          section={section}
          index={index}
          sections={sections}
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
          heroImage={heroImage}
          accent={accent}
        />
      ))}

      <ScrollCamera sections={sections} scrollProgress={scrollProgress} />
    </>
  );
}

export default function ProjectDetail3DScene({
  sections,
  scrollProgress,
  activeIndex = 0,
  heroImage,
  accent,
}) {
  return (
    <Canvas camera={{ position: [0, 0.2, 7.5], fov: 48, near: 0.1, far: 120 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
      <Suspense fallback={null}>
        <SceneContent
          sections={sections}
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
          heroImage={heroImage}
          accent={accent}
        />
      </Suspense>
    </Canvas>
  );
}
