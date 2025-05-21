
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '@/services/productService';
import { Product } from '@/types/product';
import ProductDetailComponent from '@/components/products/ProductDetail';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('Product not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Demo product if Firebase is not set up
  const demoProduct: Product = {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A comfortable everyday essential with a modern fit. Made from premium cotton for breathability and durability. Features a classic crew neck and short sleeves that provide a timeless look that can be dressed up or down.',
    price: 29.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    stock: 50,
    rating: 4.5
  };

  // Use demo product if Firebase is not set up
  const displayProduct = product || (id === '1' && !loading ? demoProduct : null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-custom py-8">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-200 aspect-square rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! {error}</h2>
              <p className="text-muted-foreground">
                We couldn't find the product you're looking for.
              </p>
            </div>
          ) : displayProduct ? (
            <>
              <div className="mb-6">
                <nav className="text-sm text-muted-foreground">
                  <ol className="flex items-center space-x-2">
                    <li><a href="/" className="hover:text-primary">Home</a></li>
                    <li className="flex items-center space-x-2">
                      <span>/</span>
                      <a href="/products" className="hover:text-primary">Products</a>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>/</span>
                      <span>{displayProduct.name}</span>
                    </li>
                  </ol>
                </nav>
              </div>
              
              <ProductDetailComponent product={displayProduct} />
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
