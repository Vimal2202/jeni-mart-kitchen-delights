
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

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
      ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white shadow-sm py-2'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/96f094ca-0ec5-4aa2-b804-dc61f2b7ee92.png" 
              alt="Jeni Mart Logo" 
              className="h-12"
            />
          </Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center relative flex-1 max-w-xl mx-6">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : 'text-gray-700'}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium hover:text-primary transition-colors ${isActive('/products') ? 'text-primary' : 'text-gray-700'}`}
            >
              Products
            </Link>
            <Link 
              to="/jeni-masala" 
              className={`font-medium hover:text-primary transition-colors ${isActive('/jeni-masala') ? 'text-primary' : 'text-gray-700'}`}
            >
              Jeni's Masala
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium hover:text-primary transition-colors ${isActive('/contact') ? 'text-primary' : 'text-gray-700'}`}
            >
              Contact
            </Link>
            <Link 
              to="/about" 
              className={`font-medium hover:text-primary transition-colors ${isActive('/about') ? 'text-primary' : 'text-gray-700'}`}
            >
              About
            </Link>
          </div>
          
          {/* Cart & Menu Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:flex">
              <User className="w-5 h-5 text-gray-700" />
            </Link>
            
            <button 
              onClick={toggleCart} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-600 text-white">{itemCount}</Badge>
              )}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="mt-2 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 py-3 bg-white border-t">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`px-4 py-2 font-medium ${isActive('/') ? 'text-primary' : 'text-gray-700'}`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`px-4 py-2 font-medium ${isActive('/products') ? 'text-primary' : 'text-gray-700'}`}
              >
                Products
              </Link>
              <Link 
                to="/jeni-masala" 
                className={`px-4 py-2 font-medium ${isActive('/jeni-masala') ? 'text-primary' : 'text-gray-700'}`}
              >
                Jeni's Masala
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-2 font-medium ${isActive('/contact') ? 'text-primary' : 'text-gray-700'}`}
              >
                Contact
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 font-medium ${isActive('/about') ? 'text-primary' : 'text-gray-700'}`}
              >
                About
              </Link>
              <Link 
                to="/account" 
                className={`px-4 py-2 font-medium text-gray-700`}
              >
                My Account
              </Link>
            </nav>
          </div>
        )}
      </div>
      
      {/* WhatsApp Contact Info */}
      <div className="hidden md:flex justify-end items-center bg-green-50 py-1 px-6">
        <div className="flex items-center text-green-600 text-sm">
          <Phone className="w-4 h-4 mr-1" />
          <span className="font-medium">WhatsApp:</span>
          <a href="https://wa.me/919360671185" className="ml-1 hover:underline">+91-9360671185</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
