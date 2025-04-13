
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-background.jpg" 
          alt="Kitchen utensils" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container-custom relative z-10 py-20 md:py-32 min-h-[80vh] flex items-center">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Elevate Your Kitchen Experience
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Discover premium kitchen utensils that make cooking a joy. Quality tools for passionate home chefs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              asChild
              className="bg-jenimart-secondary hover:bg-jenimart-secondary/90 text-lg px-6 py-6"
            >
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-6 py-6"
            >
              <Link to="/category/bestsellers">
                Bestsellers
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
