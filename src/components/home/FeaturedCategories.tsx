
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 bg-jenimart-light">
      <div className="container-custom">
        <h2 className="section-title mb-10">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative flex flex-col items-center text-center overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-full h-40 overflow-hidden">
                <img 
                  src={category.image || '/placeholder.svg'} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 p-3 w-full">
                <h3 className="text-lg font-medium text-white">{category.name}</h3>
                <span className="text-sm text-white/80">{category.count} products</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
