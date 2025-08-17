import { Link, useNavigate, type RouteObject } from "react-router";
import type { NodeProps } from "~/lib/types";

export default function Node({ node, position, color }: NodeProps) {
  const navigate = useNavigate();

  return (
    <mesh position={position} onClick={() => navigate(node.navigation)}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
