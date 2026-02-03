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
    core?: string[];
    reference?: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface INode {
  title: string;
  type: IRead["type"];
  navigation: string;
  cluster?: string;
  core?: string[];
  reference?: string[];
}

export interface INodeExtended extends INode {
  position: Vector3;
  velocity: Vector3;
  color: string;
  isDragging: boolean;
}

export interface IEdge {
  u: INodeExtended;
  v: INodeExtended;
  type: "core" | "reference";
  directional: boolean;
}
