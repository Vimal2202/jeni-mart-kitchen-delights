
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    // Here you would typically make an API call to subscribe the email
    console.log('Subscribing email:', email);
    
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and offers in your inbox.",
      duration: 3000,
    });
    
    setEmail('');
  };

  return (
    <section className="py-16 bg-jenimart-light">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-jenimart-primary" />
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-gray-600 mb-8">
            Stay up to date with the latest kitchen trends, special offers, and new product arrivals.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button 
              type="submit" 
              className="bg-jenimart-primary hover:bg-jenimart-primary/90"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-sm text-gray-500">
            By subscribing, you agree to receive marketing emails from Jeni Mart. 
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
