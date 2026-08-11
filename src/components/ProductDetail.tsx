"use client";

import { Product } from "@/types/product";
import { Check, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";


type ProductProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isImageOpen, setIsImageOpen] = useState(false);
  
  return (
    <div className="mx-auto max-w-6xl rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
      <p className="text-sm text-zinc-500">SKU: {product.sku}</p>
      <h1 className="mb-8 text-center text-3xl font-bold capitalize text-purple-500">
        {product.title}
      </h1>

      <div className="grid grid-cols-[508px_400px] justify-center gap-16">
        <div className="self-start flex rounded-xl p-6 shadow-md shadow-zinc-300">
          <div className="flex gap-5 w-20 shrink-0 flex-col">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`h-20 w-20 cursor-pointer rounded-lg border p-1 transition ${
                  selectedImage === image
                    ? "border-zinc-800"
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
            ))}
          </div>

          <div className="relative flex h-360px w-360px shrink-0 items-center justify-center">
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="cursor-zoom-in"
            >
              <Image
                src={selectedImage}
                alt={product.title}
                width={360}
                height={360}
                priority
                className="h-full w-full object-contain"
              />
            </button>
          </div>
        </div>

        <div className="flex w-400px shrink-0 flex-col gap-5">
          <div>
            <p className="text-sm text-zinc-500">Brand</p>
            <p className="font-medium text-zinc-800">{product.brand}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Category</p>
            <p className="font-medium text-zinc-800">{product.category}</p>
          </div>
          <div>
            <p className="font-bold text-xl text-zinc-800">
              ⭐ {product.rating}
            </p>
          </div>

          <div className="mt-2">
            <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-600">
              -{product.discountPercentage}% OFF
            </span>

            <div className="mt-2 flex items-center gap-3">
              <p className="text-3xl font-bold text-zinc-900">
                ${product.price}
              </p>

              <div
                className={`flex items-center gap-1.5 text-sm font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? (
                  <FaCheck className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-4 w-4" />
                )}

                <span>
                  {product.stock > 0 ? product.availabilityStatus : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>

          <details className="group border-t border-zinc-200 pt-4">
            <summary className="bg-zinc-200 rounded-lg flex cursor-pointer list-none items-center justify-between px-3 py-2 font-medium text-zinc-800">
              Description

              <span className="transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <p className="p-4 text-sm text-justify leading-6 text-zinc-600">
              {product.description}
            </p>
          </details>

          <details className="group border-t border-zinc-200 pt-4">
            <summary className="bg-zinc-200 rounded-lg flex cursor-pointer list-none items-center justify-between px-3 py-2 font-medium text-zinc-800">
              Dimensions

              <span className="transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <p className="p-4 text-sm text-justify leading-6 text-zinc-600">
              {product.dimensions.depth} x 
              {product.dimensions.height} x 
              {product.dimensions.width}
            </p>
          </details>
      
          <button
            type="button"
            disabled={product.stock === 0}
            className="cursor-pointer rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="mx-12 my-12 space-y-8 rounded-xl bg-zinc-100/60 px-8 py-10">
        <div className="rounded-lg bg-white px-6 py-5 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-zinc-800">
            Shipping Information
          </h2>

          <p className="text-sm leading-6 text-zinc-600">
            {product.shippingInformation}
          </p>
        </div>

        <div className="rounded-lg bg-white px-8 py-6 shadow-md shadow-zinc-200">
          <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-4">
            <h2 className="text-2xl font-bold text-purple-600">
              Reviews
            </h2>

            <span className="text-sm text-zinc-500">
              {product.reviews.length} reviews
            </span>
          </div>

          <div className="divide-y divide-zinc-200">
            {product.reviews.map((review) => (
              <div key={review.reviewerEmail} className="py-6 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-zinc-800">
                    {review.reviewerName}
                  </p>

                  <p className="font-semibold text-amber-500">
                    {"★".repeat(review.rating)}
                    <span className="ml-1 text-xs text-zinc-400">
                      {review.rating}/5
                    </span>
                  </p>
                </div>

                <p className="mt-1 text-xs text-zinc-400">
                  {review.reviewerEmail}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <p className="mt-4 leading-6 text-zinc-600">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-8"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative inline-block"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={product.title}
              width={800}
              height={800}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            <button
              type="button"
              onClick={() => setIsImageOpen(false)}
              className="cursor-pointer absolute right-0 top-0 text-xl text-zinc-800 shadow"
            >
              <X className="text-white h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
