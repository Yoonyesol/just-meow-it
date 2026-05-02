'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles, ContactShadows, OrbitControls, Stars, Html } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Paragraph } from '@toss/tds-mobile';

interface CatProps {
  advice?: { title: string; advice: string };
  showBubble?: boolean;
  showOnlyBackground?: boolean;
  showOnlyCat?: boolean;
  isLoading?: boolean;
}

// 모드별 설정 분리 (전체적으로 아래로 1.5 유닛 이동)
const CONFIG = {
  portrait: {
    catX: 0,
    catY: 4.5, // 고양이 위치는 높게
    cameraPos: [0, 3, 10] as [number, number, number], // 카메라는 낮게 (아래에서 올려다봄)
    target: [0, 3, 0] as [number, number, number],    // 시선도 낮게
    polarRange: [Math.PI / 2.5, Math.PI / 2.5] as [number, number],
  },
  landscape: {
    catX: -5.5,
    catY: 4.0, // 가로 모드도 상향 조정
    cameraPos: [-5.5, 5.0, 10] as [number, number, number],
    target: [-5.5, 5.0, 0] as [number, number, number],
    polarRange: [Math.PI / 2.1, Math.PI / 1.9] as [number, number],
  }
};

const CatModel = ({ advice, showBubble, isLoading }: CatProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/cat_model/scene.gltf');

  return (
    <group ref={group}>
      {/* 3D 말풍선: 고양이 머리에 더 가깝게 조정 */}
      {showBubble && (
        <Html position={[0, 0.9, 0]} center distanceFactor={10} className="pointer-events-none">
          <div className="w-max min-w-[140px] max-w-[220px] animate-fadeInOut transition-all duration-300">
            <div className="bg-[#8FA1FF] rounded-[20px] px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-white/50 flex items-center justify-center relative min-h-[44px]">
              {isLoading ? (
                <div className="flex gap-1.5 animate-pulse">
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                </div>
              ) : advice && (
                <Paragraph typography="t7" fontWeight="bold" style={{ color: '#FFFFFF', textAlign: 'center' }} className="leading-tight break-keep">
                  {advice.title}
                </Paragraph>
              )}
              <div className="absolute -bottom-[5px] left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-[#8FA1FF] rotate-45 rounded-[1px] border-b border-r border-white/50"></div>
            </div>
          </div>
        </Html>
      )}

      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.3} floatingRange={[-0.03, 0.03]}>
        <primitive object={scene} scale={0.045} position={[0, -1.5, 0]} />
      </Float>
    </group>
  );
};

const LoadingPlaceholder = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 4) * 0.1);
  });
  return (
    <mesh ref={ref} position={[0, -0.5, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#818CF8" emissive="#818CF8" emissiveIntensity={2} transparent opacity={0.3} wireframe />
    </mesh>
  );
};

useGLTF.preload('/cat_model/scene.gltf');

const OrbitingMoons = () => {
  const planet1 = useRef<THREE.Mesh>(null);
  const planet2 = useRef<THREE.Mesh>(null);
  const planet3 = useRef<THREE.Mesh>(null);
  const planet4 = useRef<THREE.Mesh>(null);
  const planet5 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (planet1.current) { planet1.current.position.x = Math.cos(t * 0.15) * 2.8; planet1.current.position.z = Math.sin(t * 0.15) * 2.8; }
    if (planet2.current) { planet2.current.position.x = Math.cos(t * 0.1) * 3.2; planet2.current.position.z = Math.sin(t * 0.1) * 3.2; planet2.current.position.y = Math.sin(t * 0.05) * 1.5; }
    if (planet3.current) { planet3.current.position.x = Math.cos(t * 0.2) * 2.4; planet3.current.position.z = Math.sin(t * 0.2) * 2.4; }
    if (planet4.current) { planet4.current.position.x = Math.cos(t * 0.12) * 3.5; planet4.current.position.z = Math.sin(t * 0.12) * 3.5; }
    if (planet5.current) { planet5.current.position.x = Math.cos(t * 0.08) * 4.0; planet5.current.position.z = Math.sin(t * 0.08) * 4.0; }
  });

  return (
    <group position={[0, -1.5, 0]}>
      <mesh ref={planet1}><sphereGeometry args={[0.15, 16, 16]} /><meshStandardMaterial color="#818CF8" emissive="#818CF8" emissiveIntensity={0.8} wireframe /></mesh>
      <mesh ref={planet2}><icosahedronGeometry args={[0.15, 0]} /><meshStandardMaterial color="#FBCFE8" emissive="#FBCFE8" emissiveIntensity={0.6} wireframe /></mesh>
      <mesh ref={planet3}><octahedronGeometry args={[0.1, 0]} /><meshStandardMaterial color="#34D399" emissive="#34D399" emissiveIntensity={1} wireframe /></mesh>
      <mesh ref={planet4}><dodecahedronGeometry args={[0.12, 0]} /><meshStandardMaterial color="#94A3B8" emissive="#64748B" emissiveIntensity={0.3} wireframe /></mesh>
      <mesh ref={planet5}><tetrahedronGeometry args={[0.08, 0]} /><meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} wireframe /></mesh>
    </group>
  );
};

