
import React, { useState } from 'react';
import ProductCard from '../ui/ProductCard';
import { Product } from '@/types/product';
import { Grid2X2, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading = false, 
  error = null 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 pl-4 pr-10 rounded-lg bg-secondary border-none focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="p-2"
          >
            <Grid2X2 size={18} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="p-2"
          >
            <List size={18} />
          </Button>
          <span className="text-sm text-muted-foreground ml-4">
            {filteredProducts.length} products
          </span>
        </div>
      </div>

      {loading ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {Array(8).fill(0).map((_, index) => (
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
        <div className="text-center text-red-500 py-10">
          {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg">No products found matching your search.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "space-y-6"
        }>
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-scale-in">
              {viewMode === 'grid' ? (
                <ProductCard product={product} />
              ) : (
                <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="w-40 h-40">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <div className="flex items-center mt-1 mb-2">
                      <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                      {product.rating && (
                        <div className="flex items-center ml-4">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex gap-2">
                      <Button 
                        asChild 
                        size="sm"
                        className="text-white"
                      >
                        <a href={`/products/${product.id}`}>View Details</a>
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Handle add to cart
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
