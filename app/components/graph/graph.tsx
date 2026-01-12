import { useLibrary } from "~/routes/library/context";
import Node from "./node";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { IEdgeExtended, INodeExtended } from "~/lib/types";
import { buildEdges, buildNodes } from "./graph.logic";

export default function Graph() {
  const data = useLibrary();

  const physicsRef = useRef<{
    nodes: INodeExtended[];
    edges: IEdgeExtended[];
  } | null>(null);

  if (!physicsRef.current) {
    const nodes: INodeExtended[] = buildNodes(data);
    const edges: IEdgeExtended[] = buildEdges(nodes);

    physicsRef.current = { nodes, edges };
  }

  const [, setTick] = useState(0); // <----
  useFrame((_, delta) => {
    const physics = physicsRef.current!;

    physics.nodes.forEach((node) => {
      node.position.x += 1;
    });

    setTick((tick) => tick + 1); // <----
  });

  return (
    <>
      {physicsRef.current.nodes.map((node) => (
        <Node key={node.navigation} {...node} />
      ))}

      {physicsRef.current.edges.map((edge, index) => (
        <Line
          key={index}
          points={[edge.u.position.clone(), edge.v.position.clone()]}
          color={edge.type === "core" ? "white" : "orange"}
          lineWidth={4}
        />
      ))}
    </>
  );
}
