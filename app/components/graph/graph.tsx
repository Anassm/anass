import styles from "./graph.module.css";
import Node from "./node/node";
import routes from "../../routes";
import type { INode } from "~/lib/types";
import type { RouteObject } from "react-router";

export default function Graph() {
  const nodes: INode[] = routes.map((route) => ({
    id: route.path ?? "unknown",
    value: route as RouteObject,
    neighbors: [],
  }));

  const displayNodes: React.ReactElement[] = nodes.map((node, index) => (
    <Node key={node.id} node={node} position={[index * 5, 0, 0]} />
  ));

  return <group>{displayNodes}</group>;
}
