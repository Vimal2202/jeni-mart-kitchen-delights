
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const { orderId, customerName } = location.state || { 
    orderId: 'JM' + Math.floor(100000 + Math.random() * 900000),
    customerName: 'Valued Customer'
  };
  
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Order is Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you, {customerName}! Your order has been received and is being processed.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Order Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-semibold">{orderId}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-semibold">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-semibold">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          We've sent a confirmation email to your registered email address with all the order details.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-jenimart-primary hover:bg-jenimart-primary/90">
            <Link to="/">
              Continue Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-jenimart-primary text-jenimart-primary">
            <Link to="/account/orders">
              <ShoppingBag className="mr-2 h-4 w-4" /> View Orders
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
