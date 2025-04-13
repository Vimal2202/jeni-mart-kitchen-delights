
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-jenimart-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-1 mb-4">
              <span className="text-2xl font-bold text-white">Jeni</span>
              <span className="text-2xl font-bold text-jenimart-secondary">Mart</span>
            </div>
            <p className="text-gray-300 mb-4">
              Premium kitchen utensils for the passionate home chef. Quality products that make cooking a delight.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-jenimart-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-jenimart-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-jenimart-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-jenimart-secondary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-jenimart-secondary"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Categories
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-jenimart-secondary"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/knives" className="text-gray-300 hover:text-white transition-colors">Knives & Cutting</Link>
              </li>
              <li>
                <Link to="/category/cookware" className="text-gray-300 hover:text-white transition-colors">Cookware</Link>
              </li>
              <li>
                <Link to="/category/baking" className="text-gray-300 hover:text-white transition-colors">Baking Tools</Link>
              </li>
              <li>
                <Link to="/category/utensils" className="text-gray-300 hover:text-white transition-colors">Utensils</Link>
              </li>
              <li>
                <Link to="/category/gadgets" className="text-gray-300 hover:text-white transition-colors">Kitchen Gadgets</Link>
              </li>
              <li>
                <Link to="/category/preparation" className="text-gray-300 hover:text-white transition-colors">Food Preparation</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-jenimart-secondary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-jenimart-secondary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Kitchen Lane, Cooking District<br />
                  Foodville, FD 56789
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-jenimart-secondary flex-shrink-0" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-jenimart-secondary flex-shrink-0" />
                <span className="text-gray-300">support@jenimart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 pb-4 mb-6">
          <div className="md:flex items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300">Get the latest updates and offers</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-l bg-gray-700 border-gray-700 focus:outline-none focus:ring-1 focus:ring-jenimart-secondary text-white w-full"
              />
              <button className="px-4 py-2 bg-jenimart-secondary text-white rounded-r hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Jeni Mart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
