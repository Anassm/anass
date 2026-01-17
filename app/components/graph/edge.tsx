import { Line } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { IEdge } from "~/lib/types";

export default function Edge({ u, v, type }: IEdge) {
  const color =
    type === "core" ? "white" : type === "reference" ? "orange" : "gray";

  return <Line points={[u.position, v.position]} color={color} lineWidth={4} />;
}
