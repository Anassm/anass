import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Mesh, Plane, Raycaster, Vector2, Vector3 } from "three";
import type { INodeExtended } from "~/lib/types";

interface NodeProps {
  node: INodeExtended;
  onPointerDown: (node: INodeExtended) => void;
  onPointerUp: () => void;
  raycaster: Raycaster;
  plane: Plane;
}

export default function Node({
  node,
  onPointerDown,
  onPointerUp,
  raycaster,
  plane,
}: NodeProps) {
  const meshRef = useRef<Mesh>(null);
  const { camera, mouse } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(node.position);
    }
  });

  function handlePointerDown(e: any) {
    e.stopPropagation();

    onPointerDown(node);
  }

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={node.color} />
    </mesh>
  );
}
