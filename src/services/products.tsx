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

export async function getProduct(id: number) {
  return api(`/products/${id}`);
}

export async function searchProducts(query: string) {
  return api(`/products/search?q=${query}`);
}