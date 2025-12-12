# Nike E-Commerce Application

A modern e-commerce application built with Next.js 15, TypeScript, Tailwind CSS, Better Auth, Neon PostgreSQL, Drizzle ORM, and Zustand.

## 🚀 Features

- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for modern, responsive styling
- **Better Auth** for authentication
- **Neon PostgreSQL** serverless database
- **Drizzle ORM** for type-safe database queries
- **Zustand** for state management
- Premium Nike product catalog with database integration

## 📋 Prerequisites

- Node.js 18+ installed
- A Neon PostgreSQL database account (free tier available at [neon.tech](https://neon.tech))

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=your_neon_database_url_here

# Better Auth
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
```

**Getting your Neon Database URL:**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (it should look like: `postgresql://user:password@host/database?sslmode=require`)
4. Paste it as the `DATABASE_URL` value

**Generating Better Auth Secret:**
Run this command to generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Install Dependencies

Dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### 3. Set Up Database

Push the schema to your Neon database:

```bash
npm run db:push
```

### 4. Seed the Database

Populate the database with sample Nike products:

```bash
npm run db:seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nike_ecommerce/
├── app/
│   ├── api/
│   │   └── products/
│   │       └── route.ts          # Products API endpoint
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage with product listing
├── components/
│   └── ProductCard.tsx           # Product card component
├── lib/
│   ├── db/
│   │   ├── index.ts              # Database connection
│   │   └── schema.ts             # Database schema
│   ├── store/
│   │   └── productStore.ts       # Zustand store
│   └── auth.ts                   # Better Auth configuration
├── scripts/
│   └── seed.ts                   # Database seeding script
├── drizzle.config.ts             # Drizzle Kit configuration
└── package.json
```

## 🗄️ Database Schema

### Products Table

| Column      | Type      | Description                    |
|-------------|-----------|--------------------------------|
| id          | serial    | Primary key                    |
| name        | text      | Product name                   |
| description | text      | Product description            |
| price       | integer   | Price in cents                 |
| image       | text      | Product image URL              |
| category    | text      | Product category               |
| createdAt   | timestamp | Creation timestamp             |

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate migrations
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with sample data

## 🎨 Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: Better Auth
- **State Management**: Zustand
- **Image Optimization**: Next.js Image component

## 🔐 Authentication

Better Auth is configured but not yet implemented in the UI. The authentication setup is ready in `lib/auth.ts` and can be integrated into your application as needed.

## 📝 Notes

- All prices are stored in cents to avoid floating-point issues
- Images are optimized using Next.js Image component
- The application uses Server Components for optimal performance
- Database queries are executed on the server for security

## 🚀 Deployment

This application can be deployed to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.
