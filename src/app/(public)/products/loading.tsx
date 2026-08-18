import { Navbar } from "@/components/NavBar";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <ProductGridSkeleton />
      </div>
    </main>
  );
}