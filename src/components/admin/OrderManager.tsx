
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Eye, PackageCheck, Truck, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  shipping: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

// Mock orders
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Smith",
    date: "2025-04-10",
    total: 249.97,
    status: "processing",
    items: [
      { id: "1", name: "Premium Chef's Knife", price: 189.99, quantity: 1 },
      { id: "3", name: "Wooden Cutting Board", price: 59.98, quantity: 1 },
    ],
    shipping: {
      name: "John Smith",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  },
  {
    id: "ORD-002",
    customer: "Emily Johnson",
    date: "2025-04-09",
    total: 349.97,
    status: "shipped",
    items: [
      { id: "2", name: "Stainless Steel Pot Set", price: 249.99, quantity: 1 },
      { id: "3", name: "Wooden Cutting Board", price: 69.99, quantity: 1 },
      { id: "4", name: "Silicone Spatula Set", price: 29.99, quantity: 1 },
    ],
    shipping: {
      name: "Emily Johnson",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    date: "2025-04-08",
    total: 189.99,
    status: "delivered",
    items: [
      { id: "1", name: "Premium Chef's Knife", price: 189.99, quantity: 1 },
    ],
    shipping: {
      name: "Michael Brown",
      address: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      zip: "60007",
      country: "USA",
    },
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    date: "2025-04-07",
    total: 319.98,
    status: "cancelled",
    items: [
      { id: "2", name: "Stainless Steel Pot Set", price: 249.99, quantity: 1 },
      { id: "4", name: "Silicone Spatula Set", price: 29.99, quantity: 1 },
      { id: "5", name: "Measuring Cups", price: 39.99, quantity: 1 },
    ],
    shipping: {
      name: "Sarah Wilson",
      address: "101 Cedar Road",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "USA",
    },
  },
];

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewingOrder, setIsViewingOrder] = useState(false);
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewingOrder(true);
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-amber-100 text-amber-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <PackageCheck className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <Check className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been marked as ${newStatus}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="stylish-card">
        <CardHeader>
          <CardTitle className="gold-text">Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewOrder(order)}
                          className="text-primary hover:bg-primary/10 border-primary"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select 
                          defaultValue={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isViewingOrder} onOpenChange={setIsViewingOrder}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="gold-text text-xl">Order Details: {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Order placed on {selectedOrder?.date} by {selectedOrder?.customer}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(selectedOrder.status)} variant="outline">
                  <span className="flex items-center">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-1 capitalize">{selectedOrder.status}</span>
                  </span>
                </Badge>
                <span className="text-xl font-bold">${selectedOrder.total.toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <div className="text-sm text-gray-600">
                    <p>{selectedOrder.shipping.name}</p>
                    <p>{selectedOrder.shipping.address}</p>
                    <p>{selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.zip}</p>
                    <p>{selectedOrder.shipping.country}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${(selectedOrder.total - 10).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>$10.00</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2">
                      <span>Total:</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Items</h4>
                <div className="border rounded-md divide-y">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewingOrder(false)}>
                  Close
                </Button>
                <Select
                  defaultValue={selectedOrder.status}
                  onValueChange={(value) => {
                    updateOrderStatus(selectedOrder.id, value as Order['status']);
                    setIsViewingOrder(false);
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManager;
