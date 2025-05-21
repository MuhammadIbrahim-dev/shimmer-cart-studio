
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 animate-fade-in">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="max-w-md mx-auto">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mx-auto text-muted-foreground mb-4"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Button asChild className="text-white">
                  <Link to="/products">
                    Start Shopping
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li key={item.id} className="py-6">
                          <CartItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => clearCart()}
                    >
                      Clear Cart
                    </Button>
                    
                    <Button asChild>
                      <Link to="/products">
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <Button 
                      asChild
                      className="w-full text-white"
                    >
                      <Link to="/checkout">
                        Proceed to Checkout
                      </Link>
                    </Button>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-center space-x-4">
                        <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto opacity-70">
                          <path d="M30.2784 0H3.72157C1.65948 0 0 1.65948 0 3.72157V18.2784C0 20.3405 1.65948 22 3.72157 22H30.2784C32.3405 22 34 20.3405 34 18.2784V3.72157C34 1.65948 32.3405 0 30.2784 0Z" fill="#252525"/>
                          <path d="M13.9168 15.5739C17.2686 15.5739 20.0117 12.9547 20.0117 9.78631C20.0117 6.61791 17.3224 3.99866 13.9168 3.99866C10.564 3.99866 7.82091 6.61791 7.82091 9.78631C7.82091 12.9547 10.564 15.5739 13.9168 15.5739Z" fill="#EB001B"/>
                          <path d="M21.6392 15.5739C24.991 15.5739 27.7341 12.9547 27.7341 9.78631C27.7341 6.61791 25.0448 3.99866 21.6392 3.99866C18.287 3.99866 15.5439 6.61791 15.5439 9.78631C15.544 12.9547 18.2871 15.5739 21.6392 15.5739Z" fill="#F79E1B"/>
                        </svg>
                        <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto opacity-70">
                          <path d="M30.2784 0H3.72157C1.65948 0 0 1.65948 0 3.72157V18.2784C0 20.3405 1.65948 22 3.72157 22H30.2784C32.3405 22 34 20.3405 34 18.2784V3.72157C34 1.65948 32.3405 0 30.2784 0Z" fill="#0E4595"/>
                          <path d="M12.2532 8.14181H9.02988L7.26465 14.3385H10.4895L12.2532 8.14181Z" fill="white"/>
                          <path d="M19.3179 8.25006C18.6853 8.00556 17.8212 7.76105 16.7418 7.76105C14.6428 7.76105 13.1186 8.79029 13.1144 10.2582C13.1102 11.3431 14.2184 11.9366 15.0438 12.2922C15.8881 12.6521 16.1452 12.8825 16.1452 13.2013C16.1452 13.6842 15.5544 13.9433 15.0024 13.9433C14.2287 13.9433 13.8252 13.8081 13.1638 13.4935L12.9107 13.3624L12.6411 15.6519C13.3823 15.9664 14.7386 16.2433 16.1493 16.2516C18.3831 16.2516 19.8798 15.2349 19.8892 13.6429C19.8933 12.7841 19.3437 12.1167 18.1082 11.5728C17.3768 11.2212 16.949 10.9908 16.949 10.6265C16.949 10.2995 17.3246 9.9599 18.1604 9.9599C18.8791 9.94167 19.415 10.1183 19.8345 10.2995L20.0127 10.3845L20.2782 8.15831L19.3179 8.25006Z" fill="white"/>
                          <path d="M25.6279 8.14181H23.2766C22.7394 8.14181 22.3317 8.27466 22.0787 8.79854L18.9214 14.3385H21.2148C21.2148 14.3385 21.5716 13.3933 21.6469 13.19C21.9205 13.19 24.2842 13.1941 24.6245 13.1941C24.6822 13.4368 24.8828 14.3385 24.8828 14.3385H26.8989L25.6279 8.14181ZM22.388 11.4701C22.5864 10.9461 23.1895 9.48771 23.1895 9.48771C23.1771 9.50796 23.3446 9.07382 23.4446 8.80557L23.5776 9.43711C23.5776 9.43711 23.9356 10.995 24.0273 11.4701H22.388Z" fill="white"/>
                        </svg>
                        <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto opacity-70">
                          <path d="M30.2784 0H3.72157C1.65948 0 0 1.65948 0 3.72157V18.2784C0 20.3405 1.65948 22 3.72157 22H30.2784C32.3405 22 34 20.3405 34 18.2784V3.72157C34 1.65948 32.3405 0 30.2784 0Z" fill="#F3F6F9"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
