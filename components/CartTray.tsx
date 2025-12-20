'use client';

import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';

interface CartTrayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartTray({ isOpen, onClose }: CartTrayProps) {
  const { items, addItem, removeItem, deleteItem, getTotalPrice, getTotalItems } = useCartStore();

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Tray */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-light-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-xl font-black uppercase tracking-tighter italic">Bag ({getTotalItems()})</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-light-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-light-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-dark-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight">Your bag is empty</h3>
                    <p className="text-dark-500 text-sm mt-1">Once you add something to your bag, it will appear here.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-dark-900 text-white font-black uppercase rounded-full text-sm hover:bg-dark-700 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-light-100 rounded-lg overflow-hidden relative shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm uppercase tracking-tight leading-tight group-hover:underline cursor-pointer">
                            {item.name}
                          </h4>
                          <p className="font-bold text-sm">{formatPrice(item.price)}</p>
                        </div>
                        <p className="text-dark-500 text-xs mt-1">{item.category}</p>
                        {item.selectedSize && (
                          <p className="text-dark-900 text-xs font-bold mt-1">Size: {item.selectedSize}</p>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-light-300 rounded-full px-2 py-1 gap-3">
                          <button
                            onClick={() => removeItem(item.id, item.selectedSize)}
                            className="p-1 hover:text-red transition-colors cursor-pointer active:scale-75"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black">{item.quantity}</span>
                          <button
                            onClick={() => addItem(item)}
                            className="p-1 hover:text-green transition-colors cursor-pointer active:scale-75"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => deleteItem(item.id, item.selectedSize)}
                          className="text-dark-400 hover:text-red transition-colors cursor-pointer active:scale-75"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-light-200 space-y-4 bg-light-50/50">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Estimated Shipping & Handling</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-base font-black uppercase tracking-tight italic border-t border-light-300 pt-2 mt-2">
                    <span>Total</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="w-full py-4 bg-white border border-dark-900 text-dark-900 text-center font-black uppercase rounded-full text-sm hover:bg-light-100 transition-all"
                  >
                    View Bag
                  </Link>
                  <button
                    className="w-full py-4 bg-dark-900 text-white font-black uppercase rounded-full text-sm hover:bg-dark-700 transition-all flex items-center justify-center gap-2"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
