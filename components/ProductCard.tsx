'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';

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
  createdAt?: any;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  // Simulate color count (in real app, this would come from database)
  const colorCount = Math.floor(Math.random() * 5) + 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="product-card group block">
      {/* Image Container */}
      <div className="product-card__image-container">
        {/* Best Seller Badge - show randomly for demo */}
        {product.id % 3 === 0 && (
          <div className="product-card__badge">Best Seller</div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="product-card__image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Add to Cart Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/80 backdrop-blur-sm z-10">
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-dark-900 text-white font-medium hover:bg-dark-700 transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="product-card__content">
        <h3 className="product-card__title text-dark-900 font-medium">{product.name}</h3>
        <p className="product-card__category text-dark-700">{product.category}</p>
        <p className="product-card__colors text-dark-700">{colorCount} Colour{colorCount > 1 ? 's' : ''}</p>
        <p className="product-card__price text-dark-900 font-medium mt-2">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

