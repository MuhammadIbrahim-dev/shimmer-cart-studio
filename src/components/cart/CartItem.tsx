
import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex gap-4 py-4 animate-fade-in">
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
        
        <div className="flex items-center mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full p-0"
            onClick={handleDecreaseQuantity}
            disabled={item.quantity <= 1}
          >
            <Minus size={14} />
          </Button>
          <span className="mx-2 w-8 text-center text-sm">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full p-0"
            onClick={handleIncreaseQuantity}
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="text-sm font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full p-0 text-muted-foreground hover:text-destructive"
          onClick={handleRemove}
        >
          <X size={14} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
