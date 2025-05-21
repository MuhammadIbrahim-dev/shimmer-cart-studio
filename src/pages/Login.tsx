
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else {
        setError(err.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm">
          <div>
            <h2 className="text-center text-3xl font-bold">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Or{' '}
              <Link to="/signup" className="text-primary hover:text-primary/90">
                create a new account
              </Link>
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/90">
                    Forgot your password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full text-white"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full"
                disabled={loading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <g transform="matrix(1, 0, 0, 1, 0, 0)">
                    <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z" fill="currentColor"></path>
                  </g>
                </svg>
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
