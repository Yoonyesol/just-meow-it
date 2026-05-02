'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, OrbitControls, Html, Stars, Sparkles } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Paragraph } from '@toss/tds-mobile';

interface CatProps {
  advice?: { title: string; advice: string };
  showBubble?: boolean;
  showOnlyBackground?: boolean;
  showOnlyCat?: boolean;
  isLoading?: boolean;
}

const CONFIG = {
  portrait: {
    catX: 0,
    catY: 5.2,
    cameraPos: [0, 3.6, 10] as [number, number, number],
    target: [0, 3.6, 0] as [number, number, number],
    polarRange: [Math.PI / 2.5, Math.PI / 2.5] as [number, number],
  },
  landscape: {
    catX: -5.5,
    catY: 4.6,
    cameraPos: [-5.5, 5.6, 10] as [number, number, number],
    target: [-5.5, 5.6, 0] as [number, number, number],
    polarRange: [Math.PI / 2.1, Math.PI / 1.9] as [number, number],
  }
};

// --- 개별 반짝임 별 쉐이더 (크기 계층화 적용) ---
const TwinkleShaderMaterial = {
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    uniform float uTime;
    attribute float aSize;
    attribute float aOpacity;
    varying float vOpacity;
    
    float hash(float n) { return fract(sin(n) * 43758.5453123); }

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      float id = position.x + position.y + position.z;
      
      // 개별 반짝임 로직
      float s = 1.0 + hash(id) * 3.0;
      float o = hash(id + 1.0) * 20.0;
      float twinkle = pow(sin(uTime * s + o) * 0.5 + 0.5, 2.0); 
      
      // aOpacity와 twinkling을 결합
      vOpacity = aOpacity * (0.3 + twinkle * 0.7);
      
      gl_PointSize = aSize * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying float vOpacity;
    void main() {
      float r = distance(gl_PointCoord, vec2(0.5));
      if (r > 0.5) discard;
      float strength = 1.0 - smoothstep(0.1, 0.5, r);
      gl_FragColor = vec4(vec3(1.0), strength * vOpacity);
    }
  `
};

// --- 완전 밝은 무그림자 행성 쉐이더 ---
const PlanetShaderMaterial = {
  uniforms: {
    uColorA: { value: new THREE.Color('#3B82F6') },
    uColorB: { value: new THREE.Color('#1E3A8A') },
    uSeed: { value: Math.random() * 10.0 },
    uAtmosphereColor: { value: new THREE.Color('#60A5FA') }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uAtmosphereColor;
    uniform float uSeed;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      float band = sin(vPosition.y * 6.0 + uSeed) * 0.5 + 0.5;
      vec3 color = mix(uColorA, uColorB, smoothstep(0.2, 0.8, band));
      float fresnel = pow(1.0 - max(dot(vNormal, vec3(0,0,1)), 0.0), 2.0);
      vec3 finalColor = color + (uAtmosphereColor * fresnel * 0.5) + (color * 0.4);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const CustomPlanet = ({ size, colorA, colorB, atmosphereColor, speed, orbitRadius, orbitTilt, ring }: any) => {
  const ref = useRef<THREE.Group>(null);
  const uniforms = useMemo(() => ({
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uAtmosphereColor: { value: new THREE.Color(atmosphereColor) },
    uSeed: { value: Math.random() * 100.0 }
  }), [colorA, colorB, atmosphereColor]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius;
      ref.current.position.y = Math.sin(t) * orbitTilt;
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <shaderMaterial fragmentShader={PlanetShaderMaterial.fragmentShader} vertexShader={PlanetShaderMaterial.vertexShader} uniforms={uniforms} />
      </mesh>
      {ring && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 2.5, 64]} />
          <meshStandardMaterial color={colorA} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

const IndividualTwinklingStars = ({ count = 15000 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [positions, sizes, opacities] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    const o = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 60 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);

      // 계층화: 1/4은 크고 밝게 (주인공 별), 3/4은 작고 은은하게 (은하수 배경)
      if (i < count / 4) {
        s[i] = 1.6 + Math.random() * 1.0;
        o[i] = 0.5 + Math.random() * 0.5;
      } else {
        s[i] = 0.3 + Math.random() * 0.5;
        o[i] = 0.05 + Math.random() * 0.25;
      }
    }
    return [p, s, o];
  }, [count]);

  useFrame(({ clock }) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    if (pointsRef.current) pointsRef.current.rotation.y = clock.getElapsedTime() * 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-aSize" count={count} array={sizes} itemSize={1} />
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-aOpacity" count={count} array={opacities} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={TwinkleShaderMaterial.vertexShader}
        fragmentShader={TwinkleShaderMaterial.fragmentShader}
      />
    </points>
  );
};

const RotatingBackground = () => (
  <group>
    {/* 배경 별밭 밀도 대폭 상향 (20,000개) */}
    <Stars radius={120} depth={50} count={20000} factor={3} saturation={0} fade={false} speed={0} />
    <IndividualTwinklingStars count={15000} />
    <Sparkles count={100} scale={100} size={1.2} speed={0.4} opacity={0.4} />
  </group>
);

const CatModel = ({ advice, showBubble, isLoading }: CatProps) => {
  const { scene } = useGLTF('/cat_model/scene.gltf');
  return (
    <group>
      {showBubble && (
        <Html position={[0, 1.2, 0]} center distanceFactor={10} className="pointer-events-none">
          <div className="w-max min-w-[160px] max-w-[240px] animate-fadeInOut transition-all duration-300">
            <div className="bg-white rounded-[22px] px-5 py-3 shadow-[0_10px_40px_rgba(255,255,255,0.3)] flex items-center justify-center relative min-h-[50px]">
              {isLoading ? (
                <div className="flex gap-1.5 py-1 animate-pulse">
                  <div className="w-2.5 h-2.5 bg-[#8FA1FF] rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-[#8FA1FF] rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-[#8FA1FF] rounded-full"></div>
                </div>
              ) : advice && (
                <Paragraph typography="t5" fontWeight="bold" style={{ textAlign: 'center' }} className="leading-tight break-keep">
                  <span style={{ color: '#4E5968' }}>{advice.title}</span>
                </Paragraph>
              )}
              {/* 말풍선 꼬리: 본체와 자연스럽게 연결되도록 위치 조정 */}
              <div className="absolute -bottom-[4px] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-white rotate-45 rounded-sm"></div>
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

const OrbitingMoons = () => (
  <group position={[0, -1.5, 0]}>
    <CustomPlanet size={0.3} colorA="#60A5FA" colorB="#3B82F6" atmosphereColor="#93C5FD" speed={0.07} orbitRadius={4.2} orbitTilt={0.4} />
    <CustomPlanet size={0.24} colorA="#FDE68A" colorB="#FBBF24" atmosphereColor="#FEF3C7" speed={0.04} orbitRadius={6} orbitTilt={-0.2} ring />
    <CustomPlanet size={0.18} colorA="#F87171" colorB="#EF4444" atmosphereColor="#FECACA" speed={0.12} orbitRadius={3} orbitTilt={0.7} />
    <CustomPlanet size={0.21} colorA="#C4B5FD" colorB="#8B5CF6" atmosphereColor="#EDE9FE" speed={0.06} orbitRadius={5.2} orbitTilt={-0.6} />
    <CustomPlanet size={0.15} colorA="#6EE7B7" colorB="#10B981" atmosphereColor="#D1FAE5" speed={0.09} orbitRadius={3.8} orbitTilt={0.9} />
  </group>
);

const ShootingStars = () => {
  const starRef = useRef<THREE.Mesh>(null);
  const active = useRef(false);
  useFrame(() => {
    if (!active.current && Math.random() < 0.01) {
      active.current = true;
      if (starRef.current) starRef.current.position.set(Math.random() * 60 - 30, 30, -50);
    }
    if (active.current && starRef.current) {
      starRef.current.position.x += 0.5; starRef.current.position.y -= 0.4;
      if (starRef.current.position.y < -30) active.current = false;
    }
  });
  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[0.12, 8, 8]} /><meshBasicMaterial color="#ffffff" />
      <mesh rotation={[0, 0, Math.PI / 4]} position={[-3, 2.4, 0]}><boxGeometry args={[8, 0.03, 0.03]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.4} /></mesh>
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
      <Canvas key={mode} camera={{ position: current.cameraPos, fov: 45 }} style={{ width: '100%', height: '100%' }}>
        <group position={[current.catX, current.catY, 0]}>
          {!showOnlyCat && (
            <>
              <ambientLight intensity={0.4} />
              <RotatingBackground />
              <ShootingStars />
              <OrbitingMoons />
            </>
          )}
          {!showOnlyBackground && (
            <>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 8, 5]} intensity={6.0} color="#ffffff" />
              <pointLight position={[0, 2, 4]} intensity={15.0} color="#ffffff" />
              <Suspense fallback={null}><CatModel advice={advice} showBubble={showBubble} isLoading={isLoading} /></Suspense>
            </>
          )}
        </group>
        <OrbitControls target={current.target} enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.05} minPolarAngle={current.polarRange[0]} maxPolarAngle={current.polarRange[1]} minAzimuthAngle={-Math.PI / 3} maxAzimuthAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
};

export default CatScene;
