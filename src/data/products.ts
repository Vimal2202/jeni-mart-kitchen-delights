export type Product = {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  originalPrice: number;
  image: string;
  gallery: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  bestseller: boolean;
  new: boolean;
  discount?: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Kitchen Masala Set",
    description: "A comprehensive set of authentic Indian spices, perfectly blended and packaged to maintain freshness. Each masala is handcrafted using traditional recipes passed down through generations.",
    features: [
      "100% natural ingredients",
      "No artificial preservatives",
      "Traditional blend",
      "Air-tight packaging",
      "Long-lasting freshness"
    ],
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2940&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613841322632-f3bb4c39661d?q=80&w=2940&auto=format&fit=crop"
    ],
    category: "masala",
    rating: 4.8,
    reviews: 243,
    inStock: true,
    bestseller: true,
    new: false
  },
  {
    id: "2",
    name: "Professional Wooden Rolling Pin",
    description: "Professional-grade wooden rolling pin perfect for rolling chapatis, rotis, and other flatbreads. The smooth surface and ergonomic handles make cooking a breeze.",
    features: [
      "Made from premium teak wood",
      "Ergonomic handles",
      "Perfect weight distribution",
      "Smooth rolling surface",
      "Easy to clean"
    ],
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1603903631918-a6a92fb6ac49?q=80&w=2787&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1603903631918-a6a92fb6ac49?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612537082937-772cfbfb769e?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607877742574-ddbc5449a5e5?q=80&w=2787&auto=format&fit=crop"
    ],
    category: "utensils",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    bestseller: false,
    new: true
  }
];

export const categories = [
  {
    id: 'masala',
    name: 'Masala',
    description: 'Traditional Indian spice blends',
    count: 0,  // This will be updated dynamically
    image: '/masala-category.jpg'
  },
  {
    id: 'utensils',
    name: 'Utensils',
    description: 'Premium kitchen utensils',
    count: 0,  // This will be updated dynamically
    image: '/utensils-category.jpg'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

export const getBestsellerProducts = (limit: number = 4): Product[] => {
  return products
    .filter(product => product.bestseller)
    .slice(0, limit);
};

export const getNewProducts = (limit: number = 4): Product[] => {
  return products
    .filter(product => product.new)
    .slice(0, limit);
};

export const getDiscountedProducts = (limit: number = 4): Product[] => {
  return products
    .filter(product => product.discount || product.originalPrice > product.price)
    .sort((a, b) => {
      const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
      const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
      return discountB - discountA;
    })
    .slice(0, limit);
};
