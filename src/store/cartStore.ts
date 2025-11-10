import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './middleware/mmkvStorage';
import { ProductItem } from '../types/common';

type CartMap = Record<string, { quantity: number; product: ProductItem }>;

interface CartState {
  cart: CartMap;
  addQuantity: (product: ProductItem) => void;
  removeQuantity: (pId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      cart: {},

      addQuantity: (product: ProductItem) =>
        set(state => {
          const pId = product.id;
          const current = state.cart[pId] ?? { quantity: 0, product };
          return {
            cart: {
              ...state.cart,
              [pId]: {
                quantity: current.quantity + 1,
                product: current.product,
              },
            },
          };
        }),

      removeQuantity: pId =>
        set(state => {
          const current = state.cart[pId];
          if (!current) {
            return state;
          }
          if (current.quantity <= 1) {
            const newCart = { ...state.cart };
            delete newCart[pId];
            return {
              cart: newCart,
            };
          }
          return {
            cart: {
              ...state.cart,
              [pId]: {
                ...current,
                quantity: current.quantity - 1,
              },
            },
          };
        }),

      clearCart: () =>
        set(() => ({
          cart: {},
        })),
    }),
    {
      name: 'cart-map-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
