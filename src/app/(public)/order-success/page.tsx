"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Package } from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import { Navbar } from "@/components/NavBar";
import { formatPrice } from "@/lib/utils";

export default function OrderSuccessPage() {
  const order = useCartStore((state) => state.lastOrder);

  if (!order) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900">
              No order found
            </h1>

            <p className="mt-2 text-zinc-500">
              We couldn&apos;t find a recent order.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800"
            >
              Continue shopping
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50 px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check
                className="h-10 w-10 text-green-600"
                strokeWidth={2.5}
              />
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Order placed successfully!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-zinc-500">
              Thank you for your purchase. Your order has been confirmed and
              is being prepared for shipment.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="border-b border-zinc-100 px-6 py-5 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Order number
                  </p>

                  <p className="mt-1 font-semibold text-zinc-900">
                    #{order.id}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
                  <Package className="h-5 w-5 text-zinc-600" />
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-500">
                Confirmation sent to{" "}
                <span className="font-medium text-zinc-700">
                  {order.email}
                </span>
              </p>
            </div>

            <div className="px-6 py-6 sm:px-8">
              <h2 className="font-semibold text-zinc-900">Order summary</h2>

              <div className="mt-5 space-y-5">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={72}
                      height={72}
                      className="h-72px w-72px rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-zinc-900">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-zinc-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-zinc-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-zinc-900">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-zinc-900">What happens next?</h2>

            <div className="mt-4 space-y-3 text-sm text-zinc-500">
              <div className="flex gap-3">
                <span className="font-semibold text-zinc-900">1.</span>
                <span>You’ll receive an order confirmation shortly.</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold text-zinc-900">2.</span>
                <span>Your order will be prepared for shipment.</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold text-zinc-900">3.</span>
                <span>We’ll let you know when your order is on its way.</span>
              </div>
            </div>
          </div>

          <Link
            href="/products"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-zinc-800"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    </>
  );
}