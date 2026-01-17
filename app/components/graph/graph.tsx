import { useLibrary } from "~/routes/library/context";
import Node from "./node";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import type { IEdge, INodeExtended } from "~/lib/types";
import { buildEdges, buildNodes } from "./graph.logic";

export default function Graph() {
  const data = useLibrary();

  const physicsRef = useRef<{
    nodes: INodeExtended[];
    edges: IEdge[];
    springLength: number;
    springStiffness: number;
    smallSpringLength: number;
    smallSpringStiffness: number;
    velocityCutoff: number;
  } | null>(null);

  if (!physicsRef.current) {
    const nodes: INodeExtended[] = buildNodes(data);
    const edges: IEdge[] = buildEdges(nodes);

    physicsRef.current = {
      nodes,
      edges,
      springLength: 7,
      springStiffness: 1,
      smallSpringLength: 4,
      smallSpringStiffness: 0.5,
      velocityCutoff: 0.01,
    };
  }

  const [tick, setTick] = useState(0); // <----
  useFrame((_, delta) => {
    const physics = physicsRef.current!;
    const edges = physics.edges;
    const nodes = physics.nodes;

    // DAMPING
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].velocity.divideScalar(2);
    }

    // SPRING FORCE
    for (let e = 0; e < edges.length; e++) {
      const direction: Vector3 = edges[e].u.position
        .clone()
        .sub(edges[e].v.position);
      const magnitude: number = direction.length();
      if (magnitude) {
        edges[e].u.velocity.sub(
          direction.clone().multiplyScalar(
            physics.springStiffness * (1 - physics.springLength / magnitude)
          )
        );
        edges[e].v.velocity.add(
          direction.clone().multiplyScalar(
            physics.springStiffness * (1 - physics.springLength / magnitude)
          )
        );
      }
    }

    // SMALL SPRINGS BETWEEN ALL
    for (let i = 0; i < nodes.length; i++) {
      for (let n = 0; n < nodes.length; n++) {
        const direction: Vector3 = nodes[n].position.clone().sub(nodes[i].position);
        const magnitude: number = direction.length();
        if (magnitude && magnitude < physics.smallSpringLength) {
          nodes[i].velocity.add(
            direction.multiplyScalar(
              physics.smallSpringStiffness *
                (1 - physics.smallSpringLength / magnitude)
            )
          );
          nodes[n].velocity.sub(
            direction.multiplyScalar(
              physics.smallSpringStiffness *
                (1 - physics.smallSpringLength / magnitude)
            )
          );
        }
      }
    }

    // ADD VELOCITY
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].velocity.length() > physics.velocityCutoff) {
        nodes[i].position.add(nodes[i].velocity.clone().multiplyScalar(0.005));
      }
    }

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
