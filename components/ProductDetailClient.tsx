'use client';

import { useState } from 'react';
import Image from 'next/image';
import { products } from '@/lib/db/schema';
import { useCartStore } from '@/lib/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

type Product = typeof products.$inferSelect;

interface ProductDetailClientProps {
  product: Product;
}

const SIZES = ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12', 'US 13'];

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }

    setAdding(true);
    addItem({
      ...product,
      selectedSize: selectedSize
    });

    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setShowError(false);
      setTimeout(() => setAdded(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-12 py-10 font-jost">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Left Side: Images */}
        <div className="flex-1 space-y-4">
          <div className="bg-light-100 rounded-sm overflow-hidden aspect-[4/5] relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          {/* Mock extra images grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-light-100 aspect-square rounded-sm overflow-hidden relative">
              <Image src={product.image} alt={product.name} fill className="object-cover opacity-80" />
            </div>
            <div className="bg-light-100 aspect-square rounded-sm overflow-hidden relative">
              <Image src={product.image} alt={product.name} fill className="object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>

        {/* Right Side: Product Info (Sticky) */}
        <div className="w-full lg:w-[440px] space-y-8 lg:sticky lg:top-24 h-fit">
          <div className="space-y-2">
            <p className="font-bold text-dark-800 uppercase text-sm tracking-wide">
              {product.category} {product.subcategory && `• ${product.subcategory}`}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic leading-none">
              {product.name}
            </h1>
            <p className="text-xl font-bold mt-2">{formatPrice(product.price)}</p>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-bold uppercase tracking-tight ${showError && !selectedSize ? 'text-red-600' : ''}`}>
                Select Size
              </span>
              <button className="text-sm font-bold text-dark-400 underline hover:text-black">Size Guide</button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-bold border rounded-sm transition-all
                    ${selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-light-300 hover:border-black'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {showError && !selectedSize && (
              <p className="text-[10px] font-black uppercase text-red-600 tracking-widest animate-pulse">
                Please select a size
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleAddToBag}
              disabled={adding}
              className={`w-full py-5 font-black uppercase tracking-widest text-sm rounded-full transition-all active:scale-95 duration-75 flex items-center justify-center gap-2
                ${added
                  ? 'bg-green text-white'
                  : 'bg-black text-white hover:bg-dark-800'
                } disabled:opacity-70`}
            >
              <AnimatePresence mode="wait">
                {adding ? (
                  <motion.div
                    key="adding"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  />
                ) : added ? (
                  <motion.span
                    key="added"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                  >
                    Added to Bag
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Add to Bag
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              className="w-full py-5 border border-light-300 font-black uppercase tracking-widest text-sm rounded-full hover:border-black transition-colors flex items-center justify-center gap-2"
            >
              Favorite
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="space-y-4 pt-6 border-t border-light-100">
            <p className="text-sm leading-relaxed text-dark-600">
              {product.description}
            </p>
            <ul className="text-xs font-bold space-y-2 text-dark-800">
              <li>Color Shown: {product.color || 'Multi-Color'}</li>
              <li>Style: FJ4557-100</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
