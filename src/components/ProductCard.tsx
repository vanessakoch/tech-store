import Image from "next/image"
import Link from "next/link"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Product } from "@/types/product"
import { useFavorites } from "@/hooks/useFavorites";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({product}: ProductCardProps) {
  const {
    toggleFavorite,
    isFavorite,
    hydrated,
  } = useFavorites();

  const favorite = hydrated && isFavorite(product.id);
  const isInStock = product.stock > 0;

  return(
    <article
      className="
        group
        overflow-hidden
        rounded-xl
        border
        border-zinc-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative flex h-56 items-center justify-center bg-zinc-100 p-6">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex justify-between">
          <span className="text-xs uppercase tracking-wide text-zinc-500">
            {product.category}
          </span>
          <button 
            onClick={() => toggleFavorite(product.id)}
            type="button"
            className="cursor-pointer
          ">
            {favorite ? (
              <FaHeart className="text-red-500 transition-transform hover:scale-110"/> 
            ):(
              <FaRegHeart className="text-zinc-800"/>
            )}
          </button>
        </div>

        <Link href={`/products/${product.id}`}>
          <h2 className="line-clamp-2 h-12 text-sm font-medium text-zinc-800 group-hover:text-purple-600">
            {product.title}
          </h2>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-base">★★★★★</span>
          <span className="text-sm text-zinc-500">
            ({product.rating})
          </span>
        </div>

        <div className="gap-4 flex items-center">
          <p className="text-2xl font-bold text-zinc-900">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
          </p>
          <p className="text-xs text-purple-500 bg-purple-500/10 p-1 rounded-sm">
            -{product.discountPercentage}%
          </p>
        </div>

        <button
          type="button"
          disabled={!isInStock}
          className="
            mt-2
            rounded-lg
            bg-purple-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-purple-700
            cursor-pointer
            disabled:cursor-not-allowed 
            disabled:opacity-50
          "
        >
          {isInStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  )
}