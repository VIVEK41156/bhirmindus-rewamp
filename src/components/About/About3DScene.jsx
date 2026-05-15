import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';
import { ABOUT_SECTIONS } from './aboutSections';

const PANEL_SCALE = [4.2, 2.45, 1];

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

    camera.position.lerp(pos.current, 0.14);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function SectionPanel({ section, index, scrollProgress }) {
  const groupRef = useRef();
  const focus =
    ABOUT_SECTIONS.length > 1
      ? 1 - Math.min(1, Math.abs(scrollProgress * (ABOUT_SECTIONS.length - 1) - index))
      : 1;

  useFrame(() => {
    if (!groupRef.current) return;
    const scale = 0.88 + focus * 0.12;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.y = (1 - focus) * (index % 2 === 0 ? 0.18 : -0.18);
  });

  return (
    <group ref={groupRef} position={section.position}>
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[PANEL_SCALE[0] + 0.2, PANEL_SCALE[1] + 0.2]} />
        <meshBasicMaterial color="#2D2D96" transparent opacity={0.35 + focus * 0.25} />
      </mesh>
      <Image
        url={section.image}
        scale={PANEL_SCALE}
        transparent
        opacity={0.55 + focus * 0.45}
        toneMapped={false}
      />
    </group>
  );
}

function SceneContent({ scrollProgress }) {
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
      <fog attach="fog" args={['#06071A', 12, 70]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} color="#3D3DB8" />
      <directionalLight position={[-4, 2, -8]} intensity={0.35} color="#C8A96E" />

      <group ref={gridRef} position={[0, -2.2, 0]}>
        <gridHelper args={[80, 40, '#2D2D96', '#141530']} position={[0, 0, -28]} />
      </group>

      {ABOUT_SECTIONS.map((section, index) => (
        <SectionPanel
          key={section.id}
          section={section}
          index={index}
          scrollProgress={scrollProgress}
        />
      ))}

      <ScrollCamera scrollProgress={scrollProgress} />
    </>
  );
}

export default function About3DScene({ scrollProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 7.5], fov: 42, near: 0.1, far: 120 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
    >
      <Suspense fallback={null}>
        <SceneContent scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
