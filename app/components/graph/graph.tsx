import { useLibrary } from "~/routes/library/context";
import Edge from "./edge";
import Node from "./node";

import { applyRandomLayout } from "./graph.layout";
import { buildEdges, buildNodes } from "./graph.logic";

export default function Graph() {
  const data = useLibrary();

  const nodes = buildNodes(data);
  const positionedNodes = applyRandomLayout(nodes);
  const edges = buildEdges(positionedNodes);

  return (
    <>
      {positionedNodes.map((node) => (
        <Node key={node.navigation} {...node} />
      ))}

      {edges.map((edge, index) => (
        <Edge key={index} {...edge} />
      ))}
    </>
  );
}
