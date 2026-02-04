import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import type { INodeExtended } from "~/lib/types";

interface NodeProps {
  node: INodeExtended;
  onPointerDown: (node: INodeExtended) => void;
  onPointerUp: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

export default function Node({
  node,
  onPointerDown,
  onPointerUp,
  onPointerOver,
  onPointerOut,
}: NodeProps) {
  const meshRef = useRef<Mesh>(null);
  const moved = useRef(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(node.position);
    }
  });

  function handlePointerDown(e: any) {
    e.stopPropagation();

    onPointerDown(node);
  }

  function handlePointerOver(e: any) {
    e.stopPropagation();

    onPointerOver();
  }

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerUp={onPointerUp}
      onPointerOver={handlePointerOver}
      onPointerOut={onPointerOut}
      onClick={() => console.log("test")}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={node.color} />
    </mesh>
  );
}
