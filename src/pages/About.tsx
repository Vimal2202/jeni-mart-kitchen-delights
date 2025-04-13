
import React from 'react';
import Layout from '../components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">About Jeni Mart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <p className="text-lg mb-4">
              Jeni Mart is a premier destination for high-quality kitchen utensils and cookware. 
              Founded in 2015, we have been serving customers with the finest cooking tools and accessories.
            </p>
            <p className="text-lg mb-4">
              Our mission is to provide home chefs and cooking enthusiasts with durable, ergonomic, and 
              beautifully crafted kitchen tools that make cooking a joy.
            </p>
            <p className="text-lg">
              We carefully select each product in our inventory, ensuring that it meets our high standards 
              of quality, functionality, and value.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/67a9e361-d086-41de-9790-cfab01551d2b.png" 
              alt="Jeni Mart Store" 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">Quality</h3>
              <p>We never compromise on the quality of our products. Every item is tested for durability and performance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">Authenticity</h3>
              <p>We source our products directly from manufacturers and authorized distributors to ensure authenticity.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-600">Customer Satisfaction</h3>
              <p>Our customers' satisfaction is our top priority. We strive to provide excellent service and support.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                <img src="/placeholder.svg" alt="Jeni" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold">Jeni</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
