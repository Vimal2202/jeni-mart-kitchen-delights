
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <CartSidebar />
      <Footer />
    </div>
  );
};

export default Layout;
