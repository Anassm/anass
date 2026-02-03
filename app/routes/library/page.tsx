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

export async function loader() {
  return await getAllReadMetaData(path.join(process.cwd(), "data"));
}

export default function Library({ loaderData }: Route.ComponentProps) {
  function ResponsiveScene({ children }: { children: React.ReactNode }) {
    const { size } = useThree();

    // compute a scale factor based on the viewport width
    const scale = useMemo(() => Math.min(size.width / 1200, 1), [size.width]);

    return <group scale={[scale, scale, scale]}>{children}</group>;
  }

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
          {/* <OrbitControls /> */}

          <ResponsiveScene>
            <gridHelper
              args={[35, 5]}
              rotation={[Math.PI / 1.95, 1.5, 0]}
              position={[0, 0, -25]}
            />

            <Graph />
          </ResponsiveScene>

          <ambientLight intensity={1} />
          <directionalLight intensity={10} color="white" position={[0, 0, 5]} />
        </Canvas>
      </div>
    </LibraryProvider>
  );
}
