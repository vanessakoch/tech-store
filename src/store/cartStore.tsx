import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  email: string;
};

type CartStore = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;

  toastMessage: string | null;
  hideToast: () => void;

  lastOrder: Order | null;
  createOrder: (email: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
              toastMessage: `${product.title} added to cart`,
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: 1,
              },
            ],
            toastMessage: `${product.title} added to cart!`,
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      toastMessage: null,

      hideToast: () =>
        set({
          toastMessage: null,
        }),
         
      createOrder: (email) =>
        set((state) => {
          const total = state.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );

          return {
            lastOrder: {
              id: `TS-${Math.floor(10000 + Math.random() * 90000)}`,
              items: state.items,
              total,
              email,
            },
            items: [],
          };
        }),
      
      lastOrder: null
    }),

    {
      name: "tech-store-cart",

      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);