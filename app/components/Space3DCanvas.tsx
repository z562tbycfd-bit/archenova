"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

type Props = {
  mode: "quantum" | "gravity";
  energy: number; // 0..1
  mass: number;   // 0..1
};

export default function Space3DCanvas({ mode, energy, mass }: Props) {
  // cold vacuum palette
  const bg = "#000000";

  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 48 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={[bg]} />

      {/* cold low light */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.5, 2.0, 2.5]} intensity={0.85} />
      <directionalLight position={[-2.0, -1.5, 1.0]} intensity={0.35} />

      {/* subtle fog = vacuum depth */}
      <fog attach="fog" args={["#000000", 2.6, 8.4]} />

      {/* object */}
      {mode === "quantum" ? <QuantumObject energy={energy} /> : <GravityObject mass={mass} />}

      {/* infinite dark reflection */}
      <Environment preset="city" />

      {/* controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        zoomSpeed={0.7}
        panSpeed={0.6}
      />
    </Canvas>
  );
}

function QuantumObject({ energy }: { energy: number }) {
  // higher energy => more “record-like”: sharper edges / brighter rim
  const roughness = 0.46 - energy * 0.20;
  const metalness = 0.48 + energy * 0.30;
  const emissive = 0.06 + energy * 0.18;

  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0b0b0c),
      roughness,
      metalness,
      emissive: new THREE.Color(0x0a0a0a),
      emissiveIntensity: emissive,
    });
    return m;
  }, [roughness, metalness, emissive]);

  return (
    <Float speed={0.75} rotationIntensity={0.25} floatIntensity={0.35}>
      {/* TorusKnot = “interference / topology” feel */}
      <mesh material={mat}>
        <torusKnotGeometry args={[0.78, 0.22, 180, 16]} />
      </mesh>

      {/* thin halo */}
      <mesh>
        <torusGeometry args={[1.05, 0.012, 10, 220]} />
        <meshStandardMaterial
          color="#111111"
          emissive="#111111"
          emissiveIntensity={0.7 + energy * 1.2}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

function GravityObject({ mass }: { mass: number }) {
  // higher mass => deeper well: larger ring + stronger glow
  const ringScale = 0.92 + mass * 0.25;
  const glow = 0.35 + mass * 0.95;

  return (
    <Float speed={0.55} rotationIntensity={0.18} floatIntensity={0.25}>
      {/* central well */}
      <mesh>
        <sphereGeometry args={[0.72, 64, 64]} />
        <meshStandardMaterial
          color="#070708"
          roughness={0.15}
          metalness={0.65}
          emissive="#0a0a0a"
          emissiveIntensity={0.18 + mass * 0.25}
        />
      </mesh>

      {/* lensing ring */}
      <mesh scale={[ringScale, ringScale, ringScale]}>
        <torusGeometry args={[1.10, 0.08, 14, 220]} />
        <meshStandardMaterial
          color="#0b0b0c"
          roughness={0.28}
          metalness={0.85}
          emissive="#0d0d0f"
          emissiveIntensity={glow}
        />
      </mesh>

      {/* outer faint orbit lines */}
      <mesh>
        <torusGeometry args={[1.55, 0.012, 10, 220]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#0a0a0a"
          emissiveIntensity={0.35 + mass * 0.45}
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>
    </Float>
  );
}