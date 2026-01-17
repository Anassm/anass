import { Vector3 } from "three";
import type { IEdge, INodeExtended, IRead } from "~/lib/types";

export function buildNodes(data: IRead[]): INodeExtended[] {
  const rootNode: INodeExtended = {
    title: "Library page",
    type: "root",
    navigation: "/library",
    cluster: undefined,
    core: [],
    reference: [],
    position: new Vector3(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      -20
    ),
    velocity: new Vector3(),
    color: "purple",
  };

  const contentNodes: INodeExtended[] = data.map((read) => ({
    title: read.title,
    type: read.type,
    navigation: `/library/${read.type}/${read.slug}`,
    cluster: read.metadata?.cluster,
    core: read.metadata?.core ?? [],
    position: new Vector3(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      -20
    ),
    velocity: new Vector3(),
    color: "blue",
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
