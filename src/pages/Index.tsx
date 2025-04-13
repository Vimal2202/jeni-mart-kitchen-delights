
import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductGrid from '../components/products/ProductGrid';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import { getBestsellerProducts, getDiscountedProducts, getNewProducts } from '../data/products';

const Index = () => {
  const bestsellerProducts = getBestsellerProducts();
  const newProducts = getNewProducts();
  const discountedProducts = getDiscountedProducts();

  return (
    <Layout>
      <Hero />
      <Features />
      <div className="container-custom">
        <ProductGrid 
          products={bestsellerProducts} 
          title="Bestselling Products" 
        />
      </div>
      <FeaturedCategories />
      <div className="container-custom">
        <ProductGrid 
          products={newProducts} 
          title="New Arrivals" 
        />
      </div>
      <div className="container-custom">
        <ProductGrid 
          products={discountedProducts} 
          title="Special Offers" 
        />
      </div>
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
