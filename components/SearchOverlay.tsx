'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Air Force 1',
  'Jordan 1',
  'Air Max',
  'Dunk',
  'Running Shoes'
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all products when search opens for instant filtering
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          setAllProducts(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });

      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery(''); // Reset query when closed
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    ).slice(0, 8); // Show top 8 instant results
  }, [query, allProducts]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-white flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 lg:px-12 py-6 border-b border-light-200">
            {/* Logo (Static Nike Swoosh) */}
            <Link href="/" onClick={onClose}>
              <svg className="w-16 h-16 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.224.93-.168 1.746.168 2.45.336.703.896 1.055 1.68 1.055.672 0 1.568-.224 2.688-.672L24 7.8z" />
              </svg>
            </Link>

            <div className="flex-1 max-w-3xl mx-auto px-6 relative">
              <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-dark-400 w-6 h-6" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-light-100 rounded-full py-4 pl-14 pr-6 text-xl font-medium outline-none border-none focus:bg-light-200 transition-colors"
              />
              {loading && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-dark-300 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-3 hover:bg-light-200 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-10 font-jost">
            <div className="max-w-7xl mx-auto">

              {!query.trim() ? (
                /* Default View: Popular Searches */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 py-10 lg:py-20">
                  <div className="space-y-8">
                    <h3 className="text-dark-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Popular Search Terms
                    </h3>
                    <div className="flex flex-col gap-4">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter hover:translate-x-4 transition-transform text-left group flex items-center gap-4"
                        >
                          {term}
                          <ArrowRight className="w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-light-100 rounded-3xl p-10 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <Search className="w-10 h-10 text-dark-300" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase italic tracking-tight">Need help finding it?</h4>
                      <p className="text-dark-500 mt-2 max-w-xs">Search for your favorite models, colorways, or sport categories.</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Search Results View */
                <div className="space-y-12 py-6">
                  <div className="flex justify-between items-end">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-dark-500">
                      Quick Results ({filteredResults.length})
                    </h3>
                    {filteredResults.length > 0 && (
                      <button
                        onClick={() => handleSearch(query)}
                        className="text-sm font-black uppercase tracking-tight italic underline underline-offset-4 hover:opacity-70 transition-opacity"
                      >
                        View All Results
                      </button>
                    )}
                  </div>

                  {filteredResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                      {filteredResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="group"
                        >
                          <div className="aspect-square bg-light-100 rounded-2xl overflow-hidden relative mb-4">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-tight group-hover:underline">{product.name}</h4>
                            <p className="text-dark-500 text-xs font-medium">{product.category}</p>
                            <p className="font-bold text-sm mt-1">{formatPrice(product.price)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center space-y-4">
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter">No results for &quot;{query}&quot;</h2>
                      <p className="text-dark-500">We couldn&apos;t find anything matching your search. Try another term or browse our collection.</p>
                      <button
                        onClick={() => setQuery('')}
                        className="px-8 py-3 bg-dark-900 text-white font-black uppercase rounded-full text-sm hover:bg-dark-700 transition-all mt-4"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
