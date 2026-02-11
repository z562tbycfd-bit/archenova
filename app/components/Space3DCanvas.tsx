"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function Stars() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += dt * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* ✅ TSが最も安定する：args方式 */}
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        size={0.055}
        sizeAttenuation
        color={"#ffffff"}
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

function ColdVacuumCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, dt) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y += dt * 0.12;
    meshRef.current.rotation.x += dt * 0.05;

    const s = 1 + Math.sin(t * 0.9) * 0.01;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 2]} />
      <meshStandardMaterial
        color={"#0b0b0c"}
        metalness={0.35}
        roughness={0.15}
        emissive={"#000000"}
      />
    </mesh>
  );
}

export default function Space3DCanvas() {
  return (
    <div style={{ width: "100%", height: "70vh", borderRadius: 22, overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 4, 6]} intensity={0.55} />
        <pointLight position={[-6, -2, -4]} intensity={0.35} />

        <Stars />
        <ColdVacuumCore />

        <OrbitControls enableDamping dampingFactor={0.08} />
      </Canvas>
    </div>
  );
}