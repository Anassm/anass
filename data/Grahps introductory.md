---
type: note
createdAt: 10/08/2026 20:00:27
title: Graphs Introductory
tags: [learning]
cluster: "datastructures"
---

# Layman's Definition of a Graph

A **network** that helps define and visualize relationships between various components.

## Definitions

A graph `G = (V, E)` consists of:

- A set of **vertices** `V`
- A set of **edges** `E`, where each edge `(u, v)` represents a connection between vertices `u, v ∈ V`.

## Terminology

### Neighbors

Vertices `u` and `v` are **neighbors** if an edge `(u, v)` connects them.

- **Example**: Vertices `1` and `8` are neighbors. The neighbors of vertex `0` are `neighbors(0) = {4, 6, 8}`.

### Degree

The **degree** of a vertex `v`, denoted `degree(v)`, is the number of edges connected to `v`.

- **Example**: `degree(0) = 3`, `degree(3) = 2`.

### Path

A **path** is a sequence of vertices connected by edges.

- **Example**: `0 -> 6 -> 7 -> 3 -> 2` is a path.

### Path Length

The **path length** is the number of edges in a path.

- **Example**: The path `0 -> 6 -> 7 -> 3 -> 2` has a length of `4`.

### Cycle

A **cycle** is a path that starts and ends at the same vertex.

- **Example**: `0 -> 8 -> 1 -> 5 -> 4 -> 0` is a cycle.

### Connectivity

Connectivity has multiple contexts:

1. **Vertex Connectivity**: Two vertices are **connected** if a path exists between them.
2. **Graph Connectivity**: A graph is **connected** when all vertices are connected.
3. **Connected Component**: A subset of vertices `Vi ⊆ V` that is connected.
   - **Example**: `V1 = {0, 4, 6, 7, 8}`, `V2 = {1, 2, 3, 5}`. Both are from the same graph.

## Types of Graphs

- **Undirected Graph**: An edge `(u, v)` implies `(v, u)`.
- **Directed Graph**: Edges are unidirectional.
  - **Directed (Cyclic) Graph**: Directed and contains at least one cycle.
  - **Directed Acyclic Graph (DAG)**: Directed with no cycles.
- **Weighted Graph**: Edges have weights, and some may have larger weights than others.
- **Tree Graphs**: Graphs with three key properties:
  - Connected and acyclic.
  - Removing an edge disconnects the graph.
  - Adding an edge creates a cycle.

## Graph Representations

- **Adjacency Matrix**: A matrix where `Aij = 1` if an edge `(i, j)` exists, `0` otherwise.
- **Edge Set**: Contains all information about edges and vertices in a graph.
  - **Example**: `{(0,1), (0,2), (0,3), (1,3), (2,3), (3,4)}`.
  - **Note**: Not commonly used because extracting data is challenging.
- **Adjacency List**: The most common representation. Each vertex maps to a list of its neighbors.
  - **Advantage**: Easy access to neighbors, useful for graph algorithms.
  - **Real-world context**: Leverages the fact that most vertices have relatively few edges (e.g., in a social media network with billions of vertices, each vertex typically has only a few thousand edges).

## Interesting Problems

- Does a path exist between vertices `s` and `t`?
- What is the path of least length between vertices `s` and `t`?
- Does the graph contain cycles?
- Given a set of `k` colors, can we assign colors to each vertex so that no two neighbors have the same color?
- Does a path exist that uses every edge exactly once?
- Does a path exist that uses every vertex exactly once?
  - **Consensus**: No efficient algorithms exist for this problem.

## Source

**Introduction to Graph Theory: A Computer Science Perspective**  
(https://www.youtube.com/watch?v=LFKZLXVO-Dg)
