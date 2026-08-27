
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Navbar } from "@/components/NavBar";
import { formatPrice } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";

type CheckoutFormData = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  nameOnCard: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const createOrder = useCartStore((state) => state.createOrder);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onSubmit = (data: CheckoutFormData) => {
    createOrder(data.email);
    router.push("/order-success");
  };

  return (
    <>
      <Navbar />

      <main className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Link
              href="/cart"
              className="text-sm text-zinc-500 transition hover:text-zinc-900"
            >
              <ArrowLeft />
            </Link>

            <h2 className="mt-4 text-3xl font-bold text-zinc-900">
              Checkout
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                    Contact information
                  </h2>

                  <FormInput
                    label="E-mail"
                    error={errors.email?.message} 
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "E-mail is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                    Shipping address
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormInput
                      label="First Name"
                      type="text"
                      placeholder="John"
                      error={errors.firstName?.message}
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must have at least 2 characters",
                        },
                      })}
                    />

                    <FormInput
                      label="Last Name"
                      type="text"
                      placeholder="Doe"
                      {...register("lastName",{
                        required: "Last name is required",
                      })}
                      error={errors.lastName?.message}
                    />
                  </div>

                  <div className="mt-4">
                    <FormInput
                      label="Address"
                      error={errors.address?.message}
                      type="text"
                      placeholder="123 Main Street"
                      {...register("address", {
                          required: "Address is required",
                      })}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <FormInput
                      label="City"
                      error={errors.city?.message} 
                      type="text"
                      placeholder="New York"
                      {...register("city", {
                        required: "City is required",
                      })}
                    />

                    <FormInput
                      label="Zip Code"
                      error={errors.zipCode?.message}
                      type="text"
                      placeholder="10001"
                      {...register("zipCode", {
                        required: "Zip code is required",
                      })}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900">
                    Payment
                  </h2>

                  <div className="rounded-xl border border-zinc-200 p-4">
                    <FormInput
                      label="Credit Card"
                      error={errors.cardNumber?.message}
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: {
                          value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                          message: "Card number must have 16 digits",
                        },
                        onChange: (event) => {
                          const value = event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16)
                            .replace(/(\d{4})(?=\d)/g, "$1 ");

                          event.target.value = value;
                        },
                      })}
                    />

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <FormInput
                        error={errors.expirationDate?.message}
                        type="text"
                        placeholder="MM / YY"
                        {...register("expirationDate", {
                          required: "Expiration date is required",
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\s\/\s\d{2}$/,
                            message: "Enter a valid expiration date",
                          },
                        })}
                        onChange={(event) => {
                          let value = event.target.value.replace(/\D/g, "");

                          if (value.length > 2) {
                            value = `${value.slice(0, 2)} / ${value.slice(2, 4)}`;
                          }

                          event.target.value = value;
                        }}
                      />

                      <FormInput
                        error={errors.cvv?.message}
                        type="text"
                        placeholder="CVV"
                        maxLength={3}
                        inputMode="numeric"
                        {...register("cvv", {
                          required: "CVV is required",
                          pattern: {
                            value: /^\d{3}$/,
                            message: "CVV must have 3 digits",
                          },
                          onChange: (event) => {
                            event.target.value = event.target.value.replace(/\D/g, "");
                          },
                        })}
                      />
                    </div>

                    <FormInput
                      type="text"
                      error={errors.nameOnCard?.message}
                      className="mt-4"
                      placeholder="Name on card"
                      {...register("nameOnCard", {
                        required: "Name on card is required",
                      })}
                    />
                  </div>

                  <p className="mt-3 text-xs text-zinc-400">
                    Demo checkout — no real payment will be processed.
                  </p>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-zinc-800"
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
