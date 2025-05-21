
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <Check size={32} className="text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          
          <p className="text-lg mb-2">Thank you for your purchase</p>
          <p className="text-muted-foreground mb-6">
            Your order #{orderNumber} has been placed and is being processed.
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="font-semibold mb-4">What's Next?</h2>
            <ol className="text-left space-y-3 text-sm">
              <li className="flex">
                <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span>You will receive an email confirmation with your order details</span>
              </li>
              <li className="flex">
                <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span>Our team will prepare your items for shipping</span>
              </li>
              <li className="flex">
                <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span>You'll receive tracking information once your order ships</span>
              </li>
            </ol>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="text-white"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
