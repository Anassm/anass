import Node from "./node/node";
import type {
  IEdge,
  IEdgeWithPosition,
  INode,
  INodeWithPosition,
  IRead,
} from "~/lib/types";
import { Vector3 } from "three";
import { useLibrary } from "~/routes/library/context";
import Edge from "./edge/edge";
import React from "react";

export default function Graph() {
  const data: IRead[] = useLibrary();
  const height: number = 20;
  const width: number = 20;

  const rootNode: INode = {
    title: "Library page",
    type: "root",
    navigation: "/library",
    cluster: undefined,
    core: [],
    reference: [],
  };

  const nodes: INode[] = [
    ...data.map((read) => ({
      title: read.title,
      type: read.type,
      navigation: `/library/${read.type}/${read.slug}`,
      cluster: read.metadata?.cluster,
      core: read.metadata?.core ?? [],
      reference: read.metadata?.reference ?? [],
    })),
    rootNode,
  ];

  const renderNodes: INodeWithPosition[] = nodes.map((node) => ({
    ...node,
    position: new Vector3(
      Math.random() * width - width / 2,
      Math.random() * height - height / 2,
      -20
    ),
    color: node.type === "root" ? "purple" : "blue",
  }));

  const nodeMap = new Map<string, INodeWithPosition>();
  renderNodes.forEach((node) => {
    nodeMap.set(node.title, node);
  });

  const renderEdges: IEdgeWithPosition[] = [];

  renderNodes.forEach((node) => {
    // Core edges
    node.core?.forEach((targetTitle) => {
      const targetNode = nodeMap.get(targetTitle);
      if (targetNode) {
        renderEdges.push({
          u: node,
          v: targetNode,
          type: "core",
          directional: true,
          start: node.position,
          end: targetNode.position,
        });
      }
    });

    // Reference edges
    node.reference?.forEach((targetTitle) => {
      const targetNode = nodeMap.get(targetTitle);
      if (targetNode) {
        renderEdges.push({
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

  return (
    <>
      {renderNodes.map((node) => (
        <Node key={node.navigation} {...node} />
      ))}

      {renderEdges.map((edge, index) => (
        <Edge key={index} {...edge} />
      ))}
    </>
  );
}
