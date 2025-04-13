
import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CartSidebar: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    totalPrice,
    itemCount
  } = useCart();

  return (
    <div>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" /> 
              Your Cart {itemCount > 0 && `(${itemCount})`}
            </h2>
            <button 
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Empty Cart */}
          {items.length === 0 && (
            <div className="flex-grow flex flex-col items-center justify-center p-6 text-gray-500">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-lg mb-6">Your cart is empty</p>
              <Button
                onClick={closeCart}
                className="bg-jenimart-primary hover:bg-jenimart-primary/90"
              >
                Continue Shopping
              </Button>
            </div>
          )}
          
          {/* Cart Items */}
          {items.length > 0 && (
            <>
              <div className="flex-grow overflow-y-auto p-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start p-2 border rounded hover:bg-gray-50 transition-colors">
                      <Link to={`/product/${item.id}`} onClick={closeCart} className="w-20 h-20 flex-shrink-0">
                        <img 
                          src={item.image || '/placeholder.svg'} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </Link>
                      
                      <div className="ml-4 flex-grow">
                        <Link 
                          to={`/product/${item.id}`} 
                          onClick={closeCart}
                          className="font-medium hover:text-jenimart-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        
                        <div className="flex items-baseline mt-1">
                          <span className="text-jenimart-primary font-semibold">${item.price.toFixed(2)}</span>
                          {item.originalPrice > item.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded">
                            <button 
                              onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Cart Footer */}
              <div className="p-4 border-t mt-auto">
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    asChild
                    className="w-full bg-jenimart-secondary hover:bg-jenimart-secondary/90"
                  >
                    <Link to="/checkout" onClick={closeCart}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={closeCart}
                    className="w-full border-jenimart-primary text-jenimart-primary hover:bg-jenimart-primary/10"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
