import type { RouteObject } from "react-router";
import type { NodeProps } from "~/lib/types";
import styles from "./node.module.css";

export default function Node<T extends RouteObject | string>({
  node,
  position,
  onClick,
}: NodeProps<T> & {
  position: [number, number, number];
  onClick?: () => void;
}) {
  return (
    <>
      <span>This is a node</span>
    </>
  );
}
