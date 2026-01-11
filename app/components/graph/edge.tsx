import { Line } from "@react-three/drei";
import type { IEdgeExtended } from "~/lib/types";

export default function Edge({ start, end, type }: IEdgeExtended) {
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
