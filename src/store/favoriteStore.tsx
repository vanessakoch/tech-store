import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),
    }),
    {
      name: "bytestore-favorites",
    }
  )
);