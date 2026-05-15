import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PANEL = [4.8, 2.85, 1];

function getWaypoints(projects) {
  return projects.map((p, i) => ({
    position: [i % 2 === 0 ? 3 : -3, 0.1 + (i % 3) * 0.08, -i * 16],
    camera: {
      position: [i % 2 === 0 ? 0.3 : -0.3, 0.25 + (i % 2) * 0.1, 6.5 - i * 0.2],
      lookAt: [i % 2 === 0 ? 3 : -3, 0.1, -i * 16],
    },
    accent: p.accent,
    image: p.image,
    id: p.id,
  }));
}

function lerpWaypoints(waypoints, progress, key) {
  if (waypoints.length <= 1) return waypoints[0].camera[key];
  const t = progress * (waypoints.length - 1);
  const i = Math.min(Math.floor(t), waypoints.length - 2);
  const a = t - i;
  const from = waypoints[i].camera[key];
  const to = waypoints[i + 1].camera[key];
  return [
    THREE.MathUtils.lerp(from[0], to[0], a),
    THREE.MathUtils.lerp(from[1], to[1], a),
    THREE.MathUtils.lerp(from[2], to[2], a),
  ];
}

function FlowCamera({ waypoints, scrollProgress }) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());

  useFrame(() => {
    const [px, py, pz] = lerpWaypoints(waypoints, scrollProgress, 'position');
    const [lx, ly, lz] = lerpWaypoints(waypoints, scrollProgress, 'lookAt');
    pos.current.set(px, py, pz);
    look.current.set(lx, ly, lz);
    camera.position.lerp(pos.current, 0.09);
    camera.lookAt(look.current);
  });

  return null;
}

function FlowPanel({ wp, index, scrollProgress, activeIndex, total }) {
  const groupRef = useRef();
  const imgRef = useRef();
  const n = Math.max(1, total - 1);
  const focusScroll = 1 - Math.min(1, Math.abs(scrollProgress * n - index));
  const focusActive = index === activeIndex ? 1 : 0;
  const focus = Math.max(focusScroll, focusActive * 0.9);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const s = 0.75 + focus * 0.28;
    groupRef.current.scale.setScalar(s);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (index % 2 === 0 ? -1 : 1) * (1 - focus) * 0.35,
      0.08
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      wp.position[2] + focus * 2.5,
      0.06
    );
    if (imgRef.current?.material) {
      imgRef.current.material.opacity = 0.5 + focus * 0.5;
    }
  });

  return (
    <Float speed={1.2} floatIntensity={0.2 + focus * 0.35}>
      <group ref={groupRef} position={wp.position}>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[PANEL[0] + 0.15, PANEL[1] + 0.15, 0.08]} />
          <meshStandardMaterial
            color="#12143a"
            metalness={0.75}
            roughness={0.28}
            emissive={wp.accent}
            emissiveIntensity={0.1 + focus * 0.4}
          />
        </mesh>
        <Image ref={imgRef} url={wp.image} scale={PANEL} transparent opacity={0.9} toneMapped={false} />
        <pointLight position={[0.5, 0.5, 1]} intensity={0.3 + focus * 2} color={wp.accent} distance={12} />
      </group>
    </Float>
  );
}

function EnergyCore({ scrollProgress }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    ref.current.scale.setScalar(0.8 + scrollProgress * 0.4);
  });
  return (
    <mesh ref={ref} position={[0, 0, 2]}>
      <torusGeometry args={[0.35, 0.06, 16, 48]} />
      <meshStandardMaterial color="#3D3DB8" emissive="#3D3DB8" emissiveIntensity={0.6} metalness={0.9} />
    </mesh>
  );
}

function Scene({ projects, scrollProgress, activeIndex }) {
  const waypoints = useMemo(() => getWaypoints(projects), [projects]);
  const gridRef = useRef();
  const lineRef = useRef();

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = THREE.MathUtils.lerp(
        gridRef.current.position.z,
        scrollProgress * -20,
        delta * 1.6
      );
    }
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.15 + scrollProgress * 0.45;
    }
  });

  const linePoints = useMemo(() => {
    const pts = [new THREE.Vector3(0, 0, 4)];
    waypoints.forEach((w) => pts.push(new THREE.Vector3(...w.position)));
    return pts;
  }, [waypoints]);

  const lineGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(linePoints);
    return new THREE.TubeGeometry(curve, 64, 0.06, 8, false);
  }, [linePoints]);

  return (
    <>
      <color attach="background" args={['#050614']} />
      <fog attach="fog" args={['#050614', 8, 75]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 12, 6]} intensity={1.2} color="#3D3DB8" />
      <directionalLight position={[-6, 4, -8]} intensity={0.35} color="#C8A96E" />

      <Sparkles count={160} scale={[28, 50, 90]} position={[0, 0, -30]} size={1.4} speed={0.22} opacity={0.35} />

      <mesh ref={lineRef} geometry={lineGeo}>
        <meshBasicMaterial color="#C8A96E" transparent opacity={0.3} />
      </mesh>

      <group ref={gridRef} position={[0, -2.5, 0]}>
        <gridHelper args={[80, 40, '#2D2D96', '#0c0d24']} position={[0, 0, -20]} />
      </group>

      <EnergyCore scrollProgress={scrollProgress} />

      {waypoints.map((wp, i) => (
        <FlowPanel
          key={wp.id}
          wp={wp}
          index={i}
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
          total={waypoints.length}
        />
      ))}

      <FlowCamera waypoints={waypoints} scrollProgress={scrollProgress} />
    </>
  );
}

export default function ProjectsFlow3DScene({ projects, scrollProgress, activeIndex }) {
  return (
    <Canvas camera={{ position: [0, 0.25, 7], fov: 50, near: 0.1, far: 100 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
      <Suspense fallback={null}>
        <Scene projects={projects} scrollProgress={scrollProgress} activeIndex={activeIndex} />
      </Suspense>
    </Canvas>
  );
}
