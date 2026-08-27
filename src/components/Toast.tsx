"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Check, X } from "lucide-react";

export default function Toast() {
  const toastMessage = useCartStore((state) => state.toastMessage);
  const hideToast = useCartStore((state) => state.hideToast);

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      hideToast();
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastMessage, hideToast]);

  if (!toastMessage) {
    return null;
  }

  return (
    <div className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-zinc-200">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
        <Check />
      </div>

      <p className="text-sm font-medium text-zinc-900">
        {toastMessage}
      </p>

      <button
        type="button"
        onClick={hideToast}
        className="cursor-pointer ml-2 text-lg text-zinc-400 transition hover:text-zinc-700"
      >
        <X />
      </button>
    </div>
  );
}