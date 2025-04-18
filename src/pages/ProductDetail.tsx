
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Check, ArrowLeft, Star } from 'lucide-react';
import ProductImageZoom from '@/components/products/ProductImageZoom';
import SimilarProductsCarousel from '@/components/products/SimilarProductsCarousel';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const relatedProducts = getRelatedProducts(id || '');
  const { addItem, openCart } = useCart();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-32 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')} variant="outline">
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
      quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart`,
      duration: 3000,
    });

    // Open cart when item is added
    openCart();
  };

  const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative">
              <ProductImageZoom 
                image={product.gallery?.[activeImageIndex] || product.image}
                alt={product.name}
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                  {Math.round(discount)}% OFF
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.gallery?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                    index === activeImageIndex ? 'border-red-600' : 'border-transparent hover:border-red-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="aspect-square object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-sm">
                  {product.category}
                </Badge>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isFavorite(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-red-600">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="ml-2 text-gray-500 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
              </div>

              {product.inStock ? (
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <Check className="h-4 w-4 mr-1" /> In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                  Out of Stock
                </Badge>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1 hover:bg-gray-100 border-r"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1 hover:bg-gray-100 border-l"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-red-600 hover:bg-red-700"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />
        
        <div className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start mb-8">
              <TabsTrigger value="description" className="text-lg">Description</TabsTrigger>
              <TabsTrigger value="features" className="text-lg">Features</TabsTrigger>
              <TabsTrigger value="reviews" className="text-lg">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold">{product.rating}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500">({product.reviews} reviews)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <SimilarProductsCarousel products={relatedProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
