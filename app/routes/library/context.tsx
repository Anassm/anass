import React, { createContext, useContext } from "react";
import type { IRead } from "~/lib/types";

const LibraryContext = createContext<IRead[]>([]);

export function LibraryProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: IRead[];
}) {
  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}
