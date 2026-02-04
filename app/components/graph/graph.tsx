import { useLibrary } from "~/routes/library/context";
import Node from "./node";

import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Plane, Raycaster, Vector3 } from "three";
import type { IEdge, INodeExtended } from "~/lib/types";
import { buildEdges, buildNodes } from "./graph.logic";

export default function Graph() {
  const data = useLibrary();

  const { gl } = useThree();

  const plane = useRef(new Plane(new Vector3(0, 0, 1), 20));
  const raycaster = useRef(new Raycaster());
  const dragging = useRef(false);
  const selectedNode = useRef<INodeExtended | null>(null);

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
  useFrame(({ mouse, camera }) => {
    const physics = physicsRef.current!;
    const edges = physics.edges;
    const nodes = physics.nodes;

    if (dragging.current && selectedNode.current) {
      raycaster.current.setFromCamera(mouse, camera);
      const intersection = raycaster.current.ray.intersectPlane(
        plane.current,
        new Vector3()
      );

      if (intersection) {
        const target = new Vector3(intersection.x, intersection.y, -20);
        selectedNode.current.position.lerp(target, 1);
      }
    }

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
          direction
            .clone()
            .multiplyScalar(
              physics.springStiffness * (1 - physics.springLength / magnitude)
            )
        );
        edges[e].v.velocity.add(
          direction
            .clone()
            .multiplyScalar(
              physics.springStiffness * (1 - physics.springLength / magnitude)
            )
        );
      }
    }

    // SMALL SPRINGS BETWEEN ALL
    for (let i = 0; i < nodes.length; i++) {
      for (let n = 0; n < nodes.length; n++) {
        const direction: Vector3 = nodes[n].position
          .clone()
          .sub(nodes[i].position);
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

  function handlePointerDown(node: INodeExtended) {
    selectedNode.current = node;
    dragging.current = true;
    gl.domElement.style.cursor = "grabbing";
  }

  function handlePointerUp() {
    dragging.current = false;
    selectedNode.current = null;
    gl.domElement.style.cursor = "pointer";
  }

  function handlePointerOver() {
    if (!dragging.current) gl.domElement.style.cursor = "pointer";
  }

  function handlePointerOut() {
    if (!dragging.current) gl.domElement.style.cursor = "auto";
  }

  return (
    <>
      {physicsRef.current.nodes.map((node) => (
        <Node
          key={node.navigation}
          node={node}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
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
