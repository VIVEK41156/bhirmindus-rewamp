import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PANEL = [5.6, 3.25, 1];

function lerpCamera(sections, progress, key) {
  if (!sections?.length) return [0, 0.2, 7];
  if (sections.length === 1) return sections[0].camera[key];
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

function ScrollCamera({ sections, scrollProgress }) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());

  useFrame(() => {
    const [px, py, pz] = lerpCamera(sections, scrollProgress, 'position');
    const [lx, ly, lz] = lerpCamera(sections, scrollProgress, 'lookAt');
    pos.current.set(px, py, pz);
    look.current.set(lx, ly, lz);
    camera.position.lerp(pos.current, 0.11);
    camera.lookAt(look.current);
  });

  return null;
}

function Panel({ section, index, sections, scrollProgress, activeIndex, heroImage, accent }) {
  const groupRef = useRef();
  const imgRef = useRef();
  const n = sections.length - 1;
  const focus = Math.max(
    n > 0 ? 1 - Math.min(1, Math.abs(scrollProgress * n - index)) : 1,
    index === activeIndex ? 1 : 0
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const s = 0.9 + focus * 0.16;
    groupRef.current.scale.setScalar(s);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (index % 2 === 0 ? -1 : 1) * (1 - focus) * 0.18,
      0.07
    );
    if (imgRef.current?.material) {
      imgRef.current.material.opacity = 0.78 + focus * 0.22;
    }
  });

  return (
    <Float speed={1.1} floatIntensity={0.25 + focus * 0.3}>
      <group ref={groupRef} position={section.position}>
        <mesh position={[0, 0, -0.12]}>
          <boxGeometry args={[PANEL[0] + 0.2, PANEL[1] + 0.2, 0.1]} />
          <meshStandardMaterial color="#14163c" metalness={0.65} roughness={0.35} emissive={accent} emissiveIntensity={0.1 + focus * 0.25} />
        </mesh>
        <Image ref={imgRef} url={heroImage} scale={PANEL} transparent opacity={0.95} toneMapped={false} />
        <pointLight position={[0.5, 0.5, 1.2]} intensity={0.4 + focus * 1.5} color={accent} distance={14} />
      </group>
    </Float>
  );
}

function Scene({ sections, scrollProgress, activeIndex, heroImage, accent }) {
  return (
    <>
      <color attach="background" args={['#050614']} />
      <fog attach="fog" args={['#050614', 14, 88]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 5]} intensity={1.1} color="#3D3DB8" />
      <Sparkles count={80} scale={[40, 16, 70]} position={[0, 2, -24]} size={1} speed={0.18} opacity={0.28} color={accent} />
      <gridHelper args={[80, 40, '#2D2D96', '#0e0f28']} position={[0, -2.4, -28]} />
      {sections.map((sec, i) => (
        <Panel
          key={sec.id}
          section={sec}
          index={i}
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

export default function ProjectDetail3DScene({ sections, scrollProgress, activeIndex, heroImage, accent }) {
  return (
    <Canvas camera={{ position: [0, 0.2, 7], fov: 44, near: 0.1, far: 120 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
      <Suspense fallback={null}>
        <Scene
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
