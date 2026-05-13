"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

function Symbols() {
  const root = useRef<Group>(null);
  useFrame((_, dt) => {
    if (root.current) root.current.rotation.y += dt * 0.15;
  });
  return (
    <group ref={root}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[-2.2, 0.4, 0]}>
          <torusKnotGeometry args={[0.6, 0.18, 128, 16]} />
          <MeshDistortMaterial
            color="#0D9488"
            speed={1.2}
            distort={0.25}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh position={[1.8, -0.2, -0.4]}>
          <icosahedronGeometry args={[0.7, 1]} />
          <MeshDistortMaterial
            color="#6366F1"
            speed={1.5}
            distort={0.3}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[0, -1.4, 0.6]}>
          <octahedronGeometry args={[0.55, 0]} />
          <MeshDistortMaterial
            color="#F59E0B"
            speed={1}
            distort={0.2}
            metalness={0.3}
            roughness={0.3}
          />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh position={[2.6, 1.2, 0.6]}>
          <dodecahedronGeometry args={[0.4, 0]} />
          <MeshDistortMaterial
            color="#22C55E"
            speed={1.3}
            distort={0.18}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Particles() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial color="#0D9488" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Particles />
        <Symbols />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
