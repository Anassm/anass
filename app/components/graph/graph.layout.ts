import { Vector3 } from "three";
import type { INode, INodeExtended } from "~/lib/types";

export function applyRandomLayout(
  nodes: INode[],
  width = 20,
  height = 20
): INodeExtended[] {
  return nodes.map((node) => ({
    ...node,
    position: new Vector3(
      Math.random() * width - width / 2,
      Math.random() * height - height / 2,
      -20
    ),
    color: node.type === "root" ? "purple" : "blue",
  }));
}

// Forces

// 1. Attraction along edges, keeping distance between connected nodes. Spring effect -> nodes further away? Stronger pull.
// 2. Nodes should not overlap, they push away from each other.
// 3. Keeping overlay centered.
