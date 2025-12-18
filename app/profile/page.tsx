'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

type TabType = 'profile' | 'orders' | 'favorites' | 'rewards' | 'settings';

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newGender, setNewGender] = useState('');
  const [newShoeSize, setNewShoeSize] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');
  const router = useRouter();

  const handleUpdateProfile = async () => {
    setUpdating(true);
    setUpdateMsg('');

    try {
      await authClient.updateUser({
        name: newName,
        image: newImage,
        // @ts-ignore
        dob: newDob,
        // @ts-ignore
        gender: newGender,
        // @ts-ignore
        shoeSize: newShoeSize,
      }, {
        onSuccess: () => {
          // Changing email is separate in Better Auth but let's assume we update name/image here
          setUpdateMsg('Profile updated successfully!');
          setTimeout(() => {
            setIsEditing(false);
            setUpdateMsg('');
            router.refresh();
          }, 2000);
        },
        onError: (ctx) => {
          setUpdateMsg(ctx.error.message || 'Update failed');
        }
      });
    } catch (err) {
      setUpdateMsg('Something went wrong');
    } finally {
      setUpdating(false);
    }
  };

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

  const navItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'orders', label: 'Orders' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'rewards', label: 'Member Rewards' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-white font-jost">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar navigation */}
          <div className="w-full md:w-64 flex flex-col gap-6">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Account</h1>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`text-left text-lg py-2 pl-4 border-l-4 transition-all ${activeTab === item.id
                    ? 'font-black border-black text-black'
                    : 'border-transparent text-dark-500 hover:text-black hover:border-light-400'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-10 p-6 bg-light-100 rounded-sm">
              <p className="text-sm font-bold uppercase mb-2">Need Help?</p>
              <Link href="#" className="text-xs text-dark-700 underline block mb-1">Shipping & Delivery</Link>
              <Link href="#" className="text-xs text-dark-700 underline block mb-1">Returns</Link>
              <Link href="#" className="text-xs text-dark-700 underline block">Contact Us</Link>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1">
            {/* Header Banner */}
            <div className="bg-dark-900 p-8 rounded-sm mb-12 flex items-center gap-6 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full opacity-10 pointer-events-none">
                <svg className="h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 L100 0 L100 100 Z" fill="white" />
                </svg>
              </div>
              <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center font-black text-3xl italic shrink-0 overflow-hidden">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name || 'User profile'} className="w-full h-full object-cover" />
                ) : (
                  session.user.name?.charAt(0) || 'U'
                )}
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight italic">{session.user.name}</h2>
                <p className="text-white/70 uppercase text-xs font-bold tracking-widest">Nike Member since {new Date(session.user.createdAt).getFullYear()}</p>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'profile' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="border border-light-300 p-8 rounded-sm hover:border-dark-300 transition-colors">
                      <h3 className="text-xl font-black uppercase mb-6 tracking-tighter italic">Member Benefits</h3>
                      <ul className="flex flex-col gap-4">
                        <li className="flex gap-4 items-start text-sm">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                          <p><strong>Free Standard Shipping:</strong> Automatically applied at checkout for all orders.</p>
                        </li>
                        <li className="flex gap-4 items-start text-sm">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                          <p><strong>Member-only Products:</strong> First access to most anticipated drops.</p>
                        </li>
                        <li className="flex gap-4 items-start text-sm">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                          <p><strong>Anniversary Gift:</strong> Every year on your sign-up date, we'll send you something special.</p>
                        </li>
                      </ul>
                    </div>

                    <div className="border border-light-300 p-8 rounded-sm hover:border-dark-300 transition-colors">
                      <h3 className="text-xl font-black uppercase mb-6 tracking-tighter italic">Account Details</h3>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Full Name</label>
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full px-4 py-2 border border-light-400 focus:border-black outline-none font-bold"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Gender</label>
                              <select
                                value={newGender}
                                onChange={(e) => setNewGender(e.target.value)}
                                className="w-full px-4 py-2 border border-light-400 focus:border-black outline-none font-bold"
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Date of Birth</label>
                              <input
                                type="date"
                                value={newDob}
                                onChange={(e) => setNewDob(e.target.value)}
                                className="w-full px-4 py-2 border border-light-400 focus:border-black outline-none font-bold"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Shoe Size (US)</label>
                              <input
                                type="text"
                                value={newShoeSize}
                                onChange={(e) => setNewShoeSize(e.target.value)}
                                placeholder="e.g. 10.5"
                                className="w-full px-4 py-2 border border-light-400 focus:border-black outline-none font-bold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Profile Image URL</label>
                            <input
                              type="text"
                              value={newImage}
                              onChange={(e) => setNewImage(e.target.value)}
                              placeholder="https://..."
                              className="w-full px-4 py-2 border border-light-400 focus:border-black outline-none font-bold"
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={handleUpdateProfile}
                              disabled={updating}
                              className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-dark-700 disabled:opacity-50"
                            >
                              {updating ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                              onClick={() => setIsEditing(false)}
                              className="px-6 py-2 border border-light-400 text-[10px] font-black uppercase tracking-widest hover:border-black"
                            >
                              Cancel
                            </button>
                          </div>
                          {updateMsg && <p className="text-[10px] font-bold text-green-600 uppercase">{updateMsg}</p>}
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Full Name</label>
                              <p className="font-bold">{session.user.name}</p>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Email</label>
                              <p className="font-bold text-sm truncate">{session.user.email}</p>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Gender</label>
                              {/* @ts-ignore */}
                              <p className="font-bold">{session.user.gender || 'Not specified'}</p>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Shoe Size</label>
                              {/* @ts-ignore */}
                              <p className="font-bold">{session.user.shoeSize || 'Not specified'}</p>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-dark-400 tracking-widest block mb-1">Date of Birth</label>
                              {/* @ts-ignore */}
                              <p className="font-bold">{session.user.dob ? new Date(session.user.dob).toLocaleDateString() : 'Not specified'}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setNewName(session.user.name || '');
                              setNewEmail(session.user.email || '');
                              setNewImage(session.user.image || '');
                              // @ts-ignore
                              setNewDob(session.user.dob || '');
                              // @ts-ignore
                              setNewGender(session.user.gender || '');
                              // @ts-ignore
                              setNewShoeSize(session.user.shoeSize || '');
                              setIsEditing(true);
                            }}
                            className="text-xs font-bold underline uppercase tracking-tight hover:text-dark-600 transition-colors"
                          >
                            Edit Personal Info
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black uppercase mb-6 tracking-tighter italic">Recently Viewed</h3>
                    <div className="p-12 border border-dashed border-light-400 text-center rounded-sm bg-light-50">
                      <p className="text-dark-500 italic text-sm">Items you view will appear here.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-black uppercase mb-8 tracking-tighter italic">Order History</h3>
                  <div className="bg-light-100 p-16 text-center rounded-sm border border-light-200">
                    <div className="w-16 h-16 bg-light-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2">No Orders Yet</h4>
                    <p className="text-dark-600 mb-8 max-w-md mx-auto italic">Looks like you haven't made any orders yet. When you do, they'll show up here for you to track and manage.</p>
                    <button
                      onClick={() => router.push('/')}
                      className="px-10 py-3 bg-black text-white font-black uppercase rounded-full hover:bg-dark-700 transition-all text-sm tracking-tight"
                    >
                      Start Shopping
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-black uppercase mb-8 tracking-tighter italic">Favorites</h3>
                  <div className="bg-light-100 p-16 text-center rounded-sm border border-light-200">
                    <div className="w-16 h-16 bg-light-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-black opacity-40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2">Nothing Saved Yet</h4>
                    <p className="text-dark-600 mb-8 max-w-md mx-auto italic">Items added to your Favorites will be saved here so you can easily find them again.</p>
                    <button
                      onClick={() => router.push('/')}
                      className="px-10 py-3 border-2 border-black font-black uppercase rounded-full hover:bg-black hover:text-white transition-all text-sm tracking-tight"
                    >
                      Discover New Gear
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'rewards' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-black uppercase mb-8 tracking-tighter italic">Member Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-light-100 to-light-200 p-8 border border-light-300 relative group overflow-hidden">
                      <div className="relative z-10">
                        <div className="bg-black text-white text-[10px] font-black px-2 py-1 rounded-sm w-fit mb-4">ACTIVE</div>
                        <h4 className="text-xl font-black uppercase mb-2 tracking-tighter">Welcome Reward</h4>
                        <p className="text-sm text-dark-700 mb-6 italic">Enjoy 10% off your next purchase as a new member.</p>
                        <button className="text-xs font-black uppercase tracking-widest underline decoration-2 underline-offset-4">Copy Code: WELCOME10</button>
                      </div>
                      <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-40 h-40 border-[20px] border-black/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    <div className="bg-light-100 p-8 border border-light-300 border-dashed flex flex-col items-center justify-center text-center opacity-60">
                      <p className="text-sm font-bold uppercase tracking-widest text-dark-400 mb-2 italic">Coming Soon</p>
                      <h4 className="text-lg font-black uppercase tracking-tighter mb-1">Birthday Bonus</h4>
                      <p className="text-xs text-dark-600">We celebrate with you every year.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-black uppercase mb-8 tracking-tighter italic">Settings</h3>
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-widest border-b border-light-300 pb-2">Profile Visibility</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold">Member Profile</p>
                          <p className="text-xs text-dark-600">Allow other members to see your sport interests.</p>
                        </div>
                        <div className="w-12 h-6 bg-dark-800 rounded-full relative p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-widest border-b border-light-300 pb-2">Communication</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-5 h-5 border-2 border-black rounded-sm flex items-center justify-center shrink-0 mt-0.5 cursor-pointer">
                            <div className="w-2.5 h-2.5 bg-black" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Email Subscriptions</p>
                            <p className="text-xs text-dark-600 italic">Get the latest on gear drops, promos, and more.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-5 h-5 border-2 border-light-400 rounded-sm shrink-0 mt-0.5 cursor-pointer" />
                          <div>
                            <p className="font-bold text-sm">Nike App Notifications</p>
                            <p className="text-xs text-dark-600 italic">Get instant alerts about drops and your orders.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button className="px-6 py-2 border border-red text-red text-xs font-black uppercase tracking-widest hover:bg-red hover:text-white transition-all">Deactivate Account</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
