'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getTotalItems());
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        }
      }
    });
  };

  return (
    <header className="nike-navbar">
      {/* Top Strip */}
      <div className="bg-light-200 py-1 px-12 flex justify-end gap-4 text-[11px] font-bold">
        {mounted && !isPending && session ? (
          <>
            <span className="text-dark-900 border-r border-light-400 pr-4">Hi, {session.user.name}</span>
            <button onClick={handleSignOut} className="hover:opacity-70">Sign Out</button>
          </>
        ) : (
          <Link href="/auth" className="hover:opacity-70">Join Us / Sign In</Link>
        )}
        <Link href="#" className="hover:opacity-70">Help</Link>
      </div>

      <div className="nike-navbar__container">
        {/* Nike Logo */}
        <Link href="/">
          <svg className="nike-navbar__logo" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.224.93-.168 1.746.168 2.45.336.703.896 1.055 1.68 1.055.672 0 1.568-.224 2.688-.672L24 7.8z" />
          </svg>
        </Link>

        {/* Navigation Links */}
        <nav className="nike-navbar__nav">
          <Link href="#" className="nike-navbar__link">Men</Link>
          <Link href="#" className="nike-navbar__link">Women</Link>
          <Link href="#" className="nike-navbar__link">Kids</Link>
          <Link href="#" className="nike-navbar__link">Collections</Link>
          <Link href="#" className="nike-navbar__link">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="nike-navbar__actions">
          <Link href="#" className="nike-navbar__search text-sm">Search</Link>
          <Link href="#" className="nike-navbar__cart text-sm">
            Cart ({mounted ? cartCount : 0})
          </Link>
        </div>
      </div>
    </header>
  );
}
