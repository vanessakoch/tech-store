import { Navbar } from "@/components/NavBar";

import { getElectronicsProducts } from "@/services/products";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";

export default async function Products() {
  const products: Product[] = await getElectronicsProducts()

  return (
    <main className="min-h-screen">
      <Navbar />

      <ProductFilters />

      <div className="grid grid-cols-2 gap-6 p-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
      </div>
    </main>
  )
}