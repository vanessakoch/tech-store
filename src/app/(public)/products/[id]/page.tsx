
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
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-24 my-6">
        <ProductDetail product={product} />
      </div>
    </main>
  )
}
