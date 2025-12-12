
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await db.select().from(products);

  return (
    <div className="min-h-screen bg-light-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Products Section */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ 
              fontSize: 'var(--text-heading-2)', 
              lineHeight: 'var(--text-heading-2--line-height)',
              fontWeight: 'var(--text-heading-2--font-weight)',
              color: 'var(--color-dark-900)',
              marginBottom: '0.5rem'
            }}>
              Best Sellers
            </h1>
            <p style={{
              fontSize: 'var(--text-lead)',
              lineHeight: 'var(--text-lead--line-height)',
              color: 'var(--color-dark-700)'
            }}>
              Explore our most popular Nike products
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

