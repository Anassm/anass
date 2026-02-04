import { Canvas, useThree } from "@react-three/fiber";
import path from "path";
import { useMemo } from "react";
import { href, Link } from "react-router";
import Graph from "~/components/graph/graph";
import { getAllReadMetaData } from "~/lib/read";
import type { IRead } from "~/lib/types";
import type { Route } from "./+types/page";
import { LibraryProvider } from "./context";
import styles from "./page.module.css";
import { OrbitControls } from "@react-three/drei";

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
        <div className={styles.list}>
          <div className={styles.heading}>
            <h1>All my posts</h1>
            <div className={styles.filters}>
              <label htmlFor="note">Note</label>
              <input type="checkbox" />
              <label htmlFor="blog">Blog</label>
              <input type="checkbox" />
            </div>
          </div>
          {allReads}
        </div>
        <Canvas className={styles.canvas}>
          <OrbitControls enableRotate={false} />

          <gridHelper
            args={[35, 5]}
            rotation={[Math.PI / 1.95, 1.5, 0]}
            position={[0, 0, -25]}
          />

          <Graph />

          <ambientLight intensity={1} />
          <directionalLight intensity={10} color="white" position={[0, 0, 5]} />
        </Canvas>
      </div>
    </LibraryProvider>
  );
}
