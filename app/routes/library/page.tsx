import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import Graph from "~/components/graph/graph";
import { OrbitControls } from "@react-three/drei";
import type { Route } from "./+types/page";
import { getAllReadMetaData } from "~/lib/read";
import type { IRead } from "~/lib/types";
import path from "path";
import { LibraryProvider } from "./context";
import { href, Link } from "react-router";

export async function loader() {
  return await getAllReadMetaData(path.join(process.cwd(), "data"));
}

export default function Library({ loaderData }: Route.ComponentProps) {
  const allReads: React.ReactElement<IRead>[] = loaderData.map((read) => (
    <div key={read.filename} className={styles.read}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          {read.title} | {read.type}
        </h2>
      </header>

      <div className={styles.meta}>
        <span>
          <b>Created:</b> {read.metadata?.createdAt}
        </span>{" "}
        <br />
        <span>
          <b>Cluster:</b> {read.metadata?.cluster}
        </span>{" "}
        <br />
        <span>
          <b>Tags:</b> {read.metadata?.tags}
        </span>
      </div>

      <Link
        to={href("/library/:type/:slug", { type: read.type, slug: read.slug })}
        className={styles.link}
      >
        Read →
      </Link>
    </div>
  ));

  return (
    <LibraryProvider value={loaderData}>
      <div className={`container--sidebar ${styles.container}`}>
        <div className={styles.list}>{allReads}</div>
        <Canvas className={styles.canvas}>
          <OrbitControls />

          <gridHelper
            args={[35, 5]}
            rotation={[Math.PI / 1.95, 1.5, 0]}
            position={[0, 0, -25]}
          />

          <ambientLight intensity={1.75} />
          <directionalLight intensity={10} color="white" position={[0, 0, 5]} />
          <Graph />
        </Canvas>
      </div>
    </LibraryProvider>
  );
}
