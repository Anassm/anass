import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { Mesh } from "three";
import type { INodeExtended } from "~/lib/types";
import styles from "../graph/graph.module.css";

interface NodeProps {
  node: INodeExtended;
  onPointerDown: (node: INodeExtended) => void;
  onPointerUp: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

export default function Node({
  node,
  onPointerDown,
  onPointerUp,
  onPointerOver,
  onPointerOut,
}: NodeProps) {
  const meshRef = useRef<Mesh>(null);
  const navigate = useNavigate();

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const hasDragged = useRef(false);
  const DRAG_THRESHOLD = 5;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(node.position);
    }
  });

  function handlePointerDown(e: any) {
    e.stopPropagation();

    e.target.setPointerCapture(e.pointerId);

    pointerStart.current = {
      x: e.clientX,
      y: e.clientY,
    };

    hasDragged.current = false;

    onPointerDown(node);
  }

  function handlePointerMove(e: any) {
    if (!pointerStart.current) return;

    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;

    const distance = Math.hypot(dx, dy);

    // If user moved far enough then its officially a drag
    if (distance > DRAG_THRESHOLD) {
      hasDragged.current = true;
    }
  }

  function handlePointerUp(e: any) {
    e.stopPropagation();

    e.target.releasePointerCapture(e.pointerId);

    pointerStart.current = null;

    onPointerUp();
  }

  function handlePointerOver(e: any) {
    e.stopPropagation();

    onPointerOver();
  }

  function handleClick() {
    if (hasDragged.current) {
      hasDragged.current = false;
      return;
    }

    navigate("/" + node.navigation);
  }

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerOut={onPointerOut}
      onClick={handleClick}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={node.color} />

      <Html position={[-5.15, -1, 0]} className={styles.html}>
        <span>{node.title}</span>
      </Html>
    </mesh>
  );
}
