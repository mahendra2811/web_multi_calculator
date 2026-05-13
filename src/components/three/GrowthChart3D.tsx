"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { Color } from "three";

interface GrowthChart3DProps {
  data: Array<{ year: number; invested: number; total: number }>;
}

function Bars({ data }: GrowthChart3DProps) {
  const max = Math.max(...data.map((d) => d.total), 1);
  const investedColor = useMemo(() => new Color("#818CF8"), []);
  const totalColor = useMemo(() => new Color("#2DD4BF"), []);

  return (
    <group position={[-(data.length - 1) * 0.6, 0, 0]}>
      {data.map((d, i) => {
        const tH = (d.total / max) * 4;
        const iH = (d.invested / max) * 4;
        return (
          <group key={d.year} position={[i * 1.2, 0, 0]}>
            <mesh position={[-0.3, iH / 2, 0]}>
              <boxGeometry args={[0.5, iH, 0.5]} />
              <meshStandardMaterial color={investedColor} roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0.3, tH / 2, 0]}>
              <boxGeometry args={[0.5, tH, 0.5]} />
              <meshStandardMaterial color={totalColor} roughness={0.3} metalness={0.3} />
            </mesh>
            <Text
              position={[0, -0.3, 0]}
              fontSize={0.22}
              color="#94A3B8"
              anchorX="center"
              anchorY="top"
            >
              {`Y${d.year}`}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export function GrowthChart3D({ data }: GrowthChart3DProps) {
  return (
    <div className="bg-surface h-[320px] w-full overflow-hidden rounded-xl">
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <Bars data={data} />
          </Float>
        </Suspense>
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={6}
          maxDistance={18}
        />
      </Canvas>
    </div>
  );
}

export default GrowthChart3D;
