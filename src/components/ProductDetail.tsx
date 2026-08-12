"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCheck, FaTruck } from "react-icons/fa6";
import { X } from "lucide-react";

import { Product } from "@/types/product";
import { FaHeart } from "react-icons/fa";

type ProductProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const isInStock = product.stock > 0;

  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-10 py-6">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          SKU: {product.sku}
        </p>

        <div className="flex justify-between">
          <h1 className="mt-2 text-3xl font-bold capitalize tracking-tight text-zinc-900">
            {product.title}
          </h1>
          <button 
            type="button"
            className="cursor-pointer"
            onClick={() => {}}>
            <FaHeart className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_400px] gap-14 px-10 pt-6">
        <div className="flex gap-6 border-r border-zinc-100">
          <div className="flex w-20 shrink-0 flex-col gap-4">
            {product.images.map((image) => {
              const isSelected = selectedImage === image;

              return (
                <button
                  key={image}
                  type="button"
                  aria-label={`View ${product.title} image`}
                  onClick={() => setSelectedImage(image)}
                  className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border bg-white p-2 transition-all ${
                    isSelected
                      ? "border-purple-500 ring-2 ring-purple-500/10"
                      : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <Image
                    src={image}
                    alt={product.title}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </button>
              );
            })}
          </div>

          <div className="flex h-400px flex-1 items-center justify-center rounded-2xl bg-zinc-50">
            <button
              type="button"
              aria-label={`Open ${product.title} image`}
              onClick={() => setIsImageOpen(true)}
              className="cursor-zoom-in"
            >
              <Image
                src={selectedImage}
                alt={product.title}
                width={400}
                height={400}
                priority
                className="max-h-360px w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600">
              {product.category}
            </span>

            <span className="text-sm text-zinc-400">•</span>

            <span className="text-sm text-zinc-500">{product.brand}</span>
          </div>

          <div className="mt-5 flex items-center gap-2">
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

          <div className="my-6 border-t border-zinc-100" />
          <div>
            <span className="inline-flex rounded-md bg-red-50 px-3 py-1 text-xs font-bold text-red-400">
              -{product.discountPercentage}% OFF
            </span>
          </div>
          <div className="flex gap-4">
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
                {isInStock ? product.availabilityStatus : "Out of Stock"}
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

      <div className="border-t border-zinc-100 bg-zinc-50/50 px-10 py-10">
        <div className="space-y-4">
          <details className="group rounded-xl border border-zinc-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-zinc-800">
              Description

              <span className="text-lg text-zinc-400 transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="border-t border-zinc-100 px-5 py-4">
              <p className="text-sm leading-6 text-zinc-600">
                {product.description}
              </p>
            </div>
          </details>

          <details className="group rounded-xl border border-zinc-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-zinc-800">
              Dimensions

              <span className="text-lg text-zinc-400 transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="border-t border-zinc-100 px-5 py-4">
              <p className="text-sm leading-6 text-zinc-600">
                {product.dimensions.depth} × {product.dimensions.height} ×{" "}
                {product.dimensions.width}
              </p>
            </div>
          </details>
        </div>

        <div id="reviews" className="mt-6 rounded-xl border border-zinc-200 bg-white p-8">
          <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Reviews</h2>

              <p className="mt-1 text-sm text-zinc-400">
                What customers are saying
              </p>
            </div>

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
              {product.reviews.length} reviews
            </span>
          </div>

          <div className="divide-y divide-zinc-100">
            {product.reviews.map((review) => (
              <div
                key={review.reviewerEmail}
                className="py-6 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-zinc-800">
                      {review.reviewerName}
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm tracking-wide text-amber-400">
                      {"★".repeat(review.rating)}
                    </span>

                    <span className="text-xs text-zinc-400">
                      {review.rating}/5
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8 backdrop-blur-sm"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={product.title}
              width={800}
              height={800}
              className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            />

            <button
              type="button"
              aria-label="Close image"
              onClick={() => setIsImageOpen(false)}
              className="absolute right-6 top-6 cursor-pointer rounded-full bg-zinc-900/70 p-2 transition hover:bg-zinc-900"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}