import { Line } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { IEdge } from "~/lib/types";

export default function Edge({ u, v, type }: IEdge) {
  const lineRef = useRef<any>(null);
  const color =
    type === "core" ? "white" : type === "reference" ? "orange" : "gray";

  useFrame(() => {
    const line = lineRef.current;
    if (!line?.geometry?.setPositions) return;

    line.geometry.setPositions([
      u.position.x,
      u.position.y,
      u.position.z,
      v.position.x,
      v.position.y,
      v.position.z,
    ]);
    line.computeLineDistances?.();
  });

  return (
    <Line
      ref={lineRef}
      points={[u.position, v.position]}
      color={color}
      lineWidth={4}
    />
  );
}
