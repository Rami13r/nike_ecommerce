'use client';

import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Heart, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPageClient() {
  const [mounted, setMounted] = useState(false);
  const { items, addItem, removeItem, deleteItem, getTotalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  if (!mounted) return null;

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 font-jost">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Left Side: Bag Items */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">Bag</h1>
            {items.length === 0 ? (
              <p className="text-dark-600">There are no items in your bag.</p>
            ) : (
              <p className="text-sm text-dark-500">{items.length} Item{items.length > 1 ? 's' : ''}</p>
            )}
          </div>

          {items.length > 0 && (
            <div className="space-y-10">
              {items.map((item) => (
                <motion.div
                  layout
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex flex-col sm:flex-row gap-6 pb-10 border-b border-light-200 group"
                >
                  {/* Image */}
                  <div className="w-full sm:w-40 aspect-square bg-light-100 rounded-xl overflow-hidden relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2 className="text-lg font-black uppercase tracking-tight italic group-hover:underline cursor-pointer">
                          {item.name}
                        </h2>
                        <p className="text-dark-600 font-medium">{item.category}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm text-dark-500">
                          {item.selectedSize && <span>Size {item.selectedSize}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      </div>
                      <p className="text-lg font-black">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <div className="flex items-center border border-light-300 rounded-full px-4 py-2 gap-4">
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize)}
                          className="hover:text-red transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="hover:text-green transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex gap-4">
                        <button className="text-dark-400 hover:text-dark-900 transition-all p-1 cursor-pointer">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id, item.selectedSize)}
                          className="text-dark-400 hover:text-dark-900 transition-all p-1 cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {items.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center space-y-6">
              <Link
                href="/shop"
                className="px-10 py-4 bg-dark-900 text-white font-black uppercase rounded-full text-sm hover:bg-dark-700 transition-all active:scale-95"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Summary */}
        <div className="w-full lg:w-[350px]">
          <div className="lg:sticky lg:top-24 space-y-8 bg-light-50/50 p-8 rounded-2xl border border-light-200">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-1">
                  Subtotal
                  <Info className="w-3 h-3 text-dark-400" />
                </div>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Estimated Shipping & Handling</span>
                <span className="text-green font-bold">Free</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Estimated Tax</span>
                <span>—</span>
              </div>

              <div className="flex justify-between items-center text-base font-black uppercase tracking-tight italic border-y border-light-200 py-6 mt-6">
                <span>Total</span>
                <span className="text-xl">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            <button
              disabled={items.length === 0}
              className="w-full py-5 bg-dark-900 text-white font-black uppercase rounded-full text-sm hover:bg-dark-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-dark-900/10"
            >
              Member Checkout
            </button>
            <p className="text-[10px] text-dark-500 text-center uppercase tracking-widest font-bold">
              Secure Payment with Nike Encrypted Processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
