import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Mesh } from "three";
import type { INodeExtended } from "~/lib/types";

export default function Node({ navigation, position, color }: INodeExtended) {
  const navigate = useNavigate();
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(position);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerDown={(e) => console.log(e)}
      onClick={() => navigate(navigation)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
