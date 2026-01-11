import { Line } from "@react-three/drei";
import type { IEdgeWithPosition } from "~/lib/types";

export default function Edge({ start, end, type }: IEdgeWithPosition) {
  const color =
    type === "core" ? "white" : type === "reference" ? "orange" : "gray";

  return (
    <Line
      points={[start.toArray(), end.toArray()]}
      color={color}
      lineWidth={4}
      dashed={false}
    />
  );
}
