
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingBag, DollarSign, Users, TrendingUp } from 'lucide-react';

// Mock data for the dashboard
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stylish-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">$42,689.00</div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="stylish-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">349</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="stylish-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">2,390</div>
            <p className="text-xs text-gray-500">+18.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="stylish-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">3.2%</div>
            <p className="text-xs text-gray-500">+5.1% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="stylish-card">
        <CardHeader>
          <CardTitle className="gold-text">Sales Overview</CardTitle>
          <CardDescription>Sales performance over the last 7 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #FFD700',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="sales" fill="#FFD700" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="stylish-card">
          <CardHeader>
            <CardTitle className="gold-text">Top Products</CardTitle>
            <CardDescription>Most selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              <li className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">Premium Chef's Knife</p>
                  <p className="text-sm text-gray-500">Kitchen Knives</p>
                </div>
                <p className="text-primary font-semibold">$189.99</p>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">Stainless Steel Pot Set</p>
                  <p className="text-sm text-gray-500">Cookware</p>
                </div>
                <p className="text-primary font-semibold">$249.99</p>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">Wooden Cutting Board</p>
                  <p className="text-sm text-gray-500">Kitchen Accessories</p>
                </div>
                <p className="text-primary font-semibold">$69.99</p>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">Non-stick Frying Pan</p>
                  <p className="text-sm text-gray-500">Cookware</p>
                </div>
                <p className="text-primary font-semibold">$89.99</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="stylish-card">
          <CardHeader>
            <CardTitle className="gold-text">Recent Activities</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              <li className="py-3">
                <p className="font-medium">New order #12458</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </li>
              <li className="py-3">
                <p className="font-medium">Product stock updated</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </li>
              <li className="py-3">
                <p className="font-medium">New customer registered</p>
                <p className="text-sm text-gray-500">Yesterday at 15:30</p>
              </li>
              <li className="py-3">
                <p className="font-medium">New review on Premium Chef's Knife</p>
                <p className="text-sm text-gray-500">Yesterday at 12:20</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
