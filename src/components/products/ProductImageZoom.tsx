
import React, { useState } from 'react';

interface ProductImageZoomProps {
  image: string;
  alt: string;
}

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({ image, alt }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg bg-white"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-200"
      />
      {isZoomed && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            backgroundSize: '200%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

export default ProductImageZoom;
