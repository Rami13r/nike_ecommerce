import 'dotenv/config';
import { db } from '../lib/db';
import { products } from '../lib/db/schema';

const nikeProducts = [
  // Men's Shoes
  {
    name: 'Nike Air Max 270',
    description: 'Featuring the first ever Max Air unit created specifically for Nike Sportswear.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    category: 'Men',
    subcategory: 'Shoes',
    color: 'Red',
  },
  {
    name: 'Nike Air Force 1 \'07',
    description: 'The brilliance lives on in the Nike Air Force 1 \'07, the basketball OG that puts a fresh spin on what you know best.',
    price: 11000,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    category: 'Men',
    subcategory: 'Shoes',
    color: 'White',
  },
  {
    name: 'Nike Dunk Low',
    description: 'Created for the hardwood but taken to the streets, the \'80s b-ball icon returns with perfectly sheened overlays.',
    price: 11500,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
    category: 'Men',
    subcategory: 'Shoes',
    color: 'Panda',
  },
  // Women's Shoes
  {
    name: 'Nike Air Max Pulse',
    description: 'The Air Max Pulse pulls inspiration from the London music scene to bring a tough-built touch to the iconic Air Max line.',
    price: 15500,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    category: 'Women',
    subcategory: 'Shoes',
    color: 'Grey',
  },
  {
    name: 'Nike Air Jordan 1 High',
    description: 'New colors and fresh textures give you an updated AJ1 without losing that iconic look and familiar feel.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80',
    category: 'Women',
    subcategory: 'Shoes',
    color: 'Blue',
  },
  // Kids' Shoes
  {
    name: 'Air Jordan 1 Mid',
    description: 'The Air Jordan 1 Mid brings full-court style and premium comfort to an iconic look.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80',
    category: 'Kids',
    subcategory: 'Shoes',
    color: 'Black',
  },
  // Apparel
  {
    name: 'Nike Dri-FIT Primary',
    description: 'From your first warm-up to your final cool-down, this top has the stretch you need.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    category: 'Men',
    subcategory: 'Clothing',
    color: 'Blue',
  },
  {
    name: 'Nike Sportswear Tech Fleece',
    description: 'The Nike Sportswear Tech Fleece Windrunner Hoodie is a premium layering piece.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    category: 'Men',
    subcategory: 'Clothing',
    color: 'Grey',
  },
  // Adding more for pagination testing
  {
    name: 'Nike Air Max Dawn',
    description: 'Rooted in track DNA, the Air Max Dawn is made with at least 20% recycled material by weight.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80',
    category: 'Men',
    subcategory: 'Shoes',
    color: 'Grey',
  },
  {
    name: 'Nike Court Vision Low',
    description: 'Fast-break style of the \'80s meets the fast-paced culture of today\'s game.',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1628413993904-94ec040f3a40?w=800&q=80',
    category: 'Women',
    subcategory: 'Shoes',
    color: 'White',
  },
  {
    name: 'Nike Air Winflo 10',
    description: 'A balanced ride to help kickstart your run, the Winflo 10 is a neutral trainer.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    category: 'Women',
    subcategory: 'Shoes',
    color: 'Pink',
  },
  {
    name: 'Nike Everyday Cushioned',
    description: 'Power through your workout with the Nike Everyday Cushioned Socks.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1582966579677-2930802bc394?w=800&q=80',
    category: 'Kids',
    subcategory: 'Accessories',
    color: 'White',
  },
];

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing products first
    await db.delete(products);
    console.log('🗑️ Existing products cleared');

    // Insert new products
    await db.insert(products).values(nikeProducts as any);

    console.log('✅ Database seeded successfully!');
    console.log(`📦 Inserted ${nikeProducts.length} Nike products`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
