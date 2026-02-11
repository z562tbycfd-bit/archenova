"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function Stars() {
  const pointsRef = useRef(null);

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

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.055,
        sizeAttenuation: true,
        color: new THREE.Color("#ffffff"),
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
    []
  );

  const points = useMemo(() => new THREE.Points(geometry, material), [geometry, material]);

  useFrame((state, dt) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += dt * 0.02;
  });

  return <primitive object={points} ref={pointsRef} />;
}

function ColdVacuumCore() {
  const meshRef = useRef(null);

  const geom = useMemo(() => new THREE.IcosahedronGeometry(1.2, 2), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0b0b0c"),
        metalness: 0.35,
        roughness: 0.15,
        emissive: new THREE.Color("#000000"),
      }),
    []
  );

  const mesh = useMemo(() => new THREE.Mesh(geom, mat), [geom, mat]);

  useFrame((state, dt) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y += dt * 0.12;
    meshRef.current.rotation.x += dt * 0.05;

    const s = 1 + Math.sin(t * 0.9) * 0.01;
    meshRef.current.scale.set(s, s, s);
  });

  return <primitive object={mesh} ref={meshRef} />;
}

function SceneBackground() {
  useFrame(({ gl }) => {
    gl.setClearColor("#000000", 1);
  });
  return null;
}

export default function Space3DCanvas() {
  return (
    <div style={{ width: "100%", height: "70vh", borderRadius: 22, overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <SceneBackground />

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