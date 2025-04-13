
import React from 'react';
import Layout from '../components/layout/Layout';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { items, itemCount } = useCart();
  const navigate = useNavigate();

  // Redirect to products page if cart is empty
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-gray-300" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart before proceeding to checkout.
          </p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-jenimart-primary hover:bg-jenimart-primary/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">
            Complete your order by providing your shipping and payment details
          </p>
        </div>
        
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default Checkout;
