
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/products';

const Header: React.FC = () => {
  const { toggleCart, itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-jenimart-primary">Jeni</span>
            <span className="text-2xl font-bold text-jenimart-secondary">Mart</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium hover:text-jenimart-primary transition-colors ${isActive('/') ? 'text-jenimart-primary' : ''}`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center font-medium hover:text-jenimart-primary transition-colors">
                Categories <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full bg-white shadow-lg rounded p-4 w-48 hidden group-hover:block">
                {categories.map(category => (
                  <Link 
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="block py-2 hover:text-jenimart-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              to="/products" 
              className={`font-medium hover:text-jenimart-primary transition-colors ${isActive('/products') ? 'text-jenimart-primary' : ''}`}
            >
              All Products
            </Link>
            <Link 
              to="/about" 
              className={`font-medium hover:text-jenimart-primary transition-colors ${isActive('/about') ? 'text-jenimart-primary' : ''}`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium hover:text-jenimart-primary transition-colors ${isActive('/contact') ? 'text-jenimart-primary' : ''}`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Search, User & Cart Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="pl-3 pr-10 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-jenimart-primary text-sm"
              />
              <Search className="w-4 h-4 absolute right-3 text-gray-500" />
            </div>
            
            <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </Link>
            
            <button 
              onClick={toggleCart} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-jenimart-secondary">{itemCount}</Badge>
              )}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex items-center relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="w-full pl-3 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-jenimart-primary"
              />
              <Search className="w-4 h-4 absolute right-3 text-gray-500" />
            </div>
            
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`font-medium hover:text-jenimart-primary transition-colors ${isActive('/') ? 'text-jenimart-primary' : ''}`}
              >
                Home
              </Link>
              
              <div className="relative">
                <button className="flex items-center font-medium hover:text-jenimart-primary transition-colors">
                  Categories <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="ml-4 mt-2 space-y-2">
                  {categories.map(category => (
                    <Link 
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block py-1 hover:text-jenimart-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link 
                to="/products" 
                className={`font-medium hover:text-jenimart-primary transition-colors ${isActive('/products') ? 'text-jenimart-primary' : ''}`}
              >
                All Products
              </Link>
              <Link 
                to="/about" 
                className={`font-medium hover:text-jenimart-primary transition-colors ${isActive('/about') ? 'text-jenimart-primary' : ''}`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium hover:text-jenimart-primary transition-colors ${isActive('/contact') ? 'text-jenimart-primary' : ''}`}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
