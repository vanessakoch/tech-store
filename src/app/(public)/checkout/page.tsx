
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Navbar } from "@/components/NavBar";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Link
              href="/cart"
              className="text-sm text-zinc-500 transition hover:text-zinc-900"
            >
              ← Back to cart
            </Link>

            <h1 className="mt-4 text-3xl font-bold text-zinc-900">
              Checkout
            </h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <form className="space-y-8">
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                    Contact information
                  </h2>

                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                    Shipping address
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-700">
                        First name
                      </label>

                      <input
                        type="text"
                        placeholder="John"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-700">
                        Last name
                      </label>

                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      Address
                    </label>

                    <input
                      type="text"
                      placeholder="123 Main Street"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-700">
                        City
                      </label>

                      <input
                        type="text"
                        placeholder="New York"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-700">
                        ZIP code
                      </label>

                      <input
                        type="text"
                        placeholder="10001"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                    Payment
                  </h2>

                  <div className="rounded-xl border border-zinc-200 p-4">
                    <p className="mb-4 text-sm font-medium text-zinc-700">
                      Credit card
                    </p>

                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                    />

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                      />

                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Name on card"
                      className="mt-4 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>

                  <p className="mt-3 text-xs text-zinc-400">
                    Demo checkout — no real payment will be processed.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-zinc-800"
                >
                  Place order
                </button>
              </form>
            </section>

            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-xl font-bold text-zinc-900">
                Order summary
              </h2>

              <div className="mt-6 space-y-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-zinc-900">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="mt-1 font-semibold text-zinc-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-zinc-100 pt-6">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="mt-3 flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="mt-5 flex justify-between border-t border-zinc-100 pt-5 text-xl font-bold text-zinc-900">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
