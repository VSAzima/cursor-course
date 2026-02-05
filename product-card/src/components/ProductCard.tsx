import React, { useState } from 'react';
import { ProductCardProps } from '../types';
import RatingStars from './RatingStars';

/**
 * ProductCard Component
 * A reusable, responsive product card for e-commerce applications
 * Features: hover effects, animations, accessibility, TypeScript typing
 */
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = '',
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  /**
   * Handles the "Add to Cart" button click
   */
  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsAdding(true);
      
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onAddToCart(product);
      setIsAdding(false);
    }
  };

  /**
   * Formats price with currency symbol
   */
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <article
      className={`
        group
        bg-white
        rounded-xl
        shadow-md
        overflow-hidden
        transition-all
        duration-300
        hover:shadow-2xl
        hover:-translate-y-2
        flex
        flex-col
        h-full
        ${className}
      `}
      aria-label={`Product: ${product.title}`}
    >
      {/* Product Image Container */}
      <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden bg-gray-100">
        {/* Loading skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className={`
            w-full
            h-full
            object-cover
            transition-all
            duration-500
            group-hover:scale-110
            ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />

        {/* Stock Badge */}
        {product.inStock === false && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Out of Stock
          </div>
        )}

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg uppercase tracking-wide">
            {product.category}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-grow p-5 md:p-6">
        {/* Product Title */}
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h2>

        {/* Product Description */}
        <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3 flex-grow">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mb-4">
          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="md"
          />
        </div>

        {/* Price and Add to Cart Section */}
        <div className="flex items-center justify-between gap-4 mt-auto">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.price > 100 && (
              <span className="text-xs text-green-600 font-medium">
                Free Shipping
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.inStock === false || isAdding}
            className={`
              px-4 py-2.5 md:px-6 md:py-3
              rounded-lg
              font-semibold
              text-sm md:text-base
              transition-all
              duration-300
              transform
              focus:outline-none
              focus:ring-4
              focus:ring-blue-300
              active:scale-95
              ${
                product.inStock === false
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }
            `}
            aria-label={`Add ${product.title} to cart`}
            aria-disabled={product.inStock === false}
          >
            {isAdding ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding...
              </span>
            ) : product.inStock === false ? (
              'Out of Stock'
            ) : (
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
