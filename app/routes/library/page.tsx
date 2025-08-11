import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import Graph from "~/components/graph/graph";

export default function Library() {
  return (
    <div className={`flex-center container ${styles.container}`}>
      {/* <span>This is a library</span> */}
      <Canvas>
        <Graph />
      </Canvas>
    </div>
  );
}
