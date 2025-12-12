import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await db.select().from(products);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.224.93-.168 1.746.168 2.45.336.703.896 1.055 1.68 1.055.672 0 1.568-.224 2.688-.672L24 7.8z" />
              </svg>
              <span className="text-2xl font-bold tracking-tight">NIKE</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-slate-700 hover:text-black transition-colors font-medium">New & Featured</a>
              <a href="#" className="text-slate-700 hover:text-black transition-colors font-medium">Men</a>
              <a href="#" className="text-slate-700 hover:text-black transition-colors font-medium">Women</a>
              <a href="#" className="text-slate-700 hover:text-black transition-colors font-medium">Kids</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-fade-in">
              JUST DO IT
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
              Discover the latest Nike innovations designed to elevate your performance
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Products</h2>
          <p className="text-slate-600 text-lg">Explore our collection of premium Nike gear</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">GET HELP</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Order Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Delivery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">ABOUT NIKE</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="text-slate-400">© 2025 Nike, Inc. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
