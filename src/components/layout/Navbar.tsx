
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import CartSidebar from '../cart/CartSidebar';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page
    window.location.href = `/products?search=${searchTerm}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">ShopHub</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="hover:text-primary transition-colors">Shop</Link>
            <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block w-1/3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-4 pr-10 rounded-full bg-secondary border-none focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative group hidden md:block">
                <Button variant="ghost" className="p-1">
                  <User size={20} />
                </Button>
                <div className="absolute right-0 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 transform scale-0 group-hover:scale-100 transition-transform origin-top-right">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium">Hello, {currentUser.displayName || currentUser.email}</p>
                  </div>
                  <div className="p-2">
                    <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md">My Account</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md">Orders</Link>
                    <button 
                      onClick={() => logout()} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex items-center hover:text-primary transition-colors">
                <User size={20} className="mr-1" />
                <span>Login</span>
              </Link>
            )}

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 hover:text-primary transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="p-1 md:hidden hover:text-primary transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-primary">Home</Link>
              <Link to="/products" className="hover:text-primary">Shop</Link>
              <Link to="/categories" className="hover:text-primary">Categories</Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative my-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 pl-4 pr-10 rounded-full bg-secondary border-none focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                >
                  <Search size={18} />
                </button>
              </form>

              {/* User links for mobile */}
              {currentUser ? (
                <>
                  <Link to="/account" className="hover:text-primary">My Account</Link>
                  <Link to="/orders" className="hover:text-primary">Orders</Link>
                  <button
                    onClick={() => logout()}
                    className="text-left text-red-500 hover:text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" className="hover:text-primary">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </nav>
  );
};

export default Navbar;
