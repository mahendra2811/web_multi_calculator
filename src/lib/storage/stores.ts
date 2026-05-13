"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import type { HistoryEntry } from "@/types/calculator";

interface FavoritesState {
  ids: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id],
        })),
      isFavorite: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    {
      name: STORAGE_KEYS.favorites,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface HistoryState {
  entries: HistoryEntry[];
  push: (entry: Omit<HistoryEntry, "id" | "createdAt">) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const MAX_HISTORY = 200;

export const useHistory = create<HistoryState>()(
  persist(
    (set) => ({
      entries: [],
      push: (entry) =>
        set((state) => {
          const next: HistoryEntry = {
            ...entry,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
          };
          return { entries: [next, ...state.entries].slice(0, MAX_HISTORY) };
        }),
      remove: (id) => set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),
      clear: () => set({ entries: [] }),
    }),
    {
      name: STORAGE_KEYS.history,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export type ListView = "compact" | "small" | "grid" | "detailed";

interface ListViewState {
  view: ListView;
  setView: (v: ListView) => void;
}

export const useListView = create<ListViewState>()(
  persist(
    (set) => ({
      view: "grid",
      setView: (view) => set({ view }),
    }),
    {
      name: STORAGE_KEYS.listView,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface RecentsState {
  ids: string[];
  touch: (id: string) => void;
  clear: () => void;
}

const MAX_RECENTS = 12;

export const useRecents = create<RecentsState>()(
  persist(
    (set) => ({
      ids: [],
      touch: (id) =>
        set((state) => {
          const filtered = state.ids.filter((x) => x !== id);
          return { ids: [id, ...filtered].slice(0, MAX_RECENTS) };
        }),
      clear: () => set({ ids: [] }),
    }),
    {
      name: STORAGE_KEYS.recents,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
