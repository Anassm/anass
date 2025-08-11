import type { IconType } from "react-icons";
import type { RouteObject } from "react-router";

export type NavLink = {
  label: string;
  path: string;
  icon?: IconType;
};

// Graph node
// A node will be a route people can interact and navigate to
// Keeping the possibility open to have a fun node by allowing string value
export interface INode<T extends RouteObject | string> {
  readonly id: string;
  readonly value: T;
  readonly neighbors: readonly INode<T>[];
}

// React Node component props
export type NodeProps<T extends RouteObject | string> = {
  node: INode<T>;
  position: [number, number, number];
  onClick?: () => void;
};