const RotatingStars = () => {
  const starsRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
      starsRef.current.rotation.x = clock.getElapsedTime() * 0.005;
    }
  });
  return (
    <group ref={starsRef}>
      <Stars radius={80} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Stars radius={150} depth={100} count={2000} factor={6} saturation={0.5} fade speed={1.5} />
    </group>
  );
};

const ShootingStars = () => {
  const starRef = useRef<THREE.Mesh>(null);
  const active = useRef(false);
  useFrame(() => {
    if (!active.current && Math.random() < 0.005) {
      active.current = true;
      if (starRef.current) starRef.current.position.set(Math.random() * 40 - 20, 20, -30);
    }
    if (active.current && starRef.current) {
      starRef.current.position.x += 0.3; starRef.current.position.y -= 0.24;
      if (starRef.current.position.y < -20) active.current = false;
    }
  });
  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[0.08, 8, 8]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      <mesh rotation={[0, 0, Math.PI / 4]} position={[-2, 1.6, 0]}><boxGeometry args={[5, 0.02, 0.02]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.3} /></mesh>
    </mesh>
  );
};

const CatScene = ({ advice, showBubble, showOnlyBackground, showOnlyCat, isLoading }: CatProps) => {
  const [mode, setMode] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const handleResize = () => setMode(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const current = CONFIG[mode];

  return (
    <div className={`absolute inset-0 w-full h-full ${showOnlyCat ? 'z-10' : 'z-0'}`}>
      <Canvas
        key={mode}
        camera={{ position: current.cameraPos, fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <group position={[current.catX, current.catY, 0]}>
          {!showOnlyCat && (
            <>
              <ambientLight intensity={0.6} />
              <RotatingStars />
              <ShootingStars />
              <OrbitingMoons />
            </>
          )}

          {!showOnlyBackground && (
            <>
              <ambientLight intensity={0.9} />
              <directionalLight position={[0, 2, 5]} intensity={1.5} color="#ffffff" />
              <pointLight position={[5, 5, 5]} intensity={0.8} color="#818CF8" />
              <pointLight position={[-5, -5, -5]} intensity={0.6} color="#F472B6" />

              {/* 은하수 바닥 제거 완료 */}

              <Suspense fallback={<LoadingPlaceholder />}>
                <CatModel advice={advice} showBubble={showBubble} isLoading={isLoading} />
              </Suspense>
            </>
          )}
        </group>

        <OrbitControls
          target={current.target}
          enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.05}
          minPolarAngle={current.polarRange[0]} maxPolarAngle={current.polarRange[1]}
          minAzimuthAngle={-Math.PI / 3} maxAzimuthAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default CatScene;
