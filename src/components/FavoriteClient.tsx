"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getElectronicsProducts } from "@/services/products";
import { ProductCard } from "./ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

export function FavoritesClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { favorites, hydrated } = useFavorites();

  useEffect(() => {
    if (!hydrated) return;

    async function loadFavorites() {
      const allProducts = await getElectronicsProducts();

      const favoriteProducts = allProducts.filter((product) =>
        favorites.includes(product.id)
      );

      setProducts(favoriteProducts);
      setLoading(false);
    }

    loadFavorites();
  }, [favorites, hydrated]);

  if (!hydrated || loading) {
    return (
      <main className="min-h-screen bg-zinc-100/50 px-4 py-8">
          <ProductGridSkeleton />
      </main>
    );
  }

  return (
    products.length > 0 ? (
      <div className="grid grid-cols-2 gap-6 p-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    ):(
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-lg font-semibold text-zinc-800">
          No favorites found
        </h2>
      </div>
  ));
}