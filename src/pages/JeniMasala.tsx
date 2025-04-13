
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";

// Sample masala products
const masalaProducts = [
  {
    id: 'red-chilli-powder',
    name: 'Red Chilli Powder',
    description: 'Pure red chilli powder with perfect heat level for authentic Indian dishes.',
    price: 300,
    originalPrice: 350,
    image: '/lovable-uploads/67a9e361-d086-41de-9790-cfab01551d2b.png',
    weight: '500g',
    features: [
      'Made from premium quality red chillies',
      'Perfect level of heat',
      'No artificial colors or preservatives',
      'Enhances flavor and color of dishes'
    ]
  },
  {
    id: 'turmeric-powder',
    name: 'Turmeric Powder',
    description: 'High-quality turmeric powder with rich color and aroma for cooking and health benefits.',
    price: 200,
    originalPrice: 230,
    image: '/lovable-uploads/96f094ca-0ec5-4aa2-b804-dc61f2b7ee92.png',
    weight: '250g',
    features: [
      'High curcumin content',
      'Intense golden color',
      '100% pure, no additives',
      'Traditional medicinal properties'
    ]
  },
  {
    id: 'garam-masala',
    name: 'Garam Masala',
    description: 'Authentic blend of aromatic spices, perfectly balanced for flavorful Indian cuisine.',
    price: 350,
    originalPrice: 400,
    image: '/placeholder.svg',
    weight: '200g',
    features: [
      'Blend of 12 premium spices',
      'Authentic traditional recipe',
      'Freshly ground for maximum flavor',
      'Perfect for all Indian dishes'
    ]
  },
  {
    id: 'coriander-powder',
    name: 'Coriander Powder',
    description: 'Freshly ground coriander powder with its distinctive citrusy and earthy aroma.',
    price: 180,
    originalPrice: 200,
    image: '/placeholder.svg',
    weight: '250g',
    features: [
      'Made from select coriander seeds',
      'Distinctive aroma and flavor',
      'Fine texture for even cooking',
      'Essential base spice for many dishes'
    ]
  }
];

const MasalaCard = ({ product }: { product: typeof masalaProducts[0] }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      variant: "default",
      duration: 3000,
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-64 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <span className="text-2xl font-bold text-red-600">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <span className="bg-gray-100 px-2 py-1 rounded text-sm">{product.weight}</span>
        </div>
        
        <ul className="mb-6 space-y-1">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

const JeniMasala = () => {
  return (
    <Layout>
      <div className="mt-16 py-8">
        <div className="bg-red-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Jeni's Premium Masalas</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Authentic, flavorful spice blends to elevate your culinary creations.
              Made with the finest ingredients using traditional recipes.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {masalaProducts.map(product => (
              <MasalaCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Why Choose Jeni's Masalas?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 mt-1">
                      <span className="text-lg font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Premium Quality Ingredients</h3>
                      <p className="text-gray-600">We source the highest quality spices for our blends.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 mt-1">
                      <span className="text-lg font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Authentic Recipes</h3>
                      <p className="text-gray-600">Traditional recipes passed down through generations.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 mt-1">
                      <span className="text-lg font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">No Preservatives</h3>
                      <p className="text-gray-600">100% natural with no artificial additives or preservatives.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 mt-1">
                      <span className="text-lg font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Freshly Ground</h3>
                      <p className="text-gray-600">Spices are freshly ground to preserve aroma and flavor.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/lovable-uploads/67a9e361-d086-41de-9790-cfab01551d2b.png" alt="Masala spices" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JeniMasala;
