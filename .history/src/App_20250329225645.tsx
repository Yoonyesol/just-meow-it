import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CatModel from "./components/CatModel";
import AdviceButton from "./components/AdviceButton";
import AdviceText from "./components/AdviceText";
import { useState } from "react";
import { getRandomAdvice } from "./hooks/useRandomAdvice";

function App() {
  const [advice, setAdvice] = useState("");

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <Canvas className="w-full h-3/4">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <CatModel />
        <OrbitControls />
      </Canvas>
      <AdviceText advice={advice} />
      <AdviceButton onClick={() => setAdvice(getRandomAdvice())} />
    </div>
  );
}

export default App;
