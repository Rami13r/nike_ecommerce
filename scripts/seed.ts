import 'dotenv/config';
import { db } from '../lib/db';
import { products } from '../lib/db/schema';

const nikeProducts = [
  {
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. With its sleek design and comfortable fit, it\'s perfect for all-day wear.',
    price: 15000, // $150.00
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    category: 'Shoes',
  },
  {
    name: 'Nike Dri-FIT Running Shirt',
    description: 'Stay cool and dry with Nike Dri-FIT technology. This lightweight running shirt wicks away sweat to keep you comfortable during your workout.',
    price: 4500, // $45.00
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    category: 'Apparel',
  },
  {
    name: 'Nike React Infinity Run',
    description: 'Designed to help reduce injury, the Nike React Infinity Run continues to push the boundaries of running shoe innovation.',
    price: 16000, // $160.00
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    category: 'Shoes',
  },
  {
    name: 'Nike Sportswear Tech Fleece',
    description: 'Premium fleece with a modern design. The Nike Tech Fleece hoodie provides warmth without the weight.',
    price: 11000, // $110.00
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    category: 'Apparel',
  },
  {
    name: 'Nike Brasilia Training Backpack',
    description: 'Durable and spacious, the Nike Brasilia backpack has multiple compartments to keep your gear organized.',
    price: 3500, // $35.00
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    category: 'Accessories',
  },
  {
    name: 'Nike Air Force 1',
    description: 'The iconic Nike Air Force 1 brings classic basketball style to the streets with premium leather and timeless design.',
    price: 11000, // $110.00
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    category: 'Shoes',
  },
  {
    name: 'Nike Pro Training Shorts',
    description: 'Designed for intense workouts, Nike Pro shorts provide compression and support with moisture-wicking fabric.',
    price: 3000, // $30.00
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
    category: 'Apparel',
  },
  {
    name: 'Nike ZoomX Vaporfly',
    description: 'Built for speed, the Nike ZoomX Vaporfly features responsive cushioning and a carbon fiber plate for maximum energy return.',
    price: 25000, // $250.00
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    category: 'Shoes',
  },
];

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Insert products
    await db.insert(products).values(nikeProducts);

    console.log('✅ Database seeded successfully!');
    console.log(`📦 Inserted ${nikeProducts.length} Nike products`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();

