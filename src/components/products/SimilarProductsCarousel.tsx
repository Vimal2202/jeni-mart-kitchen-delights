
import React from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SimilarProductsCarouselProps {
  products: Product[];
  title?: string;
}

const SimilarProductsCarousel: React.FC<SimilarProductsCarouselProps> = ({ products, title = "Similar Products" }) => {
  if (products.length === 0) return null;

  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {title}
        </h2>
      )}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white shadow-md border border-gray-200 text-gray-800 hover:bg-gray-50" />
          <CarouselNext className="right-0 bg-white shadow-md border border-gray-200 text-gray-800 hover:bg-gray-50" />
        </Carousel>
      </div>
    </div>
  );
};

export default SimilarProductsCarousel;
