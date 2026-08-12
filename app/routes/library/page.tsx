import { Canvas } from "@react-three/fiber";
import path from "path";
import { useMemo, useState } from "react";
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
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const filteredReads = useMemo(() => {
    if (filters.length === 0) return loaderData;
    return loaderData.filter((read) => filters.includes(read.type));
  }, [loaderData, filters]);

  function toggleFilter(type: string) {
    setFilters((prev) =>
      prev.includes(type)
        ? prev.filter((filter) => filter !== type)
        : [...prev, type],
    );
  }

  const allReads: React.ReactElement<IRead>[] = filteredReads.map((read) => (
    <div
      key={read.filename}
      className={styles.read}
      style={{
        color:
          read.type == "note"
            ? "#ac79ff"
            : read.type == "blog"
              ? "#d6af02"
              : "#3d85f1",
      }}
    >
      <Link
        to={href("/library/:type/:slug", {
          type: read.type,
          slug: read.slug,
        })}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>
            {read.title} | {read.type}
          </h2>
        </header>

        <div className={styles.meta}>
          <span>Created: {read.metadata?.createdAt}</span> <br />
          <span>Cluster: {read.metadata?.cluster}</span> <br />
          <span>Tags: {read.metadata?.tags}</span>
        </div>
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
              <span>Filter: </span>
              <label htmlFor="note">Note</label>
              <input
                id="note"
                type="checkbox"
                checked={filters.includes("note")}
                onChange={() => toggleFilter("note")}
              />
              <label htmlFor="blog">Blog</label>
              <input
                id="blog"
                type="checkbox"
                checked={filters.includes("blog")}
                onChange={() => toggleFilter("blog")}
              />
              <label htmlFor="post">Post</label>
              <input
                id="post"
                type="checkbox"
                checked={filters.includes("post")}
                onChange={() => toggleFilter("post")}
              />
            </div>
            <input
              className={styles.search}
              type="text"
              placeholder="Search for posts..."
            />
          </div>
          {allReads}
        </div>

        <Canvas className={styles.canvas}>
          {/* <OrbitControls /> */}

          <Graph />

          <ambientLight intensity={1} />
          <directionalLight intensity={10} color="white" position={[0, 0, 5]} />
        </Canvas>
      </div>
    </LibraryProvider>
  );
}
