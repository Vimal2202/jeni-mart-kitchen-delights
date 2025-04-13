
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
}

const SimilarProductsCarousel: React.FC<SimilarProductsCarouselProps> = ({ products }) => {
  if (products.length === 0) return null;

  return (
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
        <CarouselPrevious className="left-0 bg-primary text-white hover:bg-primary/90" />
        <CarouselNext className="right-0 bg-primary text-white hover:bg-primary/90" />
      </Carousel>
    </div>
  );
};

export default SimilarProductsCarousel;
