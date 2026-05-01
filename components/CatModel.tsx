'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Float, Sparkles, ContactShadows } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Paragraph } from '@toss/tds-mobile';

interface CatProps {
  advice?: { title: string; advice: string };
  showBubble?: boolean;
}

const CatModel = ({ advice, showBubble }: CatProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/cat_model/scene.gltf');

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3} floatingRange={[-0.05, 0.05]}>
        <primitive object={scene} scale={0.1} position={[0, -2, 0]} />
      </Float>
    </group>
  );
};

const CatScene = ({ advice, showBubble }: CatProps) => {
  return (
    <div className="w-full h-[40vh] min-h-[300px] relative flex flex-col items-center justify-center">
      {/* 2D 캔버스 위에 완전히 고정된 말풍선 (3D 회전이나 부유에 절대 영향받지 않음) */}
      {showBubble && advice && (
        <div className="absolute -top-4 z-20 w-max max-w-[260px] animate-fadeInOut transition-all duration-300">
          <div className="bg-white rounded-[24px] px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center relative">
            <Paragraph typography="t6" fontWeight="bold" color="grey800" className="text-center leading-snug break-keep">
              {advice.title}
            </Paragraph>
            {/* 심플하고 부드러운 꼬리 */}
            <div className="absolute -bottom-[5px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-[2px] shadow-[2px_2px_5px_rgba(0,0,0,0.02)]"></div>
          </div>
        </div>
      )}

      {/* 3D 씬 (고양이 + 배경 파티클) */}
      <Canvas camera={{ position: [0, 1.5, 5.5] }} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        
        <Sparkles count={40} scale={6} size={3} speed={0.2} opacity={0.15} color="#3182F6" />
        <ContactShadows position={[0, -2, 0]} opacity={0.2} scale={5} blur={1.5} far={4} color="#000000" />
        
        <Suspense fallback={null}>
          <CatModel advice={advice} showBubble={showBubble} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default CatScene;
