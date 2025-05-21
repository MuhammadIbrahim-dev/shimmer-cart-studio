import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories, getProductsByCategory, searchProducts } from '@/services/productService';
import { Product, Category } from '@/types/product';
import ProductGrid from '@/components/products/ProductGrid';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let fetchedProducts: Product[] = [];
        
        // If we have a search query, search for products
        if (searchQuery) {
          fetchedProducts = await searchProducts(searchQuery);
        }
        // If we have a category parameter or active category, filter by category
        else if (categoryParam || activeCategory) {
          const category = categoryParam || activeCategory;
          fetchedProducts = await getProductsByCategory(category as string);
          setActiveCategory(category);
        } 
        // Otherwise just load all products
        else {
          fetchedProducts = await getProducts();
        }

        // Fallback to demo products if Firebase isn't set up
        if (fetchedProducts.length === 0) {
          // Add placeholder products here if needed
          // This would be similar to the placeholderProducts in FeaturedProducts
          fetchedProducts = [
            // Add placeholder products here, similar to FeaturedProducts
          ];
        }
        
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, categoryParam, activeCategory]);

  const placeholderCategories: Category[] = [
    { id: 'clothing', name: 'Clothing' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'footwear', name: 'Footwear' }
  ];

  const displayCategories = categories.length > 0 ? categories : placeholderCategories;

  const handleCategoryClick = (categoryId: string) => {
    // If the category is already active, clear it
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with categories */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  <Button
                    variant={activeCategory === null ? "secondary" : "ghost"}
                    className="justify-start w-full"
                    onClick={() => setActiveCategory(null)}
                  >
                    All Products
                  </Button>
                  {displayCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "secondary" : "ghost"}
                      className="justify-start w-full"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </aside>
            
            {/* Main content area with products */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl font-bold">
                  {searchQuery 
                    ? `Search results for "${searchQuery}"` 
                    : activeCategory 
                      ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}` 
                      : 'All Products'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {searchQuery
                    ? `Showing ${products.length} results for "${searchQuery}"`
                    : `Showing ${products.length} products`}
                </p>
              </div>
              
              <ProductGrid products={products} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
