
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import { products, categories } from '../data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 350]);
  const [sortOption, setSortOption] = useState('featured');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return a.new === b.new ? 0 : a.new ? -1 : 1;
      case 'popular':
        return a.bestseller === b.bestseller ? 0 : a.bestseller ? -1 : 1;
      default:
        return 0;
    }
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 350]);
    setSortOption('featured');
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600 mb-6">Browse our collection of premium kitchen utensils</p>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex gap-3">
              {/* Sort (Desktop) */}
              <div className="hidden md:block">
                <select
                  className="border rounded px-3 py-2 bg-white"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Product Filters</SheetTitle>
                    <SheetDescription>
                      Filter and sort products to find what you need
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Sort By</h3>
                      <select
                        className="w-full border rounded px-3 py-2 bg-white"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest</option>
                        <option value="popular">Popular</option>
                      </select>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox
                              id={`mobile-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryChange(category.id)}
                            />
                            <Label
                              htmlFor={`mobile-${category.id}`}
                              className="ml-2 cursor-pointer"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Price Range</h3>
                      <Slider
                        defaultValue={[priceRange[0], priceRange[1]]}
                        max={350}
                        step={10}
                        onValueChange={handlePriceChange}
                        className="my-6"
                      />
                      <div className="flex justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button onClick={clearFilters} variant="outline" className="w-full">
                        Clear Filters
                      </Button>
                      <SheetClose asChild>
                        <Button className="w-full bg-jenimart-primary hover:bg-jenimart-primary/90">
                          Apply Filters
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* Desktop Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="hidden md:flex">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Product Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox
                              id={`desktop-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryChange(category.id)}
                            />
                            <Label
                              htmlFor={`desktop-${category.id}`}
                              className="ml-2 cursor-pointer"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Price Range</h3>
                      <Slider
                        defaultValue={[priceRange[0], priceRange[1]]}
                        max={350}
                        step={10}
                        onValueChange={handlePriceChange}
                        className="my-6"
                      />
                      <div className="flex justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={clearFilters} variant="outline" className="w-full">
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{sortedProducts.length}</span>{" "}
              {sortedProducts.length === 1 ? "product" : "products"}
            </p>
          </div>
          
          {sortedProducts.length > 0 ? (
            <ProductGrid products={sortedProducts} />
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
