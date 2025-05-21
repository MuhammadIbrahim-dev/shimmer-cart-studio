
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Banner from '@/components/home/Banner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <Banner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
