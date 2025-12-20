import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetailClient from '@/components/ProductDetailClient';
import ProductCard from '@/components/ProductCard';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) {
    notFound();
  }

  // Fetch related products (same category)
  const relatedProducts = await db.query.products.findMany({
    where: eq(products.category, product.category),
    limit: 5, // Fetch 5 to ensure we have 4 if the current one is included
  });

  // Filter out the current product and limit to 4
  const filteredRelated = relatedProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 py-10">
        <ProductDetailClient product={product} />

        {/* You Might Also Like */}
        {filteredRelated.length > 0 && (
          <div className="mt-24">
            <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-10">You Might Also Like</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRelated.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
