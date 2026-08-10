"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";

type ProductsClientProps = {
  products: Product[];
};

export function ProductsClient({ products }: ProductsClientProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [brand, setBrand] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categories.length === 0 ||
      categories.includes(product.category);

    const matchesBrand =
      !brand ||
      product.brand?.toLowerCase() === brand;

    return matchesCategory && matchesBrand;
  });

  return (
    <>
      <ProductFilters
        categories={categories}
        setCategories={setCategories}
        brand={brand}
        setBrand={setBrand}
      />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 p-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-lg font-semibold text-zinc-800">
            No products found
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Try selecting another category or brand.
          </p>
        </div>
      )}
    </>
  );
}