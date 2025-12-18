'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth');
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jost">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar navigation */}
          <div className="w-full md:w-64 flex flex-col gap-6">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Account</h1>
            <nav className="flex flex-col gap-4">
              <button className="text-left font-bold text-lg border-l-4 border-black pl-4">Profile</button>
              <button className="text-left text-lg text-dark-700 hover:text-black pl-4 border-l-4 border-transparent">Orders</button>
              <button className="text-left text-lg text-dark-700 hover:text-black pl-4 border-l-4 border-transparent">Favorites</button>
              <button className="text-left text-lg text-dark-700 hover:text-black pl-4 border-l-4 border-transparent">Member Rewards</button>
              <button className="text-left text-lg text-dark-700 hover:text-black pl-4 border-l-4 border-transparent">Settings</button>
            </nav>
          </div>

          {/* Content area */}
          <div className="flex-1">
            <div className="bg-light-200 p-8 rounded-sm mb-12 flex items-center gap-6">
              <div className="w-24 h-24 bg-light-400 rounded-full flex items-center justify-center font-black text-2xl uppercase italic">
                {session.user.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">{session.user.name}</h2>
                <p className="text-dark-700">Nike Member since {new Date(session.user.createdAt).getFullYear()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Member Benefits */}
              <div className="border border-light-300 p-8 rounded-sm">
                <h3 className="text-xl font-black uppercase mb-6 tracking-tighter italic">Member Benefits</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-4 items-start text-sm">
                    <div className="mt-1 w-2 h-2 bg-black rounded-full shrink-0" />
                    <p><strong>Free Shipping:</strong> As a member, you get free standard shipping on all orders.</p>
                  </li>
                  <li className="flex gap-4 items-start text-sm">
                    <div className="mt-1 w-2 h-2 bg-black rounded-full shrink-0" />
                    <p><strong>Exclusive Products:</strong> Access to Member-only shoes and gear drops.</p>
                  </li>
                  <li className="flex gap-4 items-start text-sm">
                    <div className="mt-1 w-2 h-2 bg-black rounded-full shrink-0" />
                    <p><strong>Nike Community:</strong> Access to expert training, wellness guidance, and NRC/NTC events.</p>
                  </li>
                </ul>
                <button className="mt-8 px-6 py-2 border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors">
                  Browse Rewards
                </button>
              </div>

              {/* Account Details */}
              <div className="border border-light-300 p-8 rounded-sm">
                <h3 className="text-xl font-black uppercase mb-6 tracking-tighter italic">Account Details</h3>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[12px] font-bold uppercase text-dark-500 block mb-1">Email Address</label>
                    <p className="text-lg font-medium">{session.user.email}</p>
                  </div>
                  <div>
                    <label className="text-[12px] font-bold uppercase text-dark-500 block mb-1">Password</label>
                    <p className="text-lg font-medium">••••••••••••</p>
                    <button className="text-sm font-bold underline mt-1">Change Password</button>
                  </div>
                  <div>
                    <label className="text-[12px] font-bold uppercase text-dark-500 block mb-1">Country / Region</label>
                    <p className="text-lg font-medium">Croatia</p>
                  </div>
                </div>
                <button className="mt-8 px-6 py-2 bg-black text-white font-bold uppercase text-sm hover:bg-dark-700 transition-colors">
                  Edit Account
                </button>
              </div>
            </div>

            {/* Order History placeholder */}
            <div className="mt-12 border-t border-light-300 pt-12">
              <h3 className="text-2xl font-black uppercase mb-8 tracking-tighter">My Recent Orders</h3>
              <div className="bg-light-200 border border-dashed border-light-400 p-20 text-center rounded-sm">
                <p className="text-dark-700 mb-6 italic">You haven&apos;t placed any orders yet.</p>
                <button
                  onClick={() => router.push('/')}
                  className="px-8 py-3 bg-black text-white font-black uppercase rounded-full hover:bg-dark-700 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
