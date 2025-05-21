
import React, { useState } from 'react';
import { Product } from '@/types/product';
import { ShoppingCart, ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: Product;
  loading?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, loading = false }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="bg-gray-200 aspect-square rounded-lg"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Get all images or create an array with the main image
  const images = product.images || [product.image];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 animate-fade-in">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary' : 'opacity-70'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
          
          {product.rating && (
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-muted-foreground ml-2">{product.rating} out of 5</span>
            </div>
          )}
        </div>

        <div>
          <div 
            className={`text-muted-foreground overflow-hidden transition-all duration-300 ${isDescExpanded ? '' : 'max-h-24'}`}
          >
            <p>{product.description}</p>
            {/* Additional description would go here */}
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
              Sed euismod, nisl eget aliquam aliquam, nisl nisl aliquet nisl, eget 
              aliquam nisl nisl eget nisl.
            </p>
          </div>
          
          <button
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className="flex items-center text-primary hover:text-primary/80 text-sm font-medium mt-2"
          >
            {isDescExpanded ? (
              <>
                Show less <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                Read more <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">Quantity:</span>
            
            <div className="flex items-center border border-gray-200 rounded-md">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-1 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              
              <span className="w-10 text-center">{quantity}</span>
              
              <button
                onClick={increaseQuantity}
                className="px-3 py-1 hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <span className="text-sm text-muted-foreground">
              {product.stock} items available
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              className="flex-1 text-white"
              size="lg" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            
            <Button
              variant="secondary"
              size="lg" 
              className="flex-1"
            >
              Buy Now
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex flex-col space-y-2">
            <p className="text-sm">
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p className="text-sm">
              <span className="font-medium">SKU:</span> {product.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
