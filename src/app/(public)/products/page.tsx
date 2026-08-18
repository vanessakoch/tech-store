import { Navbar } from "@/components/NavBar";

import { getElectronicsProducts } from "@/services/products";
import { Product } from "@/types/product";
import { ProductsClient } from "@/components/ProductsClient";

export default async function Products() {
  const products: Product[] = await getElectronicsProducts()

  return (
    <main>
      <Navbar />
      <ProductsClient products={products} />
    </main>
  )
}