import type { IconType } from "react-icons";
import type { RouteObject } from "react-router";

export type NavLink = {
  label: string;
  path: string;
  icon?: IconType;
};

// Graph node
// A node will be a route people can interact and navigate to
export interface INode {
  readonly id: string;
  readonly value: RouteObject;
  readonly neighbors: readonly INode[];
}

// React Node component props
export type NodeProps = {
  node: INode;
  position: [number, number, number];
};
