
import React, { useState } from 'react';
import { Product, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Sample products data for the admin interface
const sampleProducts: Product[] = [
  {
    id: 'dosa-karandi',
    name: 'Dosa Karandi (3 Piece)',
    description: 'Set of 3 high-quality stainless steel dosa karandi for perfect dosa making.',
    price: 249.99,
    originalPrice: 450.00,
    category: 'utensils',
    image: '/dosa-karandi.jpg',
    gallery: ['/dosa-karandi.jpg', '/dosa-karandi-2.jpg'],
    rating: 4.8,
    reviews: 120,
    bestseller: true,
    new: false,
    inStock: true,
    features: [
      'Premium stainless steel construction',
      'Ergonomic design for comfortable grip',
      'Easy to clean and dishwasher safe',
      'Perfect for making dosas, uttapams and crepes',
      'Set of 3 different sizes for versatility'
    ]
  },
  {
    id: 'masala-spice-box',
    name: 'Traditional Masala Dabba Spice Box',
    description: 'Traditional Indian spice box with 7 compartments and a spoon, perfect for storing and organizing your essential spices.',
    price: 599.00,
    originalPrice: 799.00,
    category: 'storage',
    image: '/masala-box.jpg',
    gallery: ['/masala-box.jpg', '/masala-box-open.jpg'],
    rating: 4.7,
    reviews: 85,
    bestseller: false,
    new: true,
    inStock: true,
    features: [
      'Stainless steel construction for durability',
      '7 individual containers with transparent lids',
      'Includes a small spoon for easy portioning',
      'Keeps spices fresh and organized',
      'Perfect for daily cooking needs'
    ]
  },
  {
    id: 'kadai-cooking-pot',
    name: 'Traditional Iron Kadai',
    description: 'Authentic iron kadai for traditional Indian cooking, perfect for deep frying and making curries.',
    price: 1200.00,
    originalPrice: 1500.00,
    category: 'cookware',
    image: '/kadai.jpg',
    gallery: ['/kadai.jpg', '/kadai-side.jpg'],
    rating: 4.9,
    reviews: 150,
    bestseller: false,
    new: false,
    inStock: true,
    features: [
      'Traditional iron construction for authentic flavors',
      'Pre-seasoned and ready to use',
      'Excellent heat retention for even cooking',
      'Deep design perfect for curries and frying',
      'Becomes naturally non-stick with repeated use'
    ]
  }
];

const ProductManager = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Simple product form for demo purposes
  const ProductForm = ({ product, isEditing }: { product: Product | null, isEditing: boolean }) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" defaultValue={product?.name || ''} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select id="category" className="w-full p-2 border rounded-md" defaultValue={product?.category || ''}>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" type="number" defaultValue={product?.price || 0} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="originalPrice">Original Price (₹)</Label>
            <Input id="originalPrice" type="number" defaultValue={product?.originalPrice || 0} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Status</Label>
            <select id="stock" className="w-full p-2 border rounded-md" defaultValue={product?.inStock ? 'true' : 'false'}>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} defaultValue={product?.description || ''} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Main Image URL</Label>
          <Input id="image" defaultValue={product?.image || ''} />
        </div>
        
        <div className="space-y-2">
          <Label>Features (one per line)</Label>
          <Textarea rows={5} defaultValue={product?.features.join('\n') || ''} />
        </div>
        
        <div className="pt-4 flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>{isEditing ? 'Update Product' : 'Add Product'}</Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm product={null} isEditing={false} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold truncate">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="font-bold text-red-600">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setCurrentProduct(product);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    <ProductForm product={currentProduct} isEditing={true} />
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
