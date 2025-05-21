
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Banner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Summer Collection <span className="text-primary">2025</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Elevate your style with our exclusive summer collection. Featuring breathable fabrics, vibrant colors, and designs perfect for the warmer days ahead.
            </p>
            <Button asChild className="text-white px-8 group">
              <Link to="/products?category=summer">
                Shop Collection
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Summer Collection" 
                className="w-full h-full object-cover animate-scale-in"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
