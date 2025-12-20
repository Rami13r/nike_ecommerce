import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string | null;
  color?: string | null;
  gender?: string | null;
  createdAt?: any;
}

interface FavoritesStore {
  items: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((item) => item.id === product.id);

        if (exists) {
          set({
            items: currentItems.filter((item) => item.id !== product.id),
          });
        } else {
          set({ items: [...currentItems, product] });
        }
      },
      isFavorite: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'nike-favorites-storage',
    }
  )
);
