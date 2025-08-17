import Node from "./node/node";
import type { INode, IRead } from "~/lib/types";
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
    neighbors: [],
  };
  const nodes: INode[] = data.map((read) => ({
    title: read.title,
    type: read.type,
    navigation: "/library/" + read.type + "/" + read.slug,
    cluster: read.metadata?.cluster,
    neighbors: [],
  }));
  nodes.push(rootNode);

  const displayNodes: React.ReactElement[] = nodes.map((node) => {
    if (node.type === "root") {
      return (
        <React.Fragment key={node.title}>
          <Node
            key={node.title}
            node={node}
            position={
              new Vector3(
                Math.random() * width - width / 2,
                Math.random() * height - height / 2,
                -20
              )
            }
            color="purple"
          />
        </React.Fragment>
      );
    }

    return (
      <Node
        key={node.title}
        node={node}
        position={
          new Vector3(
            Math.random() * width - width / 2,
            Math.random() * height - height / 2,
            -20
          )
        }
        color="blue"
      />
    );
  });

  return (
    <>
      <group>{displayNodes}</group>
    </>
  );
}
