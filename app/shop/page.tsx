import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopPageClient from './ShopPageClient';

export default async function ShopPage() {
  const allProducts = await db.select().from(products);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ShopPageClient initialProducts={allProducts} />
      <Footer />
    </div>
  );
}
