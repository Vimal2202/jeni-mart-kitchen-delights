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
    name: "Premium Chef's Knife",
    description: "Precision-forged high-carbon stainless steel chef's knife with ergonomic handle. Perfect for professional chefs and home cooking enthusiasts alike.",
    features: [
      "8-inch blade made from high-carbon German steel",
      "Full tang construction for perfect balance",
      "Ergonomic handle for comfort during extended use",
      "Razor-sharp edge retention",
      "Versatile for chopping, slicing, and dicing"
    ],
    price: 89.99,
    originalPrice: 119.99,
    image: "/knife-main.jpg",
    gallery: ["/knife-main.jpg", "/knife-angle.jpg", "/knife-handle.jpg"],
    category: "knives",
    rating: 4.8,
    reviews: 243,
    inStock: true,
    bestseller: true,
    new: false
  },
  {
    id: "2",
    name: "Marble Rolling Pin",
    description: "Natural marble rolling pin that stays cool for perfect pastry rolling. The smooth surface prevents dough from sticking, making your baking experience effortless.",
    features: [
      "Made from 100% natural marble",
      "Stays naturally cool for pastry work",
      "Non-stick surface for easy dough handling",
      "Wooden handles for comfortable grip",
      "Includes wooden resting cradle"
    ],
    price: 34.99,
    originalPrice: 49.99,
    image: "/rolling-pin.jpg",
    gallery: ["/rolling-pin.jpg", "/rolling-pin-angle.jpg", "/rolling-pin-use.jpg"],
    category: "baking",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    bestseller: false,
    new: true
  },
  {
    id: "3",
    name: "Cast Iron Skillet",
    description: "Pre-seasoned cast iron skillet perfect for searing, baking, and frying. This kitchen essential will last generations with proper care.",
    features: [
      "12-inch diameter cooking surface",
      "Pre-seasoned with vegetable oil",
      "Superior heat retention and distribution",
      "Suitable for all cooktops including induction",
      "Oven safe up to 500°F"
    ],
    price: 42.99,
    originalPrice: 59.99,
    image: "/cast-iron-skillet.jpg",
    gallery: ["/cast-iron-skillet.jpg", "/cast-iron-skillet-cooking.jpg", "/cast-iron-skillet-handle.jpg"],
    category: "cookware",
    rating: 4.9,
    reviews: 512,
    inStock: true,
    bestseller: true,
    new: false
  },
  {
    id: "4",
    name: "Bamboo Cutting Board Set",
    description: "Sustainable bamboo cutting board set with juice grooves. Set of three different sizes for all your kitchen preparation needs.",
    features: [
      "Set of 3 cutting boards in different sizes",
      "Made from sustainable bamboo",
      "Juice grooves to catch liquids",
      "Knife-friendly surface",
      "Lightweight yet durable"
    ],
    price: 29.99,
    originalPrice: 39.99,
    image: "/bamboo-cutting-board.jpg",
    gallery: ["/bamboo-cutting-board.jpg", "/bamboo-cutting-board-set.jpg", "/bamboo-cutting-board-use.jpg"],
    category: "preparation",
    rating: 4.5,
    reviews: 158,
    inStock: true,
    bestseller: false,
    new: false
  },
  {
    id: "5",
    name: "Silicone Spatula Set",
    description: "Heat-resistant silicone spatula set in vibrant colors. Perfect for non-stick cookware and bakeware.",
    features: [
      "Set of 4 spatulas in different sizes",
      "Heat-resistant up to 600°F",
      "BPA-free silicone construction",
      "Stainless steel cores for durability",
      "Dishwasher safe"
    ],
    price: 19.99,
    originalPrice: 29.99,
    image: "/silicone-spatulas.jpg",
    gallery: ["/silicone-spatulas.jpg", "/silicone-spatula-use.jpg", "/silicone-spatula-colors.jpg"],
    category: "utensils",
    rating: 4.7,
    reviews: 203,
    inStock: true,
    bestseller: true,
    new: false
  },
  {
    id: "6",
    name: "Stainless Steel Mixing Bowls",
    description: "Nesting stainless steel mixing bowl set with silicone bases to prevent slipping. Essential for any kitchen.",
    features: [
      "Set of 5 bowls from 1 to 5 quarts",
      "Polished 18/8 stainless steel construction",
      "Silicone bases prevent slipping",
      "Rolled rims for easy pouring",
      "Dishwasher, freezer, and refrigerator safe"
    ],
    price: 39.99,
    originalPrice: 59.99,
    image: "/mixing-bowls.jpg",
    gallery: ["/mixing-bowls.jpg", "/mixing-bowls-nested.jpg", "/mixing-bowls-use.jpg"],
    category: "preparation",
    rating: 4.8,
    reviews: 176,
    inStock: true,
    bestseller: false,
    new: true
  },
  {
    id: "7",
    name: "Digital Kitchen Scale",
    description: "Precise digital kitchen scale with tare function and multiple measurement units. Sleek design fits in any kitchen.",
    features: [
      "Accurate to 0.1g/0.01oz",
      "Measures in g, oz, lb, and ml",
      "Tare/zero function",
      "Large LCD display",
      "Automatic shut-off to conserve battery"
    ],
    price: 24.99,
    originalPrice: 34.99,
    image: "/kitchen-scale.jpg",
    gallery: ["/kitchen-scale.jpg", "/kitchen-scale-display.jpg", "/kitchen-scale-use.jpg"],
    category: "gadgets",
    rating: 4.6,
    reviews: 132,
    inStock: true,
    bestseller: false,
    new: false
  },
  {
    id: "8",
    name: "Copper Saucepan Set",
    description: "Professional-grade copper saucepan set with stainless steel lining. Exceptional heat conductivity for precise cooking.",
    features: [
      "Set of 3 saucepans (1.5, 2, and 3 quart)",
      "Copper exterior with stainless steel lining",
      "Cast iron handles for stability",
      "Suitable for all cooktops except induction",
      "Oven safe up to 450°F"
    ],
    price: 249.99,
    originalPrice: 329.99,
    image: "/copper-saucepans.jpg",
    gallery: ["/copper-saucepans.jpg", "/copper-saucepan-angle.jpg", "/copper-saucepans-set.jpg"],
    category: "cookware",
    rating: 4.9,
    reviews: 87,
    inStock: true,
    bestseller: false,
    new: true,
    discount: 25
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
