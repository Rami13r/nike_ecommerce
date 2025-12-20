'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';
import { useFavoritesStore } from '@/lib/store/favoritesStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

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
}

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
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorited = isFavorite(product.id);

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

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-8 lg:py-16 font-jost">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

        {/* Left Side: Image Gallery */}
        <div className="flex-1 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-light-200 rounded-xl overflow-hidden aspect-[1/1] sm:aspect-[4/5] relative group"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Tag Overlay */}
            {product.id % 2 === 0 && (
              <div className="absolute top-6 left-6 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-dark-900 shadow-sm">
                Sustainable Materials
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-light-200 aspect-square rounded-xl overflow-hidden relative group cursor-zoom-in"
            >
              <Image src={product.image} alt={product.name} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-light-200 aspect-square rounded-xl overflow-hidden relative group cursor-zoom-in"
            >
              <Image src={product.image} alt={product.name} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity scale-125" />
            </motion.div>
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="w-full lg:w-[480px] space-y-8 h-fit lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div className="flex flex-col gap-1">
              <span className="text-red font-bold text-sm uppercase tracking-wide">
                Best Seller
              </span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-[0.9] italic text-dark-900">
                {product.name}
              </h1>
              <p className="text-lg font-medium text-dark-700 mt-2">
                {product.category} {product.subcategory && `• ${product.subcategory}`}
              </p>
            </div>
            <div className="flex items-baseline gap-3 pt-2">
              <p className="text-2xl font-black">{formatPrice(product.price)}</p>
              <p className="text-sm text-dark-500 line-through">$240.00</p>
              <span className="text-green font-bold text-sm">25% off</span>
            </div>
          </motion.div>

          {/* Color Selection (Simulated) */}
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-tight">Select Color</p>
            <div className="flex gap-2">
              <div className="w-16 h-16 border-2 border-black rounded-lg overflow-hidden relative p-0.5 cursor-pointer">
                <div className="w-full h-full relative rounded-md overflow-hidden bg-light-200">
                  <Image src={product.image} alt="Color 1" fill className="object-cover" />
                </div>
              </div>
              <div className="w-16 h-16 border border-light-300 hover:border-dark-400 rounded-lg overflow-hidden relative p-0.5 cursor-pointer">
                <div className="w-full h-full relative rounded-md overflow-hidden bg-light-200 grayscale">
                  <Image src={product.image} alt="Color 2" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-bold uppercase tracking-tight ${showError && !selectedSize ? 'text-red' : ''}`}>
                Select Size
              </span>
              <button className="text-sm font-bold text-dark-500 hover:text-black underline-offset-4 hover:underline transition-all">
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setShowError(false);
                  }}
                  className={`py-4 text-sm font-bold border rounded-lg transition-all duration-200
                    ${selectedSize === size
                      ? 'border-dark-900 bg-dark-900 text-white shadow-lg'
                      : 'border-light-300 hover:border-dark-900 text-dark-700'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {showError && !selectedSize && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] font-black uppercase text-red tracking-widest mt-2 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please select a size
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleAddToBag}
              disabled={adding}
              className={`w-full py-5 font-black uppercase tracking-widest text-sm rounded-full transition-all active:scale-[0.98] duration-200 flex items-center justify-center gap-2 shadow-sm
                ${added
                  ? 'bg-green text-white'
                  : 'bg-dark-900 text-white hover:bg-dark-700'
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
                  <motion.div
                    key="added"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Bag
                  </motion.div>
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
              onClick={handleToggleFavorite}
              className={`w-full py-5 border font-black uppercase tracking-widest text-sm rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer
                ${favorited
                  ? 'border-red text-red bg-red/5'
                  : 'border-light-300 text-dark-900 hover:border-dark-900 hover:bg-light-100'
                }`}
            >
              {favorited ? 'Favorited' : 'Favorite'}
              <Heart className={`w-5 h-5 ${favorited ? 'fill-red text-red' : ''}`} />
            </button>
          </div>

          {/* Additional Info Cards */}
          <div className="space-y-6 pt-10">
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-dark-800 font-medium">
                {product.description}
              </p>
              <p className="text-sm text-dark-600 underline cursor-pointer font-bold">Read More</p>
            </div>

            <ul className="text-sm font-medium space-y-3 text-dark-900 border-t border-light-200 pt-6">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-dark-900 rounded-full" />
                Color Shown: {product.color || 'Multi-Color'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-dark-900 rounded-full" />
                Style: FJ{product.id}557-100
              </li>
            </ul>

            {/* Shipping & Returns Section */}
            <div className="space-y-4 pt-10 border-t border-light-200">
              <div className="group cursor-pointer">
                <div className="flex justify-between items-center py-2">
                  <h3 className="text-lg font-black uppercase tracking-tight italic">Shipping & Returns</h3>
                  <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="text-sm text-dark-700 space-y-2 mt-2">
                  <p>Free standard shipping on orders over $150. Returns are free for Nike Members.</p>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex justify-between items-center py-2">
                  <h3 className="text-lg font-black uppercase tracking-tight italic">Reviews (48)</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex text-dark-900">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-current' : 'text-light-400'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

