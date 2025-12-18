import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await db.select().from(products);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Top Announcement Banner */}
        <section className="bg-light-200 py-3 px-6 text-center text-[12px] font-medium border-b border-light-300">
          <p className="uppercase tracking-tight">FREE SHIPPING FOR MEMBERS. <a href="#" className="underline font-bold ml-1">JOIN NOW</a></p>
        </section>

        {/* Hero Section */}
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="relative w-full aspect-[21/9] bg-light-300 overflow-hidden rounded-sm hover:opacity-95 transition-opacity cursor-pointer group">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600&q=80"
              alt="Featured Nike"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 flex items-end p-12">
              <div className="text-white">
                <p className="font-bold uppercase tracking-widest text-sm mb-2">Nike Air Max Dn</p>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">FEEL THE UNREAL</h1>
                <button className="bg-white text-black px-7 py-2.5 rounded-full font-bold hover:bg-light-300 transition-all">Shop Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* The Latest Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter">The Latest</h2>
          <div className="relative w-full aspect-[16/7] overflow-hidden rounded-sm group cursor-pointer">
            <img
              src="/trending.png"
              alt="Active Performance and Lifestyle"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-10 left-10 flex gap-4">
              <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-light-300">Shop Active</button>
              <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-light-300">Shop Lifestyle</button>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl uppercase font-black tracking-tighter">New Arrivals</h2>
            <a href="#" className="text-sm font-bold border-b-2 border-transparent hover:border-black transition-all">View All</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Shop By Sport Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter">Shop by Sport</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative aspect-[4/5] bg-light-200 overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" alt="Running" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-6 left-6 text-white drop-shadow-lg">
                <p className="font-black text-2xl uppercase">Running</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-light-200 overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80" alt="Basketball" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-6 left-6 text-white drop-shadow-lg">
                <p className="font-black text-2xl uppercase">Basketball</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-light-200 overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80" alt="Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-6 left-6 text-white drop-shadow-lg">
                <p className="font-black text-2xl uppercase">Training</p>
              </div>
            </div>
          </div>
        </section>

        {/* Member Benefits Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-20 mb-10">
          <div className="relative w-full aspect-[21/9] bg-dark-900 overflow-hidden rounded-sm flex items-center">
            <img
              src="/member-bg.png"
              alt="Nike Membership"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 p-12 lg:p-24 max-w-2xl">
              <h2 className="text-white text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-4 italic">BECOME A MEMBER</h2>
              <p className="text-white/80 text-lg lg:text-xl mb-8">Sign up for free and get personal access to the best of Nike: products, communities, and coaching.</p>
              <div className="flex gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-light-300">Join Us</button>
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-light-300">Sign In</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
