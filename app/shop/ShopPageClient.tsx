'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/lib/db/schema';
import ProductCard from '@/components/ProductCard';

type Product = typeof products.$inferSelect;

interface ShopPageClientProps {
  initialProducts: Product[];
}

function ShopContent({ initialProducts }: ShopPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Smaller for better testing of pagination

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const updateCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (cat === 'All') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${cat}`);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setSelectedColor('All');
    setCurrentPage(1);
    router.push('/shop');
  };

  // Extract unique values for filters
  const categories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))];
  const subcategories = ['All', ...Array.from(new Set(initialProducts.map(p => p.subcategory || 'Other')))];
  const colors = ['All', ...Array.from(new Set(initialProducts.map(p => p.color || 'Other')))];

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedSubcategory !== 'All') {
      result = result.filter(p => p.subcategory === selectedSubcategory);
    }
    if (selectedColor !== 'All') {
      result = result.filter(p => p.color === selectedColor);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [initialProducts, selectedCategory, selectedSubcategory, selectedColor, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-jost">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">New Releases</h1>

          <div className="space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 tracking-wider">Category</h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateCategory(cat)}
                    className={`text-left text-sm transition-colors ${selectedCategory === cat ? 'font-black' : 'text-dark-600 hover:text-black'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategory Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 tracking-wider">Product Type</h3>
              <div className="flex flex-col gap-2">
                {subcategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => { setSelectedSubcategory(sub); setCurrentPage(1); }}
                    className={`text-left text-sm transition-colors ${selectedSubcategory === sub ? 'font-black' : 'text-dark-600 hover:text-black'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 tracking-wider">Color</h3>
              <div className="grid grid-cols-2 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => { setSelectedColor(color); setCurrentPage(1); }}
                    className={`px-3 py-1.5 border text-xs font-bold uppercase transition-all ${selectedColor === color ? 'bg-black text-white border-black' : 'bg-white border-light-300 hover:border-black'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid & Sort */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8 bg-white sticky top-0 z-10 py-4 border-b border-light-100">
            <span className="text-sm text-dark-500 font-medium">
              showing {paginatedProducts.length} of {filteredProducts.length} results
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider">Sort By:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-black uppercase outline-none bg-transparent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low-High</option>
                <option value="price-high">Price: High-Low</option>
              </select>
            </div>
          </div>

          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-light-50 rounded-sm border border-dashed border-light-300">
              <h2 className="text-2xl font-black uppercase italic mb-2">No results found</h2>
              <p className="text-dark-500 mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-black text-white font-black uppercase rounded-full hover:bg-dark-700 transition-all text-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-3 rounded-full border border-light-300 hover:border-black disabled:opacity-30 disabled:hover:border-light-300 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${currentPage === page ? 'bg-black text-white' : 'hover:bg-light-100'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-3 rounded-full border border-light-300 hover:border-black disabled:opacity-30 disabled:hover:border-light-300 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ShopPageClient(props: ShopPageClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ShopContent {...props} />
    </Suspense>
  );
}
