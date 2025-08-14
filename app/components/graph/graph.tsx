import Node from "./node/node";
import type { INode, IRead } from "~/lib/types";
import { Vector3 } from "three";

export default function Graph({ data }: { data: IRead[] }) {
  console.log(data);
  const height: number = 20;
  const width: number = 20;

  const nodes: INode[] = data.map((read) => ({
    id: read.id,
    type: read.type,
    title: read.title,
    cluster: read.metadata?.cluster,
    neighbors: [],
  }));

  const displayNodes: React.ReactElement[] = nodes.map((node) => (
    <Node
      key={node.id}
      node={node}
      position={
        new Vector3(
          Math.random() * width - width / 2,
          Math.random() * height - height / 2,
          -20
        )
      }
    />
  ));

  return (
    <>
      <group>{displayNodes}</group>
    </>
  );
}
