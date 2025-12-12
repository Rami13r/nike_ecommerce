# Quick Setup Guide

Follow these steps to get your Nike E-Commerce app running:

## Step 1: Get Your Neon Database URL

1. Go to https://neon.tech and sign up for a free account
2. Click "Create Project"
3. Give your project a name (e.g., "nike-ecommerce")
4. Once created, click "Connection Details"
5. Copy the connection string (looks like: postgresql://user:password@host/database?sslmode=require)

## Step 2: Create Environment File

Create a file named `.env.local` in the root of this project with:

```
DATABASE_URL=paste_your_neon_url_here
BETTER_AUTH_SECRET=run_the_command_below_to_generate
BETTER_AUTH_URL=http://localhost:3000
```

To generate a secure secret for BETTER_AUTH_SECRET, run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Push Database Schema

Run this command to create the tables in your Neon database:
```bash
npm run db:push
```

## Step 4: Seed Sample Data

Populate your database with Nike products:
```bash
npm run db:seed
```

## Step 5: Start the App

```bash
npm run dev
```

Visit http://localhost:3000 to see your Nike store! 🎉

## Troubleshooting

**Error: "DATABASE_URL is not set"**
- Make sure you created the `.env.local` file
- Ensure the file is in the root directory (same level as package.json)
- Restart your dev server after creating the file

**Error during db:push**
- Verify your DATABASE_URL is correct
- Make sure your Neon database is active
- Check your internet connection

**No products showing**
- Make sure you ran `npm run db:seed`
- Check the terminal for any error messages
- Verify the seed script completed successfully
