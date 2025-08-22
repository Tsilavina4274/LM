// hooks/useGalleryImages.ts
import { useState, useEffect } from "react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  service: string;
  uploadDate: string;
  tags: string[];
  publiee: boolean;
}

export const useGalleryImages = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = () => {
      try {
        const savedImages = localStorage.getItem('lm-gallery-images');
        if (savedImages) {
          const parsedImages = JSON.parse(savedImages);
          const publishedImages = parsedImages.filter((img: GalleryImage) => img.publiee);
          
          const transformedImages = publishedImages.map((img: GalleryImage) => ({
            id: img.id,
            image: img.url,
            title: img.title,
            category: img.category,
            description: img.description
          }));
          
          setImages(transformedImages);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  return { images, isLoading };
};