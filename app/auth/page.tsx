'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await authClient.signIn.email({
          email,
          password,
          callbackURL: '/',
        }, {
          onError: (ctx) => {
            setError(ctx.error.message || 'Login failed');
          }
        });
      } else {
        await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: '/',
        }, {
          onError: (ctx) => {
            setError(ctx.error.message || 'Signup failed');
          }
        });
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-6">
      <Link href="/">
        <svg className="w-16 h-16 fill-black mb-10 hover:opacity-70 transition-opacity" viewBox="0 0 24 24">
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.224.93-.168 1.746.168 2.45.336.703.896 1.055 1.68 1.055.672 0 1.568-.224 2.688-.672L24 7.8z" />
        </svg>
      </Link>

      <div className="w-full max-w-[380px]">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-center mb-8">
          {isLogin ? 'YOUR ACCOUNT FOR EVERYTHING NIKE' : 'BECOME A NIKE MEMBER'}
        </h1>

        {error && (
          <div className="bg-red/10 border border-red text-red p-3 text-sm mb-6 rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-light-400 focus:border-black outline-none transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-light-400 focus:border-black outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-light-400 focus:border-black outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="text-[12px] text-dark-700 leading-relaxed mt-2">
            {isLogin
              ? "By logging in, you agree to Nike's Privacy Policy and Terms of Use."
              : "By creating an account, you agree to Nike's Privacy Policy and Terms of Use."
            }
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 font-bold uppercase tracking-tight mt-4 hover:bg-dark-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Join Us')}
          </button>
        </form>

        <div className="mt-8 pt-8 border-top border-light-300 text-center">
          <p className="text-sm text-dark-700">
            {isLogin ? 'Not a member?' : 'Already a member?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-black font-bold ml-1 underline"
            >
              {isLogin ? 'Join Us' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
