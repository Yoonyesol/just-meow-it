'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const CatModel = () => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/cat_model/scene.gltf');

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      // 위아래로 튀는 느낌 (y축 위치)
      group.current.position.y = Math.sin(t * 4) * 0.2 - 2;
    }
  });

  return <primitive ref={group} object={scene} scale={0.1} position={[0, -2, 0]} />;
};

const CatScene = () => {
  return (
    <Canvas camera={{ position: [0, 1, 6] }} style={{ height: '40vh' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <CatModel />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default CatScene;
