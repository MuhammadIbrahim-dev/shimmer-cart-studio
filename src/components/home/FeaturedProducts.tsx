
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import { getFeaturedProducts } from '@/services/productService';
import { Product } from '@/types/product';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const featuredProducts = await getFeaturedProducts(8);
        setProducts(featuredProducts);
      } catch (err) {
        setError('Failed to load featured products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // For demo purposes, use placeholder products if Firebase is not set up
  const placeholderProducts: Product[] = [
    {
      id: '1',
      name: 'Classic White T-Shirt',
      description: 'A comfortable everyday essential with a modern fit.',
      price: 29.99,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 50,
      featured: true,
      rating: 4.5
    },
    {
      id: '2',
      name: 'Leather Crossbody Bag',
      description: 'Stylish and practical for everyday use.',
      price: 89.99,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 15,
      featured: true,
      rating: 4.2
    },
    {
      id: '3',
      name: 'Slim Fit Jeans',
      description: 'Contemporary design with premium denim.',
      price: 59.99,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 30,
      featured: true,
      rating: 4.7
    },
    {
      id: '4',
      name: 'Wireless Headphones',
      description: 'Premium sound quality with noise cancellation.',
      price: 129.99,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 22,
      featured: true,
      rating: 4.8
    },
    {
      id: '5',
      name: 'Smartwatch',
      description: 'Track your fitness and stay connected.',
      price: 199.99,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 12,
      featured: true,
      rating: 4.4
    },
    {
      id: '6',
      name: 'Sunglasses',
      description: 'UV protection with a stylish design.',
      price: 79.99,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 25,
      featured: true,
      rating: 4.1
    },
    {
      id: '7',
      name: 'Running Shoes',
      description: 'Lightweight and comfortable for everyday activities.',
      price: 89.99,
      category: 'footwear',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 18,
      featured: true,
      rating: 4.6
    },
    {
      id: '8',
      name: 'Minimalist Watch',
      description: 'Elegant design with Japanese movement.',
      price: 149.99,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 10,
      featured: true,
      rating: 4.9
    }
  ];

  // Display placeholder products if no products are loaded or in development
  const displayProducts = products.length > 0 ? products : placeholderProducts;

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products that are trending right now.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <div key={product.id} className="animate-scale-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/products"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-primary text-primary hover:bg-primary hover:text-white h-10 px-8 py-2"
              >
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
