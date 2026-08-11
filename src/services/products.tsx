import { Product } from "@/types/product";
import { api } from "./api";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const electronicsCategories = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
];

export async function getElectronicsProducts(): Promise<Product[]> {
  const responses = await Promise.all(
    electronicsCategories.map(category =>
      api<ProductsResponse>(`/products/category/${category}`)
    )
  );

  return responses.flatMap(response => response.products);
}

export async function getProduct(id: number): Promise<Product> {
  return api(`/products/${id}`, {
    next: {
      revalidate: 3600,
    }
  });
}
