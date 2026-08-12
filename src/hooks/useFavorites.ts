"use client";

import { useEffect, useState } from "react";

import { useFavoritesStore } from "@/store/favorites-store";

export function useFavorites() {
  const [hydrated, setHydrated] = useState(false);

  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  useEffect(() => {
    const unsubscribe =
      useFavoritesStore.persist.onFinishHydration(() => {
        setHydrated(true);
      });

    if (useFavoritesStore.persist.hasHydrated()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHydrated(true);
    }

    return unsubscribe;
  }, []);

  const isFavorite = (productId: number) =>
    favorites.includes(productId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    hydrated,
  };
}