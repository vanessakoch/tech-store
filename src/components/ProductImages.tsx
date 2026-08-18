import { Product } from "@/types/product";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ImagesProps = {
  product: Product
}

export function ProductImages({product}: ImagesProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="flex min-w-0 flex-col gap-4 lg:flex-row  lg:pr-8">
      <div className="flex w-full shrink-0 flex-row gap-4 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible">
        {product.images.map((image) => {
          const isSelected = selectedImage === image;

          return (
            <button
              key={image}
              type="button"
              aria-label={`View ${product.title} image`}
              onClick={() => setSelectedImage(image)}
              className={`flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-xl border bg-white p-2 transition-all ${
                isSelected
                  ? "border-purple-500 ring-2 ring-purple-500/10"
                  : "border-zinc-300 hover:border-zinc-400"
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

      <div className="flex min-w-0 flex-1 justify-center">
        <button
          type="button"
          aria-label={`Open ${product.title} image`}
          onClick={() => setIsImageOpen(true)}
          className="cursor-pointer flex w-full max-w-300px items-start justify-center rounded-2xl bg-zinc-50"
        >
          <Image
            src={selectedImage}
            alt={product.title}
            width={300}
            height={300}
            priority
            className="h-auto w-[85%] object-contain transition-transform duration-300 hover:scale-105"
          />
        </button>
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
  )
}