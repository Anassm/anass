import type { INode, INodeExtended, IEdgeExtended, IRead } from "~/lib/types";

export function buildNodes(data: IRead[]): INode[] {
  const rootNode: INode = {
    title: "Library page",
    type: "root",
    navigation: "/library",
    cluster: undefined,
    core: [],
    reference: [],
  };

  const contentNodes: INode[] = data.map((read) => ({
    title: read.title,
    type: read.type,
    navigation: `/library/${read.type}/${read.slug}`,
    cluster: read.metadata?.cluster,
    core: read.metadata?.core ?? [],
    reference: read.metadata?.reference ?? [],
  }));

  return [...contentNodes, rootNode];
}

export function buildEdges(nodes: INodeExtended[]): IEdgeExtended[] {
  const nodeMap = new Map<string, INodeExtended>();
  nodes.forEach((node) => nodeMap.set(node.title, node));

  const edges: IEdgeExtended[] = [];

  nodes.forEach((node) => {
    node.core?.forEach((targetTitle) => {
      const targetNode = nodeMap.get(targetTitle);
      if (targetNode) {
        edges.push({
          u: node,
          v: targetNode,
          type: "core",
          directional: true,
          start: node.position,
          end: targetNode.position,
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
          start: node.position,
          end: targetNode.position,
        });
      }
    });
  });

  return edges;
}
