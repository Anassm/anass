import type { EdgeProps } from "~/lib/types";

export default function Edge({ start, end, type }: EdgeProps) {
  const vertices = new Float32Array([...start, ...end]);

  const color =
    type === "core" ? "white" : type === "reference" ? "orange" : "gray";

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[vertices, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} />
    </lineSegments>
  );
}
