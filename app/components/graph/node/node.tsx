import { Link, useNavigate, type RouteObject } from "react-router";
import type { INodeWithPosition } from "~/lib/types";

export default function Node({
  navigation,
  position,
  color,
}: INodeWithPosition) {
  const navigate = useNavigate();

  return (
    <mesh position={position} onClick={() => navigate(navigation)}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
