import { useNavigate } from "react-router";
import type { INodeExtended } from "~/lib/types";

export default function Node({ navigation, position, color }: INodeExtended) {
  const navigate = useNavigate();

  return (
    <mesh position={position} onClick={() => navigate(navigation)}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
