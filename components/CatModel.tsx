'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles, ContactShadows, OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Paragraph } from '@toss/tds-mobile';

interface CatProps {
  advice?: { title: string; advice: string };
  showBubble?: boolean;
  showOnlyBackground?: boolean;
  showOnlyCat?: boolean;
}

const CatModel = ({ advice, showBubble }: CatProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/cat_model/scene.gltf');

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.3} floatingRange={[-0.03, 0.03]}>
        {/* 고양이를 약 2cm 더 하향 조정 (-3.2 -> -3.8) */}
        <primitive object={scene} scale={0.1} position={[0, -3.8, 0]} />
      </Float>
    </group>
  );
};

// 고양이가 로딩되는 동안 보여줄 신비로운 빛의 구체
const LoadingPlaceholder = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 4) * 0.1);
    }
  });
  return (
    <mesh ref={ref} position={[0, -0.5, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#818CF8" emissive="#818CF8" emissiveIntensity={2} transparent opacity={0.3} wireframe />
    </mesh>
  );
};

// 모델 미리 불러오기 (최적화)
useGLTF.preload('/cat_model/scene.gltf');

// 우주 테마: 각기 다른 속도로 공전하는 행성들
const OrbitingMoons = () => {
  const planet1 = useRef<THREE.Mesh>(null);
  const planet2 = useRef<THREE.Mesh>(null);
  const planet3 = useRef<THREE.Mesh>(null);
  const planet4 = useRef<THREE.Mesh>(null);
  const planet5 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (planet1.current) {
      planet1.current.position.x = Math.cos(t * 0.15) * 2.8;
      planet1.current.position.z = Math.sin(t * 0.15) * 2.8;
    }
    if (planet2.current) {
      planet2.current.position.x = Math.cos(t * 0.1) * 3.2;
      planet2.current.position.z = Math.sin(t * 0.1) * 3.2;
      planet2.current.position.y = Math.sin(t * 0.05) * 1.5;
    }
    if (planet3.current) {
      planet3.current.position.x = Math.cos(t * 0.2) * 2.4;
      planet3.current.position.z = Math.sin(t * 0.2) * 2.4;
    }
    if (planet4.current) {
      planet4.current.position.x = Math.cos(t * 0.12) * 3.5;
      planet4.current.position.z = Math.sin(t * 0.12) * 3.5;
    }
    if (planet5.current) {
      planet5.current.position.x = Math.cos(t * 0.08) * 4.0;
      planet5.current.position.z = Math.sin(t * 0.08) * 4.0;
    }
  });

  return (
    <group position={[0, -0.8, 0]}>
      {/* 궤도 행성 1: 인디고 구체 */}
      <mesh ref={planet1}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#818CF8" emissive="#818CF8" emissiveIntensity={0.8} wireframe />
      </mesh>
      {/* 궤도 행성 2: 핑크 정이십면체 */}
      <mesh ref={planet2}>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#FBCFE8" emissive="#FBCFE8" emissiveIntensity={0.6} wireframe />
      </mesh>
      {/* 궤도 행성 3: 에메랄드 정팔면체 */}
      <mesh ref={planet3}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#34D399" emissive="#34D399" emissiveIntensity={1} wireframe />
      </mesh>
      {/* 궤도 행성 4: 스틸 블루 정십이면체 */}
      <mesh ref={planet4}>
        <dodecahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#94A3B8" emissive="#64748B" emissiveIntensity={0.3} wireframe />
      </mesh>
      {/* 궤도 행성 5: 화이트 정사면체 */}
      <mesh ref={planet5}>
        <tetrahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} wireframe />
      </mesh>
    </group>
  );
};

// 실감나는 우주 배경: 회전하는 다중 별자리 레이어
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

