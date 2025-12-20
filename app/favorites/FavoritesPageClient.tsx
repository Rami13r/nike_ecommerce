'use client';

import { useState, useEffect } from 'react';
import { useFavoritesStore } from '@/lib/store/favoritesStore';
import ProductCard from '@/components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPageClient() {
  const [mounted, setMounted] = useState(false);
  const { items, clearFavorites } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-20 font-jost min-h-[60vh]">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic italic">Favourites</h1>
          <p className="text-dark-500 mt-2 font-medium">Items you&apos;ve added to your list.</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearFavorites}
            className="text-sm font-bold uppercase tracking-tight text-dark-500 hover:text-red transition-colors underline underline-offset-4"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center space-y-6 bg-light-50 rounded-3xl border border-dashed border-light-300">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-10 h-10 text-light-400" />
          </div>
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-black uppercase tracking-tight italic">Items added to your favourites will be saved here.</h2>
            <p className="text-dark-500 mt-2 px-6">Explore our latest arrivals and pick your next favorite pair.</p>
          </div>
          <Link
            href="/shop"
            className="inline-block px-10 py-4 bg-dark-900 text-white font-black uppercase rounded-full text-sm hover:bg-dark-700 transition-all shadow-lg active:scale-95"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Recommended Section (Static for now) */}
      <div className="mt-32 pt-20 border-t border-light-200">
        <h2 className="text-2xl font-black uppercase tracking-tighter italic mb-10">You Might Also Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* We could fetch some random products here, but for now just as a placeholder */}
          <div className="aspect-[4/5] bg-light-100 rounded-2xl flex items-center justify-center text-dark-300 font-bold uppercase tracking-widest text-xs">Recommended</div>
          <div className="aspect-[4/5] bg-light-100 rounded-2xl flex items-center justify-center text-dark-300 font-bold uppercase tracking-widest text-xs">Recommended</div>
          <div className="aspect-[4/5] bg-light-100 rounded-2xl flex items-center justify-center text-dark-300 font-bold uppercase tracking-widest text-xs">Recommended</div>
          <div className="aspect-[4/5] bg-light-100 rounded-2xl flex items-center justify-center text-dark-300 font-bold uppercase tracking-widest text-xs">Recommended</div>
        </div>
      </div>
    </div>
  );
}
