'use client';

import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: Date;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  // Simulate color count (in real app, this would come from database)
  const colorCount = Math.floor(Math.random() * 5) + 1;

  return (
    <div className="product-card">
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
      </div>

      {/* Content */}
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__category">{product.category}</p>
        <p className="product-card__colors">{colorCount} Colour{colorCount > 1 ? 's' : ''}</p>
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
