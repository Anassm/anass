import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import Graph from "~/components/graph/graph";
import { OrbitControls } from "@react-three/drei";

export default function Library() {
  return (
    <div className={`flex-center container ${styles.container}`}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={10} color="red" position={[0, 0, 5]} />
        <Graph />
      </Canvas>
    </div>
  );
}
