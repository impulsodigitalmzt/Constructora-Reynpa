"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type ObraState,
  defaultObraState,
  readObraState,
  writeObraState,
} from "@/lib/obra-store";

export function useObraStore() {
  const [state, setState] = useState<ObraState>(() =>
    typeof window === "undefined" ? defaultObraState() : readObraState(),
  );
  const [ready] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    const sync = () => setState(readObraState());
    window.addEventListener("storage", sync);
    window.addEventListener("reypa-obra-updated", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("reypa-obra-updated", sync as EventListener);
    };
  }, []);

  const save = useCallback((next: ObraState | ((prev: ObraState) => ObraState)) => {
    setState((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      const withStamp = { ...resolved, updatedAt: new Date().toISOString() };
      writeObraState(withStamp);
      return withStamp;
    });
  }, []);

  return { state, ready, save };
}
