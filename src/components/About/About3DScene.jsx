import { useRef, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, TorusKnot, Sphere, Box, Points, PointMaterial, useGLTF } from '@react-three/drei';
import gsap from 'gsap';

// Immersive Star Tunnel / Particle Field
function TunnelParticles() {
  const ref = useRef();
  const count = 3000;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Distribute particles in a long tunnel along the Z axis
    positions[i * 3] = (Math.random() - 0.5) * 30; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60; // Z (deep tunnel)
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <PointMaterial transparent color="#ffffff" size={0.08} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </points>
  );
}

function GlobeModel(props) {
  const { scene } = useGLTF('/models/earth_globe_-_atlas.glb');
  return <primitive object={scene} {...props} />;
}

function CargoModel(props) {
  const { scene } = useGLTF('/models/cargo_container_long.glb');
  return <primitive object={scene} {...props} />;
}

function SceneObjects({ scrollProgress }) {
  const cameraGroupRef = useRef();
  const objectsGroupRef = useRef();

  useFrame((state, delta) => {
    if (objectsGroupRef.current) {
      // Gentle ambient rotation for the whole environment
      objectsGroupRef.current.rotation.y += delta * 0.05;
    }
  });

  useLayoutEffect(() => {
    if (!cameraGroupRef.current) return;

    const ctx = gsap.context(() => {
      // As scrollProgress goes 0 -> 1, the camera group moves deep into the negative Z-axis
      // We have 5 sections, spread them out every 15 units
      // Max depth = -60
      gsap.to(cameraGroupRef.current.position, {
        z: -(scrollProgress * 60), 
        duration: 0.5,
        ease: 'none' // Linear ease for smooth scroll tracking
      });

      // Add a slight rotation to the camera as it flies through for immersion
      gsap.to(cameraGroupRef.current.rotation, {
        z: scrollProgress * Math.PI * 0.5,
        duration: 0.5,
        ease: 'none'
      });
    });

    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <>
      <group ref={objectsGroupRef}>
        <TunnelParticles />

        {/* Section 1: Global Presence (z: 0) */}
        <group position={[2, 0, 0]}>
          <Float speed={2} rotationIntensity={2} floatIntensity={2}>
            <GlobeModel scale={0.5} />
          </Float>
        </group>

        {/* Section 2: Capacity (z: -15) */}
        <group position={[-2, 1, -15]}>
          <Float speed={3} rotationIntensity={3} floatIntensity={2}>
            <mesh>
              <icosahedronGeometry args={[2, 1]} />
              <meshStandardMaterial color="#4a90e2" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh scale={1.2}>
              <icosahedronGeometry args={[2, 1]} />
              <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
            </mesh>
          </Float>
        </group>

        {/* Section 3: Supply Staples (z: -30) */}
        <group position={[2, -1, -30]}>
          <Float speed={2} rotationIntensity={4} floatIntensity={3}>
            {[...Array(5)].map((_, i) => (
              <mesh key={i} position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]}>
                <capsuleGeometry args={[0.4, 1.2, 16, 16]} />
                <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.7} />
              </mesh>
            ))}
          </Float>
        </group>

        {/* Section 4: Logistics (z: -45) */}
        <group position={[-2, 0, -45]}>
          <Float speed={4} rotationIntensity={2} floatIntensity={2}>
            <CargoModel scale={1} />
          </Float>
        </group>

        {/* Section 5: Quality Assurance (z: -60) */}
        <group position={[0, 0, -60]}>
          <Float speed={2} rotationIntensity={2} floatIntensity={2}>
            <mesh>
              <torusKnotGeometry args={[2, 0.6, 128, 32]} />
              <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1} />
            </mesh>
          </Float>
        </group>
      </group>

      {/* Camera Group that flies through the scene */}
      <group ref={cameraGroupRef} position={[0, 0, 5]}>
        {/* We attach lights to the camera so it illuminates wherever we fly */}
        <pointLight position={[0, 0, 2]} intensity={2} color="#ffffff" distance={20} />
        <directionalLight position={[10, 10, -5]} intensity={1} color="#4a90e2" />
        {/* Actual camera is controlled by Canvas, but we manipulate this group to move the viewpoint if we attach a PerspectiveCamera here.
            Since R3F handles the default camera, a simpler way is to move the default camera directly in the useFrame. */}
      </group>
    </>
  );
}

export default function About3DScene({ scrollProgress }) {
  // We need to manipulate the default camera
  return (
    <Canvas>
      <color attach="background" args={['#020308']} />
      <ambientLight intensity={0.2} />
      
      <CameraController scrollProgress={scrollProgress} />
      <Suspense fallback={null}>
        <SceneObjects scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}

// Component to handle camera flying
function CameraController({ scrollProgress }) {
  useFrame(({ camera }) => {
    // Fly the camera from z=8 down to z=-65 based on scroll
    gsap.to(camera.position, {
      z: 8 - (scrollProgress * 73),
      x: Math.sin(scrollProgress * Math.PI * 4) * 0.5, // slight wobble
      y: Math.cos(scrollProgress * Math.PI * 4) * 0.5,
      duration: 0.5,
      ease: 'none'
    });
    
    // Rotate camera to feel like a spaceship barrel roll
    gsap.to(camera.rotation, {
      z: scrollProgress * Math.PI * 0.5,
      duration: 0.5,
      ease: 'none'
    });
  });
  return null;
}

useGLTF.preload('/models/earth_globe_-_atlas.glb');
useGLTF.preload('/models/cargo_container_long.glb');
