/**
 * Product interface defining the structure of a product
 */
export interface Product {
  id: string | number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock?: boolean;
  category?: string;
}

/**
 * Props for the ProductCard component
 */
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

/**
 * Props for the RatingStars component
 */
export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showReviewCount?: boolean;
}
