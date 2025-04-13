
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash, Upload, X, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from '@/data/products';

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Chef's Knife",
    description: "High-quality chef's knife for professional use",
    price: 189.99,
    originalPrice: 229.99,
    category: "knives",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 125,
    bestseller: true,
    new: false,
    inStock: true,
    features: ["Stainless steel", "Ergonomic handle", "Sharp edge"],
  },
  {
    id: "2",
    name: "Stainless Steel Pot Set",
    description: "Complete set of stainless steel pots for your kitchen",
    price: 249.99,
    originalPrice: 299.99,
    category: "cookware",
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 89,
    bestseller: false,
    new: true,
    inStock: true,
    features: ["Stainless steel", "Heat-resistant handles", "Dishwasher safe"],
  },
  {
    id: "3",
    name: "Wooden Cutting Board",
    description: "Handcrafted wooden cutting board made from premium materials",
    price: 69.99,
    originalPrice: 89.99,
    category: "accessories",
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 56,
    bestseller: false,
    new: false,
    inStock: true,
    features: ["Natural wood", "Non-slip base", "Easy to clean"],
  },
];

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsAddingNew(false);
  };
  
  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsAddingNew(true);
  };
  
  const handleDelete = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted",
    });
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    toast({
      title: isAddingNew ? "Product added" : "Product updated",
      description: `The product has been successfully ${isAddingNew ? "added" : "updated"}`,
    });
    
    setSelectedProduct(null);
    setIsAddingNew(false);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all-products">
        <TabsList className="mb-6">
          <TabsTrigger value="all-products">All Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-products">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold gold-text">Product Management</h3>
            <Button 
              onClick={handleAddNew} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </div>
          
          {(selectedProduct || isAddingNew) ? (
            <Card className="stylish-card mb-6">
              <CardHeader>
                <CardTitle className="gold-text">{isAddingNew ? "Add New Product" : "Edit Product"}</CardTitle>
                <CardDescription>
                  {isAddingNew ? "Create a new product listing" : "Update product information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input 
                        id="name" 
                        defaultValue={selectedProduct?.name || ""} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue={selectedProduct?.category || "knives"}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="knives">Knives & Cutting</SelectItem>
                          <SelectItem value="cookware">Cookware</SelectItem>
                          <SelectItem value="baking">Baking Tools</SelectItem>
                          <SelectItem value="utensils">Utensils</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        defaultValue={selectedProduct?.price || ""} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input 
                        id="originalPrice" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        defaultValue={selectedProduct?.originalPrice || ""} 
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        defaultValue={selectedProduct?.description || ""} 
                        rows={3} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="image" 
                          defaultValue={selectedProduct?.image || ""} 
                          required 
                        />
                        <Button type="button" variant="outline" className="flex-shrink-0">
                          <Upload className="h-4 w-4 mr-2" /> Upload
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="features">Features (one per line)</Label>
                      <Textarea 
                        id="features" 
                        defaultValue={selectedProduct?.features.join("\n") || ""} 
                        rows={3} 
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="inStock" 
                          defaultChecked={selectedProduct?.inStock ?? true} 
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="bestseller" 
                          defaultChecked={selectedProduct?.bestseller ?? false} 
                        />
                        <Label htmlFor="bestseller">Bestseller</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="new" 
                          defaultChecked={selectedProduct?.new ?? false} 
                        />
                        <Label htmlFor="new">New</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedProduct(null);
                        setIsAddingNew(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      {isAddingNew ? "Add Product" : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : null}
          
          <div className="bg-white rounded-lg border stylish-card">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                        {product.originalPrice > product.price && (
                          <div className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.inStock ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            In Stock
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(product)}
                            className="text-primary hover:bg-primary/10 border-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDelete(product.id)}
                            className="text-red-500 hover:bg-red-50 border-red-200"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="stylish-card">
          <h3 className="text-xl font-semibold mb-4 gold-text">Categories Management</h3>
          <p className="text-gray-600 mb-4">Manage product categories and subcategories</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Available Categories</h4>
              <Button className="bg-primary hover:bg-primary/90" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Category
              </Button>
            </div>
            <div className="divide-y">
              {["Knives & Cutting", "Cookware", "Baking Tools", "Utensils", "Gadgets"].map((category, index) => (
                <div key={index} className="py-3 flex justify-between items-center">
                  <span>{category}</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="stylish-card">
          <h3 className="text-xl font-semibold mb-4 gold-text">Inventory Management</h3>
          <p className="text-gray-600 mb-4">Track and update product inventory levels</p>
          
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      SKU-{1000 + index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input 
                        type="number" 
                        defaultValue={Math.floor(Math.random() * 100)} 
                        className="w-20 text-center" 
                        min="0"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select defaultValue={product.inStock ? "instock" : "outofstock"}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instock">In Stock</SelectItem>
                          <SelectItem value="outofstock">Out of Stock</SelectItem>
                          <SelectItem value="backorder">Backorder</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-primary hover:bg-primary/10 border-primary"
                      >
                        <Check className="h-4 w-4 mr-2" /> Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManager;
