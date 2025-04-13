
import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Clock } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $99',
  },
  {
    icon: ShieldCheck,
    title: 'Satisfaction Guaranteed',
    description: '30-day money-back guarantee',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free return process',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Get help when you need it',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-10 bg-jenimart-primary text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <feature.icon className="h-10 w-10 mr-4 text-jenimart-secondary" />
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
