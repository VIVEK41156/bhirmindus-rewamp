import { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars, MeshDistortMaterial, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function SceneObjects({ scrollProgress }) {
  const groupRef = useRef();
  const earthRef = useRef();
  const moleculeRef = useRef();
  const grainRef = useRef();
  const boxRef = useRef();
  const shieldRef = useRef();

  useFrame((state, delta) => {
    // Slowly rotate the entire group for a constant ambient feel
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    // We use scrollProgress (0 to 1) to animate visibility and rotation of different objects
    const ctx = gsap.context(() => {
      // 0.0 to 0.2: Global Presence (Earth-like sphere)
      gsap.to(earthRef.current.scale, {
        x: scrollProgress < 0.25 ? 1 : 0,
        y: scrollProgress < 0.25 ? 1 : 0,
        z: scrollProgress < 0.25 ? 1 : 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      // 0.2 to 0.4: Production (Molecules/distorted sphere)
      gsap.to(moleculeRef.current.scale, {
        x: scrollProgress >= 0.2 && scrollProgress < 0.45 ? 1 : 0,
        y: scrollProgress >= 0.2 && scrollProgress < 0.45 ? 1 : 0,
        z: scrollProgress >= 0.2 && scrollProgress < 0.45 ? 1 : 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      // 0.4 to 0.6: Supply (Floating grains/small spheres)
      gsap.to(grainRef.current.scale, {
        x: scrollProgress >= 0.4 && scrollProgress < 0.65 ? 1 : 0,
        y: scrollProgress >= 0.4 && scrollProgress < 0.65 ? 1 : 0,
        z: scrollProgress >= 0.4 && scrollProgress < 0.65 ? 1 : 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      // 0.6 to 0.8: Freight (Geometric Box)
      gsap.to(boxRef.current.scale, {
        x: scrollProgress >= 0.6 && scrollProgress < 0.85 ? 1 : 0,
        y: scrollProgress >= 0.6 && scrollProgress < 0.85 ? 1 : 0,
        z: scrollProgress >= 0.6 && scrollProgress < 0.85 ? 1 : 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      // 0.8 to 1.0: QA (Shield/Torus)
      gsap.to(shieldRef.current.scale, {
        x: scrollProgress >= 0.8 ? 1 : 0,
        y: scrollProgress >= 0.8 ? 1 : 0,
        z: scrollProgress >= 0.8 ? 1 : 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Camera depth effect based on scroll
      gsap.to(groupRef.current.position, {
        z: Math.sin(scrollProgress * Math.PI) * 2,
        duration: 0.5
      });
    });

    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <group ref={groupRef}>
      {/* 1. Global Presence */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={earthRef} scale={1}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color="#2d5a9e" wireframe transparent opacity={0.8} />
          <mesh>
            <sphereGeometry args={[1.45, 32, 32]} />
            <meshStandardMaterial color="#0a1930" roughness={0.2} metalness={0.8} />
          </mesh>
        </mesh>
      </Float>

      {/* 2. Production (Starch/Molecule) */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <mesh ref={moleculeRef} scale={0}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial color="#ffffff" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0} metalness={0.8} roughness={0.1} distort={0.4} speed={2} />
        </mesh>
      </Float>

      {/* 3. Supply (Organic grains) */}
      <group ref={grainRef} scale={0}>
        {[...Array(15)].map((_, i) => (
          <Float key={i} speed={2 + Math.random()} rotationIntensity={2} floatIntensity={2} position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]}>
            <mesh>
              <capsuleGeometry args={[0.2, 0.4, 16, 16]} />
              <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.5} />
            </mesh>
          </Float>
        ))}
      </group>

      {/* 4. Freight/Logistics */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <group ref={boxRef} scale={0}>
          <Box args={[2, 1, 1]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
          </Box>
          <Box args={[2.05, 1.05, 1.05]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#4a90e2" wireframe transparent opacity={0.3} />
          </Box>
        </group>
      </Float>

      {/* 5. Quality Assurance */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={shieldRef} scale={0}>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1} envMapIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function About3DScene({ scrollProgress }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={['#020308']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4a90e2" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />
      <SceneObjects scrollProgress={scrollProgress} />
    </Canvas>
  );
}
