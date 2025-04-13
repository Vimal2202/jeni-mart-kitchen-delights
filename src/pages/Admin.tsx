
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/layout/Layout';
import AdminAuth from '@/components/admin/AdminAuth';
import ProductManager from '@/components/admin/ProductManager';
import OrderManager from '@/components/admin/OrderManager';
import Dashboard from '@/components/admin/Dashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8 gold-text">Admin Dashboard</h1>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductManager />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderManager />
          </TabsContent>
          
          <TabsContent value="settings" className="stylish-card">
            <h3 className="text-xl font-semibold mb-4 gold-text">Admin Settings</h3>
            <p className="text-gray-600 mb-4">Configure your admin account and store settings here.</p>
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Store Information</h4>
                <p className="text-gray-600">Update your store details, contact information, and business hours.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Payment Methods</h4>
                <p className="text-gray-600">Configure payment gateways and accepted payment methods.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Shipping Options</h4>
                <p className="text-gray-600">Set up shipping rates, zones, and delivery methods.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Tax Settings</h4>
                <p className="text-gray-600">Configure tax rates and tax zones for different regions.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
