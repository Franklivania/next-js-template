"use client";

import { useEffect, useMemo, useCallback } from "react";
import { createStore } from "zustand/vanilla";
import { useStore as useZustandStore } from "zustand";

// Single, lightweight global store for boolean toggles keyed by a unique string
export const toggleStore = createStore((set, get) => ({
  toggles: {},

  setValue: (key, value) =>
    set((state) => ({ toggles: { ...state.toggles, [key]: !!value } })),

  open: (key) =>
    set((state) => ({ toggles: { ...state.toggles, [key]: true } })),

  close: (key) =>
    set((state) => ({ toggles: { ...state.toggles, [key]: false } })),

  toggle: (key) =>
    set((state) => {
      const current = !!state.toggles[key];
      return { toggles: { ...state.toggles, [key]: !current } };
    }),

  reset: (key) =>
    set((state) => {
      const { [key]: _removed, ...rest } = state.toggles;
      return { toggles: rest };
    }),
}));

const makeScopedKey = (id, scope) => (scope ? `${scope}:${id}` : `${id}`);
const storageKeyFor = (scopedKey) => `toggle:${scopedKey}`;

/**
 * React hook: unique toggle controller with optional per-key persistence
 *
 * @param {string} id - unique identifier within a scope
 * @param {{ defaultOpen?: boolean, persist?: boolean, scope?: string }} options
 */
export function useToggleController(id, options = {}) {
  const { defaultOpen = false, persist = false, scope = "global" } = options;

  const key = useMemo(() => makeScopedKey(id, scope), [id, scope]);
  const storageKey = useMemo(() => storageKeyFor(key), [key]);

  // Hydrate initial value either from persisted storage or default
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (persist) {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) {
        toggleStore.getState().setValue(key, raw === "1");
        return;
      }
    }

    // Initialize with default if not already set
    const current = toggleStore.getState().toggles[key];
    if (typeof current === "undefined") {
      toggleStore.getState().setValue(key, !!defaultOpen);
    }
  }, [key, storageKey, persist, defaultOpen]);

  const isOpen = useZustandStore(toggleStore, (s) => !!s.toggles[key]);

  const persistIfNeeded = useCallback(
    (value) => {
      if (!persist || typeof window === "undefined") return;
      try {
        window.localStorage.setItem(storageKey, value ? "1" : "0");
      } catch {}
    },
    [persist, storageKey]
  );

  const open = useCallback(() => {
    toggleStore.getState().open(key);
    persistIfNeeded(true);
  }, [key, persistIfNeeded]);

  const close = useCallback(() => {
    toggleStore.getState().close(key);
    persistIfNeeded(false);
  }, [key, persistIfNeeded]);

  const toggle = useCallback(() => {
    const next = !toggleStore.getState().toggles[key];
    toggleStore.getState().setValue(key, next);
    persistIfNeeded(next);
  }, [key, persistIfNeeded]);

  const set = useCallback(
    (value) => {
      const next = !!value;
      toggleStore.getState().setValue(key, next);
      persistIfNeeded(next);
    },
    [key, persistIfNeeded]
  );

  const reset = useCallback(() => {
    toggleStore.getState().reset(key);
    if (persist && typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {}
    }
  }, [key, persist, storageKey]);

  return { key, isOpen, open, close, toggle, set, reset };
}

/** Imperative helper without React, if needed */
export function createToggleController(id, options = {}) {
  const { persist = false, scope = "global" } = options;
  const key = makeScopedKey(id, scope);
  const storageKey = storageKeyFor(key);

  const get = () => !!toggleStore.getState().toggles[key];
  const set = (value) => {
    toggleStore.getState().setValue(key, !!value);
    if (persist && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(storageKey, value ? "1" : "0");
      } catch {}
    }
  };

  return {
    key,
    get,
    open: () => set(true),
    close: () => set(false),
    toggle: () => set(!get()),
    reset: () => {
      toggleStore.getState().reset(key);
      if (persist && typeof window !== "undefined") {
        try {
          window.localStorage.removeItem(storageKey);
        } catch {}
      }
    },
  };
}
