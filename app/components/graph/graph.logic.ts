import { Vector3 } from "three";
import type { IEdge, INodeExtended, IRead } from "~/lib/types";

function createInitialPosition(index: number, total: number): Vector3 {
  // Phyllotaxis spreads nodes evenly in a disk and avoids random clumps.
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const normalized = (index + 1) / Math.max(total, 1);
  const radius = 3 + Math.sqrt(normalized) * 11;
  const angle = index * goldenAngle;

  return new Vector3(
    Math.cos(angle) * radius + (Math.random() - 0.5) * 0.8,
    Math.sin(angle) * radius + (Math.random() - 0.5) * 0.8,
    -20
  );
}

export function buildNodes(data: IRead[]): INodeExtended[] {
  const rootNode: INodeExtended = {
    title: "Library page",
    type: "root",
    navigation: "/library",
    cluster: undefined,
    core: [],
    reference: [],
    position: new Vector3(0, 0, -20),
    velocity: new Vector3(),
    color: "purple",
    isDragging: false,
  };

  const contentNodes: INodeExtended[] = data.map((read, index) => ({
    title: read.title,
    type: read.type,
    navigation: `/library/${read.type}/${read.slug}`,
    cluster: read.metadata?.cluster,
    core: read.metadata?.core ?? [],
    reference: read.metadata?.reference ?? [],
    position: createInitialPosition(index, data.length),
    velocity: new Vector3(),
    color: "blue",
    isDragging: false,
  }));

  return [...contentNodes, rootNode];
}

export function buildEdges(nodes: INodeExtended[]): IEdge[] {
  const nodeMap = new Map<string, INodeExtended>();
  nodes.forEach((node) => nodeMap.set(node.title, node));

  const edges: IEdge[] = [];

  nodes.forEach((node) => {
    node.core?.forEach((targetTitle) => {
      const targetNode = nodeMap.get(targetTitle);
      if (targetNode) {
        edges.push({
          u: node,
          v: targetNode,
          type: "core",
          directional: true,
        });
      }
    });

    node.reference?.forEach((targetTitle) => {
      const targetNode = nodeMap.get(targetTitle);
      if (targetNode) {
        edges.push({
          u: node,
          v: targetNode,
          type: "reference",
          directional: true,
        });
      }
    });
  });

  return edges;
}
