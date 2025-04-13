
import React, { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, X, Truck, AlertTriangle, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Sample order data
const orders = [
  {
    id: 'ORD-1001',
    customer: 'John Doe',
    date: '2025-04-10',
    status: 'Processing',
    items: [
      { id: 'P1', name: 'Stainless Steel Knife Set', price: 89.99, quantity: 1 },
      { id: 'P2', name: 'Non-stick Frying Pan', price: 49.99, quantity: 2 },
    ],
    total: 189.97,
    address: '123 Main St, Anytown, USA',
    phone: '(555) 123-4567',
    email: 'john.doe@example.com',
  },
  {
    id: 'ORD-1002',
    customer: 'Jane Smith',
    date: '2025-04-09',
    status: 'Shipped',
    items: [
      { id: 'P3', name: 'Silicone Spatula Set', price: 24.99, quantity: 1 },
    ],
    total: 24.99,
    address: '456 Oak Ave, Springfield, USA',
    phone: '(555) 987-6543',
    email: 'jane.smith@example.com',
  },
  {
    id: 'ORD-1003',
    customer: 'Robert Johnson',
    date: '2025-04-08',
    status: 'Delivered',
    items: [
      { id: 'P4', name: 'Electric Kettle', price: 59.99, quantity: 1 },
      { id: 'P5', name: 'Measuring Cup Set', price: 19.99, quantity: 1 },
    ],
    total: 79.98,
    address: '789 Pine St, Westville, USA',
    phone: '(555) 234-5678',
    email: 'robert.j@example.com',
  },
  {
    id: 'ORD-1004',
    customer: 'Emily Wilson',
    date: '2025-04-07',
    status: 'Cancelled',
    items: [
      { id: 'P6', name: 'Food Processor', price: 129.99, quantity: 1 },
    ],
    total: 129.99,
    address: '321 Elm St, Northtown, USA',
    phone: '(555) 876-5432',
    email: 'emily.w@example.com',
  },
  {
    id: 'ORD-1005',
    customer: 'Michael Brown',
    date: '2025-04-06',
    status: 'Pending',
    items: [
      { id: 'P7', name: 'Ceramic Cookware Set', price: 199.99, quantity: 1 },
      { id: 'P8', name: 'Kitchen Scissors', price: 12.99, quantity: 1 },
    ],
    total: 212.98,
    address: '654 Cedar Rd, Eastville, USA',
    phone: '(555) 345-6789',
    email: 'michael.b@example.com',
  },
];

// Function to get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Processing':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
        <Clock className="w-3 h-3 mr-1" /> Processing
      </Badge>;
    case 'Shipped':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
        <Truck className="w-3 h-3 mr-1" /> Shipped
      </Badge>;
    case 'Delivered':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
        <Check className="w-3 h-3 mr-1" /> Delivered
      </Badge>;
    case 'Cancelled':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
        <X className="w-3 h-3 mr-1" /> Cancelled
      </Badge>;
    case 'Pending':
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
        <AlertTriangle className="w-3 h-3 mr-1" /> Pending
      </Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Order details component
const OrderDetails = ({ order }: { order: any }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">Order #{order.id}</p>
          <p className="text-gray-500 text-sm">{order.date}</p>
        </div>
        {getStatusBadge(order.status)}
      </div>
      
      <div className="border-t border-b py-4">
        <h4 className="font-medium mb-2">Items</h4>
        <ul className="space-y-2">
          {order.items.map((item: any) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.quantity}x {item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-semibold mt-4 pt-2 border-t">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Customer Information</h4>
        <p>{order.customer}</p>
        <p>{order.email}</p>
        <p>{order.phone}</p>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Shipping Address</h4>
        <p>{order.address}</p>
      </div>
    </div>
  );
};

const OrderManager = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredOrders = filter === 'All'
    ? orders
    : orders.filter(order => order.status === filter);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <div className="space-x-2">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <Button 
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Order ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Total</th>
              <th className="text-center p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{getStatusBadge(order.status)}</td>
                <td className="p-3 text-right">${order.total.toFixed(2)}</td>
                <td className="p-3 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                      </DialogHeader>
                      <OrderDetails order={order} />
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderManager;
