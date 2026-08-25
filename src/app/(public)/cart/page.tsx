"use client";

import { Navbar } from "@/components/NavBar";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-3xl font-bold text-zinc-900">
            My cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <p className="text-xl font-semibold text-zinc-800">
                Your cart is empty.
              </p>

              <p className="mt-2 text-zinc-500">
                Add some products to continue.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
              <section className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <Link href={`/products/${item.id}`}>
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={160}
                        height={160}
                        className="h-28 w-28 rounded-xl object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h2 className="font-semibold text-zinc-900">
                          {item.title}
                        </h2>

                        <p className="mt-1 text-lg font-bold text-zinc-900">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-lg border">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="cursor-pointer px-3 py-1 text-lg hover:bg-zinc-100"
                          >
                            −
                          </button>

                          <span className="px-4">{item.quantity}</span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="cursor-pointer px-3 py-1 text-lg hover:bg-zinc-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-zinc-900">
                  Order Summary
                </h2>

                <div className="my-6 space-y-3 border-b pb-6">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Link href={'/checkout'} >
                  <button className="cursor-pointer mt-6 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-zinc-800">
                    Checkout
                  </button>
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}