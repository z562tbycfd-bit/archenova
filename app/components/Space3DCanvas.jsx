"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * params:
 * { domain, code, seed, starCount, ringCount, coreDetail, coreRadius, pressure, drift, cameraZ }
 */

function seededRandom(seed01) {
  let s = Math.floor(seed01 * 1e9) >>> 0;
  return () => {
    // xorshift32
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17; s >>>= 0;
    s ^= s << 5;  s >>>= 0;
    return (s >>> 0) / 4294967296;
  };
}

function Stars({ starCount, seed }) {
  const pointsRef = useRef(null);

  const geom = useMemo(() => {
    const rand = seededRandom(seed);
    const count = Math.max(400, starCount | 0);
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // “冷たい真空”：中心が少し密
      const r = 12 * Math.cbrt(rand());
      const theta = rand() * Math.PI * 2;
      const u = rand() * 2 - 1;
      const phi = Math.acos(u);

      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [starCount, seed]);

  const mat = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color("#ffffff"),
      size: 0.055,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  useFrame((state, dt) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += dt * 0.02;
  });

  return <points ref={pointsRef} geometry={geom} material={mat} />;
}

function ColdVacuumCore({ coreDetail, coreRadius, pressure, drift, seed }) {
  const meshRef = useRef(null);

  const geometry = useMemo(() => {
    // icosahedron を“固定された制約”に応じて荒らす
    const g = new THREE.IcosahedronGeometry(coreRadius, coreDetail);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();

    const rand = seededRandom(seed + 0.1234);
    const k = 0.10 + pressure * 0.10; // 変形強度

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = v.clone().normalize();

      // “出口が消える”：中心へ押しつぶすような偏り
      const bias = (rand() - 0.5) * 2;
      const pull = (0.55 + pressure * 0.55) * 0.06;

      const wobble = Math.sin((n.x + n.y + n.z) * 6.0 + bias * 3.0) * k;
      v.addScaledVector(n, wobble);
      v.addScaledVector(n, -pull * (0.35 + Math.abs(bias)));

      pos.setXYZ(i, v.x, v.y, v.z);
    }

    g.computeVertexNormals();
    return g;
  }, [coreDetail, coreRadius, pressure, seed]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0b0b0c"),
      metalness: 0.35,
      roughness: 0.15,
      emissive: new THREE.Color("#000000"),
    });
  }, []);

  useFrame((state, dt) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // “音が無いのに圧を感じる”：微妙な呼吸 + ドリフト
    meshRef.current.rotation.y += dt * (0.10 + drift);
    meshRef.current.rotation.x += dt * 0.05;

    const s = 1 + Math.sin(t * (0.85 + pressure * 0.25)) * (0.008 + pressure * 0.006);
    meshRef.current.scale.set(s, s, s);
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

function Rings({ ringCount, pressure }) {
  const groupRef = useRef(null);

  const rings = useMemo(() => {
    const arr = [];
    const n = Math.max(0, ringCount | 0);
    for (let i = 0; i < n; i++) {
      const r = 1.75 + i * 0.32;
      const tube = 0.012 + pressure * 0.01;
      arr.push({ r, tube, tilt: (i - (n - 1) / 2) * 0.18 });
    }
    return arr;
  }, [ringCount, pressure]);

  const mat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0b0b0c"),
      metalness: 0.25,
      roughness: 0.08,
      emissive: new THREE.Color("#000000"),
      transparent: true,
      opacity: 0.65,
    });
  }, []);

  useFrame((state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += dt * 0.06;
    groupRef.current.rotation.y += dt * 0.02;
  });

  return (
    <group ref={groupRef}>
      {rings.map((rg, idx) => (
        <mesh
          key={idx}
          rotation={[rg.tilt, 0, rg.tilt * 0.6]}
          material={mat}
          geometry={new THREE.TorusGeometry(rg.r, rg.tube, 10, 220)}
        />
      ))}
    </group>
  );
}

export default function Space3DCanvas({ params }) {
  const {
    seed,
    starCount,
    ringCount,
    coreDetail,
    coreRadius,
    pressure,
    drift,
    cameraZ,
  } = params;

  return (
    <div style={{ width: "100%", height: "70vh", borderRadius: 22, overflow: "hidden" }}>
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 4, 6]} intensity={0.55} />
        <pointLight position={[-6, -2, -4]} intensity={0.35} />

        <Stars starCount={starCount} seed={seed} />
        <Rings ringCount={ringCount} pressure={pressure} />
        <ColdVacuumCore
          coreDetail={coreDetail}
          coreRadius={coreRadius}
          pressure={pressure}
          drift={drift}
          seed={seed}
        />

        <OrbitControls enableDamping dampingFactor={0.08} />
      </Canvas>
    </div>
  );
}