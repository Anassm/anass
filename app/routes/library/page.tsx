import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import Graph from "~/components/graph/graph";
import { OrbitControls } from "@react-three/drei";
import type { Route } from "./+types/page";
import { getAllReadMetaData } from "~/lib/read";
import type { IRead } from "~/lib/types";
import path from "path";

export async function loader() {
  return await getAllReadMetaData(path.join(process.cwd(), "data"));
}

export default function Library({ loaderData }: Route.ComponentProps) {
  const reads: IRead[] = loaderData;

  return (
    <div className={`flex-center container ${styles.container}`}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={10} color="red" position={[0, 0, 5]} />
        <Graph data={loaderData} />
      </Canvas>
    </div>
  );
}
