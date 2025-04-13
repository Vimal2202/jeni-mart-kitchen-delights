
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your full address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state/province"),
  zipCode: z.string().min(5, "Please enter a valid zip/postal code"),
  paymentMethod: z.enum(["credit", "paypal", "cod"]),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: "credit",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    console.log("Form submitted with values:", values);
    console.log("Cart items:", items);

    // Simulate payment processing
    try {
      // In a real application, you would make API calls to process payment here
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Order placed successfully!",
        description: "Your payment has been processed.",
        duration: 5000,
      });

      // Clear cart and navigate to success page
      clearCart();
      navigate("/order-success", { 
        state: { 
          orderId: "JM" + Math.floor(100000 + Math.random() * 900000),
          customerName: values.fullName,
        } 
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Shipping Information</h2>
          <p className="text-gray-600">Please enter your shipping details</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street, Apt 4B" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <Input placeholder="NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="md:col-span-1 col-span-2">
                    <FormLabel>ZIP/Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="credit" id="credit" />
                          <FormLabel htmlFor="credit" className="flex-grow cursor-pointer">
                            Credit/Debit Card
                          </FormLabel>
                          <div className="flex space-x-1">
                            <img src="/visa.svg" alt="Visa" className="h-6" />
                            <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                            <img src="/amex.svg" alt="American Express" className="h-6" />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <FormLabel htmlFor="paypal" className="flex-grow cursor-pointer">
                            PayPal
                          </FormLabel>
                          <img src="/paypal.svg" alt="PayPal" className="h-6" />
                        </div>

                        <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="cod" id="cod" />
                          <FormLabel htmlFor="cod" className="flex-grow cursor-pointer">
                            Cash on Delivery
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 md:hidden">
              <OrderSummary items={items} total={totalPrice} />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-jenimart-secondary hover:bg-jenimart-secondary/90 py-6 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Order Summary (Desktop) */}
      <div className="hidden md:block">
        <OrderSummary items={items} total={totalPrice} />
      </div>
    </div>
  );
};

interface OrderSummaryProps {
  items: ReturnType<typeof useCart>['items'];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  const shippingCost = total > 99 ? 0 : 9.99;
  const totalWithShipping = total + shippingCost;

  return (
    <div className="bg-jenimart-light p-6 rounded-lg sticky top-20">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center">
            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
              <img 
                src={item.image || '/placeholder.svg'} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex-grow">
              <h4 className="font-medium">{item.name}</h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-600">Qty: {item.quantity}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>Included</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-bold text-xl">
        <span>Total</span>
        <span>${totalWithShipping.toFixed(2)}</span>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded border border-green-200">
        <div className="flex items-start">
          <div className="bg-green-100 p-2 rounded">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div className="ml-3">
            <p className="font-medium">Free shipping on orders over $99!</p>
            {total < 99 && (
              <p className="text-sm text-gray-600 mt-1">
                Add ${(99 - total).toFixed(2)} more to qualify for free shipping.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
