
import React from 'react';
import { StarIcon } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Home Chef',
    quote: "The quality of kitchen tools from Jeni Mart has completely transformed my cooking experience. The chef's knife is perfectly balanced and makes prep work a breeze.",
    rating: 5,
    image: '/customer-1.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Restaurant Owner',
    quote: "I've been using Jeni Mart products in my restaurant kitchen for years. Their durability and quality are unmatched, even with heavy daily use.",
    rating: 5,
    image: '/customer-2.jpg',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Baking Enthusiast',
    quote: "The marble rolling pin is a game-changer for pastry work. It stays cool and makes working with delicate doughs so much easier. Worth every penny!",
    rating: 4,
    image: '/customer-3.jpg',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title mb-10">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-jenimart-light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill={i < testimonial.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              
              <blockquote className="mb-6 text-gray-700 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image || '/placeholder.svg'} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
