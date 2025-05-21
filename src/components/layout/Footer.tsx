
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-primary">ShopHub</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Discover the latest trends with our curated collections.
              Quality products for every style and occasion.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-base md:text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-base md:text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mt-6 lg:mt-0">
            <h3 className="text-base md:text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm md:text-base mb-4">Get the latest updates on new products and sales</p>
            <form className="flex flex-col sm:flex-row lg:flex-col">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 p-2 rounded-md sm:rounded-r-none lg:rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button 
                type="submit" 
                className="bg-primary text-white px-4 py-2 mt-2 sm:mt-0 lg:mt-2 rounded-md sm:rounded-l-none lg:rounded-md hover:bg-primary/90 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-muted-foreground text-xs md:text-sm">
          <p>© {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
