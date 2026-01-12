import { Line } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { IEdgeExtended } from "~/lib/types";

export default function Edge({ start, end, type }: IEdgeExtended) {
  const color =
    type === "core" ? "white" : type === "reference" ? "orange" : "gray";

  return <Line points={[start, end]} color={color} lineWidth={4} />;
}
