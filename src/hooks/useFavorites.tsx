
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.includes(productId);
      const newFavorites = isCurrentlyFavorite
        ? prev.filter(id => id !== productId)
        : [...prev, productId];

      toast({
        title: isCurrentlyFavorite ? "Removed from favorites" : "Added to favorites",
        description: isCurrentlyFavorite 
          ? "The item has been removed from your favorites"
          : "The item has been added to your favorites",
        duration: 2000,
      });

      return newFavorites;
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return { favorites, toggleFavorite, isFavorite };
};
