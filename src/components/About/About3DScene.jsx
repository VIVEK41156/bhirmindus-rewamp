import { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sphere, Box, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// A premium abstract particle field to replace the generic HDRI reflections
function ParticleField() {
  const ref = useRef();
  const count = 2000;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <PointMaterial transparent color="#4a90e2" size={0.05} sizeAttenuation={true} depthWrite={false} />
    </points>
  );
}

function SceneObjects({ scrollProgress }) {
  const groupRef = useRef();
  
  // Create refs for our abstract geometric representations
  const globalRef = useRef();
  const capacityRef = useRef();
  const supplyRef = useRef();
  const logisticsRef = useRef();
  const qualityRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Very slow ambient rotation for the whole group
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Global Presence
      gsap.to(globalRef.current.scale, {
        x: scrollProgress < 0.25 ? 1 : 0.001,
        y: scrollProgress < 0.25 ? 1 : 0.001,
        z: scrollProgress < 0.25 ? 1 : 0.001,
        duration: 0.8,
        ease: 'power2.out'
      });

      // 2. Massive Capacity (Abstract Core)
      gsap.to(capacityRef.current.scale, {
        x: scrollProgress >= 0.2 && scrollProgress < 0.45 ? 1 : 0.001,
        y: scrollProgress >= 0.2 && scrollProgress < 0.45 ? 1 : 0.001,
        z: scrollProgress >= 0.2 && scrollProgress < 0.45 ? 1 : 0.001,
        duration: 0.8,
        ease: 'power2.out'
      });

      // 3. Supply Staples (Organic Array)
      gsap.to(supplyRef.current.scale, {
        x: scrollProgress >= 0.4 && scrollProgress < 0.65 ? 1 : 0.001,
        y: scrollProgress >= 0.4 && scrollProgress < 0.65 ? 1 : 0.001,
        z: scrollProgress >= 0.4 && scrollProgress < 0.65 ? 1 : 0.001,
        duration: 0.8,
        ease: 'power2.out'
      });

      // 4. Logistics (Tech Rings)
      gsap.to(logisticsRef.current.scale, {
        x: scrollProgress >= 0.6 && scrollProgress < 0.85 ? 1 : 0.001,
        y: scrollProgress >= 0.6 && scrollProgress < 0.85 ? 1 : 0.001,
        z: scrollProgress >= 0.6 && scrollProgress < 0.85 ? 1 : 0.001,
        duration: 0.8,
        ease: 'power2.out'
      });

      // 5. Quality (Golden Diamond)
      gsap.to(qualityRef.current.scale, {
        x: scrollProgress >= 0.8 ? 1 : 0.001,
        y: scrollProgress >= 0.8 ? 1 : 0.001,
        z: scrollProgress >= 0.8 ? 1 : 0.001,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Camera parallax
      gsap.to(groupRef.current.position, {
        z: Math.sin(scrollProgress * Math.PI) * 1.5,
        y: -scrollProgress * 2,
        duration: 0.5
      });
    });

    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <group ref={groupRef}>
      {/* 1. Global Presence: Wireframe Globe */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={globalRef} scale={1}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#4a90e2" wireframe transparent opacity={0.3} />
          <mesh>
            <sphereGeometry args={[1.4, 16, 16]} />
            <meshStandardMaterial color="#0a1930" roughness={0.8} />
          </mesh>
        </mesh>
      </Float>

      {/* 2. Capacity: Industrial Core */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <group ref={capacityRef} scale={0.001}>
          <mesh>
            <icosahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#1f4b8e" wireframe />
          </mesh>
          <mesh>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </Float>

      {/* 3. Supply Staples: Floating Array */}
      <group ref={supplyRef} scale={0.001}>
        <Float speed={2} rotationIntensity={3} floatIntensity={2}>
          <mesh position={[-1, 1, 0]}>
            <capsuleGeometry args={[0.3, 0.8, 16, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[1, -1, 0]}>
            <capsuleGeometry args={[0.3, 0.8, 16, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0, 1]}>
            <capsuleGeometry args={[0.3, 0.8, 16, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.4} metalness={0.6} />
          </mesh>
        </Float>
      </group>

      {/* 4. Logistics: Concentric Tech Rings */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
        <group ref={logisticsRef} scale={0.001}>
          <mesh rotation-x={Math.PI / 2}>
            <torusGeometry args={[1.5, 0.05, 16, 100]} />
            <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={0.5} />
          </mesh>
          <mesh rotation-y={Math.PI / 2}>
            <torusGeometry args={[1.2, 0.05, 16, 100]} />
            <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </Float>

      {/* 5. Quality Assurance: Premium Diamond */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={qualityRef} scale={0.001}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={0.9} />
          <mesh scale={1.1}>
            <octahedronGeometry args={[1.2, 0]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
          </mesh>
        </mesh>
      </Float>
    </group>
  );
}

export default function About3DScene({ scrollProgress }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <color attach="background" args={['#020308']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4a90e2" />
      
      {/* Abstract particle field background instead of realistic stars or cities */}
      <ParticleField />
      
      <SceneObjects scrollProgress={scrollProgress} />
    </Canvas>
  );
}
