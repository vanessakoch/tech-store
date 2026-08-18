"use client";

import { FaCheck, FaTruck } from "react-icons/fa6";
import { X } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { Product } from "@/types/product";
import { useFavorites } from "@/hooks/useFavorites";
import { ProductReview } from "./ProductReview";
import { ProductImages } from "./ProductImages";

type ProductProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductProps) {
  const { toggleFavorite, isFavorite, hydrated } = useFavorites();

  const favorite = hydrated && isFavorite(product.id);
  const isInStock = product.stock > 0;

  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md">
      <div className="border-b border-zinc-200 px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          SKU: {product.sku}
        </p>

        <div className="flex items-center gap-4">
          <h1 className="mt-2 text-3xl font-bold capitalize tracking-tight text-zinc-900">
            {product.title}
          </h1>

          <button
            type="button"
            aria-label={
              favorite ? "Remove from favorites" : "Add to favorites"
            }
            className="mt-2 cursor-pointer"
            onClick={() => toggleFavorite(product.id)}
          >
            {favorite ? (
              <FaHeart className="text-2xl text-red-500 transition-transform hover:scale-110" />
            ) : (
              <FaRegHeart className="text-2xl text-zinc-500 transition-colors hover:text-red-400" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 px-4 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:gap-14 lg:px-10">
        <ProductImages product={product} />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600">
              {product.category}
            </span>

            <span className="text-sm text-zinc-400">•</span>

            <span className="text-sm text-zinc-500">
              {product.brand}
            </span>
          </div>

          <div className="my-5 flex items-center gap-2">
            <span className="text-2xl text-amber-400">★</span>

            <span className="font-semibold text-zinc-800">
              {product.rating}
            </span>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("reviews")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer text-sm text-zinc-400 transition hover:text-purple-500"
            >
              ({product.reviews.length} reviews)
            </button>
          </div>

          <div>
            <span className="inline-flex rounded-md bg-red-50 px-3 py-1 text-xs font-bold text-pink-600">
              -{product.discountPercentage}% OFF
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">
              ${product.price}
            </p>

            <div
              className={`mt-4 flex items-center gap-2 text-sm font-medium ${
                isInStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {isInStock ? (
                <FaCheck className="h-3.5 w-3.5" />
              ) : (
                <X className="h-4 w-4" />
              )}

              <span>
                {isInStock
                  ? product.availabilityStatus
                  : "Out of Stock"}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={!isInStock}
            className="mt-10 w-full cursor-pointer rounded-xl bg-purple-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isInStock ? "Add to Cart" : "Out of Stock"}
          </button>

          <div className="mt-2 flex items-start gap-3 rounded-xl bg-zinc-50 p-4">
            <FaTruck className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />

            <div>
              <p className="text-sm font-medium text-zinc-800">
                Shipping information
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                {product.shippingInformation}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-300 bg-zinc-50/50 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="space-y-4">
          <details className="group rounded-xl border border-zinc-300 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-zinc-800">
              Description

              <span className="text-lg text-zinc-400 transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="border-t border-zinc-200 px-5 py-4">
              <p className="text-sm leading-6 text-zinc-600">
                {product.description}
              </p>
            </div>
          </details>

          <details className="group rounded-xl border border-zinc-300 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-zinc-800">
              Dimensions

              <span className="text-lg text-zinc-400 transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="border-t border-zinc-200 px-5 py-4">
              <p className="text-sm leading-6 text-zinc-600">
                {product.dimensions.depth} ×{" "}
                {product.dimensions.height} ×{" "}
                {product.dimensions.width}
              </p>
            </div>
          </details>
        </div>
        <ProductReview reviews={product.reviews} />
      </div>
    </div>
  );
}