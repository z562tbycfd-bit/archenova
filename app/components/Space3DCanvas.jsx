"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function StarField() {
  const meshRef = useRef(null);

  const { geom, mat } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.055,
      sizeAttenuation: true,
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    return { geom, mat };
  }, []);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += dt * 0.02;
  });

  return <points ref={meshRef} geometry={geom} material={mat} />;
}

function ColdVacuumCore() {
  const meshRef = useRef(null);

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

/**
 * domain, code を受け取って “形状変化” を起こすための最小口
 * いまは強度だけ変える（確実に壊れない）。
 */
function MorphByCode({ domain = "quantum", code = "" }) {
  const g = useRef(null);

  const strength = useMemo(() => {
    // code内のA/B比率で0.6〜1.6へ
    const a = (code.match(/A/g) || []).length;
    const b = (code.match(/B/g) || []).length;
    const base = 1 + (a - b) * 0.06;
    return Math.min(1.6, Math.max(0.6, base));
  }, [code]);

  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.getElapsedTime();

    // “冷たい圧”：domainで挙動変える
    const w = domain === "gravity" ? 0.55 : 0.9;
    const amp = domain === "gravity" ? 0.08 : 0.12;

    g.current.rotation.y = t * 0.15;
    g.current.rotation.x = t * 0.06;

    const pulse = 1 + Math.sin(t * w) * amp * (strength - 1);
    g.current.scale.setScalar(pulse);
  });

  return (
    <group ref={g}>
      {/* 形状自体も domain で変える */}
      {domain === "gravity" ? (
        <torusKnotGeometry args={[1.0, 0.28, 160, 12]} />
      ) : (
        <dodecahedronGeometry args={[1.15, 0]} />
      )}
    </group>
  );
}

export default function Space3DCanvas({ domain, code }) {
  return (
    <div style={{ width: "100%", height: "70vh", borderRadius: 22, overflow: "hidden" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 4, 6]} intensity={0.55} />
        <pointLight position={[-6, -2, -4]} intensity={0.35} />

        <StarField />

        {/* 中央コア */}
        <group>
          <ColdVacuumCore />
          <mesh>
            {/* MorphByCodeのgeometryをここに刺す：meshで確実に描画 */}
            <MorphByCode domain={domain} code={code} />
            <meshStandardMaterial
              color={"#0b0b0c"}
              metalness={0.35}
              roughness={0.12}
              emissive={"#000000"}
            />
          </mesh>
        </group>

        <OrbitControls enableDamping={true} dampingFactor={0.08} />
      </Canvas>
    </div>
  );
}