// 가끔씩 지나가는 유성 효과
const ShootingStars = () => {
  const starRef = useRef<THREE.Mesh>(null);
  const active = useRef(false);
  const speed = 0.3; // 속도를 더 느리고 우아하게 조정

  useFrame(() => {
    if (!active.current && Math.random() < 0.005) {
      active.current = true;
      if (starRef.current) {
        starRef.current.position.set(Math.random() * 40 - 20, 20, -30);
      }
    }

    if (active.current && starRef.current) {
      starRef.current.position.x += speed;
      starRef.current.position.y -= speed * 0.8;
      if (starRef.current.position.y < -20) {
        active.current = false;
      }
    }
  });

  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      <mesh rotation={[0, 0, Math.PI / 4]} position={[-2, 1.6, 0]}>
        <boxGeometry args={[5, 0.02, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </mesh>
  );
};

const CatScene = ({ advice, showBubble, showOnlyBackground, showOnlyCat }: CatProps) => {
  return (
    <div className={`absolute inset-0 w-full h-full ${showOnlyCat ? 'z-10' : 'z-0'}`}>
      {/* 2D 말풍선 (고양이와 함께 약 2cm 하향 조정) */}
      {!showOnlyBackground && showBubble && advice && (
        <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 z-20 w-max max-w-[260px] animate-fadeInOut transition-all duration-300">
          <div className="bg-[#5D6BBF] rounded-[24px] px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/30 flex items-center justify-center relative">
            <Paragraph typography="t6" fontWeight="bold" className="text-white text-center leading-snug break-keep">
              {advice.title}
            </Paragraph>
            <div className="absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#5D6BBF] rotate-45 rounded-[2px] border-b border-r border-white/30"></div>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 1.5, 5.5] }} style={{ width: '100%', height: '100%' }}>
        <group position={[0, 1, 0]}>
          {/* 배경 요소들 */}
          {!showOnlyCat && (
            <>
              <ambientLight intensity={0.6} />
              <RotatingStars />
              <ShootingStars />
              <OrbitingMoons />
            </>
          )}

          {/* 고양이 및 오라 (배경 모드일 때는 숨김) */}
          {!showOnlyBackground && (
            <>
              <ambientLight intensity={0.9} />
              <directionalLight position={[0, 2, 5]} intensity={1.5} color="#ffffff" />
              <pointLight position={[5, 5, 5]} intensity={0.8} color="#818CF8" />
              <pointLight position={[-5, -5, -5]} intensity={0.6} color="#F472B6" />

              {/* 은하수 빛 번짐 (고양이 발밑으로 정확히 이동) */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.8, 0]}>
                <planeGeometry args={[7, 7]} />
                <shaderMaterial
                  transparent depthWrite={false} blending={THREE.AdditiveBlending}
                  vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
                  fragmentShader={`varying vec2 vUv; void main() { float dist = distance(vUv, vec2(0.5)); float alpha = smoothstep(0.5, 0.0, dist); vec3 color = mix(vec3(0.15, 0.15, 0.3), vec3(0.2, 0.25, 0.4), alpha); gl_FragColor = vec4(color, alpha * 0.55); }`}
                />
              </mesh>

              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.79, 0]}>
                <planeGeometry args={[3, 3]} />
                <shaderMaterial
                  transparent depthWrite={false} blending={THREE.AdditiveBlending}
                  vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
                  fragmentShader={`varying vec2 vUv; void main() { float dist = distance(vUv, vec2(0.5)); float alpha = smoothstep(0.5, 0.0, dist); gl_FragColor = vec4(vec3(0.4, 0.5, 0.6), alpha * 0.7); }`}
                />
              </mesh>

              <Sparkles position={[0, -3.7, 0]} count={30} scale={3} size={1.5} speed={0.6} opacity={0.4} color="#E0E7FF" />
              <Sparkles count={40} scale={6} size={2} speed={0.4} opacity={0.2} color="#A5B4FC" />
              <ContactShadows position={[0, -3.8, 0]} opacity={0.4} scale={5} blur={1.5} far={4} color="#000000" />

              <Suspense fallback={<LoadingPlaceholder />}>
                <CatModel advice={advice} showBubble={showBubble} />
              </Suspense>
            </>
          )}
        </group>

        <OrbitControls
          enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.05}
          minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5}
          minAzimuthAngle={-Math.PI / 3} maxAzimuthAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default CatScene;
