import { useLibrary } from "~/routes/library/context";
import Node from "./node";
import Edge from "./edge";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Plane, Raycaster, Vector3 } from "three";
import type { IEdge, INodeExtended } from "~/lib/types";
import { buildEdges, buildNodes } from "./graph.logic";

export default function Graph() {
  const data = useLibrary();
  const { gl } = useThree();

  const graphGroup = useRef<Group>(null!);

  const plane = useRef(new Plane(new Vector3(0, 0, 1), 20));
  const raycaster = useRef(new Raycaster());
  const dragging = useRef(false);
  const selectedNode = useRef<INodeExtended | null>(null);

  const physicsRef = useRef<{
    nodes: INodeExtended[];
    edges: IEdge[];
    springLengthCore: number;
    springLengthReference: number;
    springStiffnessCore: number;
    springStiffnessReference: number;
    repulsionStrength: number;
    centerStrength: number;
    damping: number;
    maxSpeed: number;
    nodeRadius: number;
    collisionPadding: number;
    dragStrength: number;
    rootAnchorStrength: number;
    rootReturnStrength: number;
    integrationStep: number;
  } | null>(null);

  if (!physicsRef.current) {
    const nodes: INodeExtended[] = buildNodes(data);
    const edges: IEdge[] = buildEdges(nodes);

    physicsRef.current = {
      nodes,
      edges,
      springLengthCore: 7,
      springLengthReference: 9,
      springStiffnessCore: 1.3,
      springStiffnessReference: 0.7,
      repulsionStrength: 110,
      centerStrength: 0.5,
      damping: 0.97,
      maxSpeed: 55,
      nodeRadius: 1,
      collisionPadding: 1.3,
      dragStrength: 32,
      rootAnchorStrength: 6,
      rootReturnStrength: 0.2,
      integrationStep: 1 / 60,
    };
  }

  useFrame(({ mouse, camera }, delta) => {
    const physics = physicsRef.current!;
    const edges = physics.edges;
    const nodes = physics.nodes;
    const dt = Math.min(delta, 1 / 30);

    const separation = new Vector3();
    const axis = new Vector3();
    const centerForce = new Vector3();
    const overlapPush = new Vector3();
    const linkDelta = new Vector3();
    const rootTarget = new Vector3(0, 0, -20);

    if (dragging.current && selectedNode.current) {
      raycaster.current.setFromCamera(mouse, camera);
      const intersection = raycaster.current.ray.intersectPlane(
        plane.current,
        new Vector3()
      );

      if (intersection) {
        const draggedNode = selectedNode.current;
        const target = new Vector3(intersection.x, intersection.y, -20);

        // Keep drag snappy by moving directly toward pointer and preserving
        // some velocity so release still feels physical.
        draggedNode.position.lerp(target, 0.38);
        linkDelta.subVectors(target, draggedNode.position);
        draggedNode.velocity.addScaledVector(linkDelta, physics.dragStrength * dt);
      }
    }

    // Pairwise repulsion and overlap correction.
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];

        separation.subVectors(a.position, b.position);
        let distSq = separation.lengthSq();

        if (distSq < 0.0001) {
          separation.set((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, 0);
          distSq = separation.lengthSq();
        }

        const dist = Math.sqrt(distSq);
        axis.copy(separation).divideScalar(dist);

        const repulse = (physics.repulsionStrength * dt) / (distSq + 0.15);
        a.velocity.addScaledVector(axis, repulse);
        b.velocity.addScaledVector(axis, -repulse);

        const minDist = physics.nodeRadius * 2 + physics.collisionPadding;
        if (dist < minDist) {
          const penetration = minDist - dist;
          overlapPush.copy(axis).multiplyScalar(penetration * 0.5);

          a.position.add(overlapPush);
          b.position.sub(overlapPush);

          a.velocity.addScaledVector(axis, penetration * 3.2 * dt);
          b.velocity.addScaledVector(axis, -penetration * 3.2 * dt);
        }
      }
    }

    // Spring constraints for graph links.
    for (let e = 0; e < edges.length; e++) {
      const edge = edges[e];
      const restLength =
        edge.type === "core"
          ? physics.springLengthCore
          : physics.springLengthReference;
      const stiffness =
        edge.type === "core"
          ? physics.springStiffnessCore
          : physics.springStiffnessReference;

      linkDelta.subVectors(edge.v.position, edge.u.position);
      const length = linkDelta.length();

      if (length > 0.0001) {
        axis.copy(linkDelta).divideScalar(length);
        const stretch = length - restLength;
        const impulse = stretch * stiffness * dt;

        edge.u.velocity.addScaledVector(axis, impulse);
        edge.v.velocity.addScaledVector(axis, -impulse);
      }
    }

    // Keep graph around origin for readability.
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      centerForce.copy(node.position).setZ(0).multiplyScalar(-physics.centerStrength * dt);
      node.velocity.add(centerForce);

      if (node.type === "root") {
        linkDelta.subVectors(rootTarget, node.position);
        node.velocity.addScaledVector(linkDelta, physics.rootAnchorStrength * dt);
      }
    }

    // Integrate velocity with damping and speed cap.
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node === selectedNode.current && dragging.current) {
        node.velocity.multiplyScalar(0.9);
      } else {
        node.velocity.multiplyScalar(Math.pow(physics.damping, dt / physics.integrationStep));
      }

      const speed = node.velocity.length();
      if (speed > physics.maxSpeed) {
        node.velocity.multiplyScalar(physics.maxSpeed / speed);
      }

      node.position.addScaledVector(node.velocity, dt);
      node.position.z = -20;

      if (node.type === "root") {
        node.position.lerp(rootTarget, physics.rootReturnStrength);
      }
    }
  });

  function handlePointerDown(node: INodeExtended) {
    if (node.type === "root") return;

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
    <group ref={graphGroup}>
      <gridHelper
        args={[35, 5]}
        rotation={[Math.PI / 1.95, 1.5, 0]}
        position={[0, 0, -25]}
      />

      {physicsRef.current.nodes.map((node) => {
        return (
          <Node
            key={node.navigation}
            node={node}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
        );
      })}

      {physicsRef.current.edges.map((edge, index) => (
        <Edge
          key={index}
          u={edge.u}
          v={edge.v}
          type={edge.type}
          directional={edge.directional}
        />
      ))}
    </group>
  );
}
