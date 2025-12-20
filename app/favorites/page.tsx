import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FavoritesPageClient from './FavoritesPageClient';

export const metadata = {
  title: 'My Favourites | Nike Redesign',
  description: 'View your favorited Nike products and gear.',
};

export default function FavoritesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <FavoritesPageClient />
      </main>
      <Footer />
    </div>
  );
}
