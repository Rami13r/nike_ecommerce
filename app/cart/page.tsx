import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPageClient from './CartPageClient';

export const metadata = {
  title: 'Your Bag | Nike Store',
  description: 'Review the items in your shopping bag and proceed to checkout.',
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <CartPageClient />
      </main>
      <Footer />
    </div>
  );
}
