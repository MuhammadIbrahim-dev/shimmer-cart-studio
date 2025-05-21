
import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cartItems, totalPrice, totalItems, clearCart } = useCart();

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Cart ({totalItems})</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCartOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground mt-1">Looks like you haven't added any products yet.</p>
              <Button 
                asChild 
                className="mt-6 text-white"
              >
                <Link to="/products" onClick={() => setIsCartOpen(false)}>
                  Start Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2 divide-y">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center font-medium">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button 
                  asChild
                  className="w-full text-white"
                >
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                    Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
