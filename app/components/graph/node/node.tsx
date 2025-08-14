import type { RouteObject } from "react-router";
import type { NodeProps } from "~/lib/types";

export default function Node({ node, position }: NodeProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial />
    </mesh>
  );
}
