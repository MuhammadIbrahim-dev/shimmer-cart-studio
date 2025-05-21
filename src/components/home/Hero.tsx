
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-secondary to-white">
      <div className="container-custom py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover the Latest
              <span className="block text-primary">Fashion Trends</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Experience premium quality and stylish designs that make you stand out.
              Shop our new arrivals now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-white px-8">
                <Link to="/products">
                  Shop Now
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/categories">Explore Categories</Link>
              </Button>
            </div>
          </div>

          <div className="relative animated-element">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Fashion Collection" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg animate-bounce-in">
              <p className="text-sm font-semibold">New Collection</p>
              <p className="text-accent font-bold">Up to 40% Off</p>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg animate-bounce-in">
              <div>
                <p className="text-xs">Limited</p>
                <p className="font-bold">Offer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full translate-y-1/3 -translate-x-1/3"></div>
    </div>
  );
};

export default Hero;
