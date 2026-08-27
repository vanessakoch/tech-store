
import { Navbar } from "@/components/NavBar";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct } from "@/services/products";
import { Product } from "@/types/product";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product: Product = await getProduct(Number(id));

  return(
    <main className="bg-zinc-100/60">
      <Navbar />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <ProductDetail product={product} />
      </div>
    </main>
  )
}
