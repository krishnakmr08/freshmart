import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: (id: string | number) => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: item => {
        const cart = get().cart;
        const index = cart.findIndex(
          cartItem => cartItem._id === item._id,
        );

        if (index !== -1) {
          const updatedCart = [...cart];
          updatedCart[index] = {
            ...updatedCart[index],
            count: updatedCart[index].count + 1,
          };
          set({ cart: updatedCart });
        } else {
          set({
            cart: [...cart, { _id: item._id, item, count: 1 }],
          });
        }
      },

      removeItem: id => {
        const cart = get().cart;
        const index = cart.findIndex(
          cartItem => cartItem._id === id,
        );

        if (index === -1) return;

        const updatedCart = [...cart];
        const currentItem = updatedCart[index];

        if (currentItem.count > 1) {
          updatedCart[index] = {
            ...currentItem,
            count: currentItem.count - 1,
          };
        } else {
          updatedCart.splice(index, 1);
        }

        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),

      getItemCount: id => {
        const item = get().cart.find(
          cartItem => cartItem._id === id,
        );
        return item ? item.count : 0;
      },

      getTotalPrice: () =>
        get().cart.reduce(
          (total, cartItem) =>
            total + cartItem.item.price * cartItem.count,
          0,
        ),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
