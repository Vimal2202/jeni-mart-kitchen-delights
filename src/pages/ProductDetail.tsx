
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import { getProductById, getRelatedProducts, Product } from '../data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Check, Truck, ArrowLeft, ChevronRight, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimilarProductsCarousel from '@/components/products/SimilarProductsCarousel';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const relatedProducts = getRelatedProducts(id || '');
  const { addItem, openCart } = useCart();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-32 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: quantity
    });
    openCart();
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: quantity
    });
    navigate('/checkout');
  };

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Layout>
      <div className="container-custom py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
          <ChevronRight className="h-4 w-4 mx-2" />
          <button onClick={() => navigate('/products')} className="hover:text-primary">Products</button>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">{product.name}</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="stylish-card bg-white p-4 rounded-xl">
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={product.gallery?.[activeImageIndex] || product.image || '/placeholder.svg'} 
                alt={product.name} 
                className="w-full h-96 object-cover rounded-lg transition-all duration-300 hover:scale-105"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.gallery?.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 
                  ${index === activeImageIndex ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="stylish-card">
            <div className="mb-6">
              {product.bestseller && (
                <Badge variant="outline" className="bg-gold-light text-gold-dark border-gold-light mb-2">
                  Bestseller
                </Badge>
              )}
              {product.new && (
                <Badge className="bg-primary mb-2 ml-2">New</Badge>
              )}
              
              <h1 className="text-3xl font-bold gold-text mb-3">{product.name}</h1>
              
              <div className="flex items-center mt-2 mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : i < product.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>
              
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="ml-3 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <Badge className="ml-3 bg-secondary">Save {discountPercentage}%</Badge>
                  </>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {product.inStock ? (
                <div className="flex items-center text-green-600 mb-6">
                  <Check className="h-5 w-5 mr-2" />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="text-red-500 mb-6">Out of Stock</div>
              )}
              
              <div className="mb-6">
                <div className="font-medium mb-2">Features:</div>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mb-6">
                <div className="font-medium mb-2">Quantity:</div>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-1 border rounded-l hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="px-4 py-1 border-t border-b min-w-[3rem] text-center">
                    {quantity}
                  </div>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-1 border rounded-r hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline"
                  className="sm:flex-initial border-primary text-primary hover:bg-primary/10"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="bg-gold-light p-4 rounded-lg flex items-start">
                <Truck className="text-primary h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Free shipping on orders over $99</p>
                  <p className="text-sm text-gray-600">Estimated delivery: 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products Carousel */}
        <div className="mt-16">
          <h2 className="section-title mb-8">Similar Products</h2>
          <SimilarProductsCarousel products={relatedProducts} />
        </div>
        
        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b mb-6">
              <TabsTrigger value="description" className="flex-1 sm:flex-initial">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1 sm:flex-initial">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 sm:flex-initial">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1 sm:flex-initial">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="min-h-[200px] stylish-card">
              <div className="space-y-4">
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-700">
                  Crafted with precision and designed for optimal performance, the {product.name} is an essential 
                  addition to any kitchen. Its ergonomic design ensures comfort during extended use, while the 
                  premium materials guarantee durability and longevity.
                </p>
                <p className="text-gray-700">
                  Whether you're a professional chef or a passionate home cook, the {product.name} will elevate 
                  your culinary experience with its exceptional quality and performance.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="min-h-[200px] stylish-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 gold-text">Product Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Material</span>
                      <span>Premium Quality</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Dimensions</span>
                      <span>Varies by product</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Weight</span>
                      <span>Product specific</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Color</span>
                      <span>As shown</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 gold-text">Care Instructions</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Clean after each use</li>
                    <li>Follow product-specific cleaning instructions</li>
                    <li>Store in a dry place</li>
                    <li>Avoid extreme temperature changes</li>
                    <li>Do not use abrasive cleaners unless specified</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="min-h-[200px] stylish-card">
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    <Star className="h-8 w-8 text-yellow-400 fill-current" />
                    <span className="text-3xl font-bold ml-2">{product.rating}</span>
                  </div>
                  <div>
                    <p className="text-gray-600">{product.reviews} verified ratings</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold gold-text">Product Reviews</h3>
                  <Button className="bg-primary hover:bg-primary/90">Write a Review</Button>
                </div>
                <p className="text-gray-600">Customer reviews will appear here when available.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="min-h-[200px] stylish-card">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 gold-text">Shipping Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Free standard shipping on orders over $99</li>
                    <li>Standard shipping (3-5 business days): $9.99</li>
                    <li>Express shipping (1-2 business days): $19.99</li>
                    <li>International shipping available to select countries</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 gold-text">Return Policy</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>30-day money-back guarantee</li>
                    <li>Return shipping is free for defective items</li>
                    <li>Items must be unused and in original packaging</li>
                    <li>Refunds are processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
