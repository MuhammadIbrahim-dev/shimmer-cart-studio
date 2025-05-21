
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="product-card group">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden rounded-lg">
        <div className="aspect-square w-full overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            onClick={handleAddToCart}
            className="bg-white text-primary hover:bg-white/90 flex items-center gap-2 rounded-full py-2 px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </Link>

      <div className="pt-4 text-left">
        <h3 className="font-medium text-foreground truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="font-bold">${product.price.toFixed(2)}</p>
          {product.rating && (
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
