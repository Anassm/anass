import type { IconType } from "react-icons";
import type { Vector3 } from "three";

export type NavLink = {
  label: string;
  path: string;
  icon?: IconType;
};

// --- Library ---
export interface IRead {
  title: string;
  type: "blog" | "post" | "note" | "root";
  content: string;
  filename: string;
  slug: string;
  metadata?: {
    tags?: string[];
    cluster?: string;
    references?: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface INode {
  title: string;
  type: IRead["type"];
  navigation: string;
  cluster?: string;
  neighbors?: string[];
}

export interface IEdge {
  from: string;
  to: string;
  type: "core" | "reference";
  directional: boolean;
}

// React Node component props
export type NodeProps = {
  node: INode;
  position: Vector3;
  color: string;
};

// React Edge component props
export type EdgeProps = {
  start: Vector3;
  end: Vector3;
  type: IEdge["type"];
};
