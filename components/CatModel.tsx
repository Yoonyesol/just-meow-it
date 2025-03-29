"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

const CatModel = () => {
    const { scene } = useGLTF("/cat_model/scene.gltf");  // public 폴더의 glTF 모델 로드
    return <primitive object={scene} scale={0.06} position={[0, -1, 0]} />;
};

const CatScene = () => {
    return (
        <Canvas camera={{ position: [0, 2, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <Suspense fallback={null}>
                <CatModel />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
};

export default CatScene;
