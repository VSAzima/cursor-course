import React from 'react';
import { RatingStarsProps } from '../types';

/**
 * RatingStars Component
 * Displays star rating with optional review count
 * Supports different sizes and accessibility features
 */
const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  reviewCount,
  size = 'md',
  showReviewCount = true,
}) => {
  // Ensure rating is between 0 and maxRating
  const normalizedRating = Math.max(0, Math.min(rating, maxRating));
  
  // Size classes for stars
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  /**
   * Renders a single star (full, partial, or empty)
   */
  const renderStar = (index: number) => {
    const fillPercentage = Math.max(0, Math.min(100, (normalizedRating - index) * 100));

    return (
      <div key={index} className="relative inline-block">
        {/* Empty star (background) */}
        <svg
          className={`${sizeClasses[size]} text-gray-300`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>

        {/* Filled star (overlay) */}
        {fillPercentage > 0 && (
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <svg
              className={`${sizeClasses[size]} text-yellow-400`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {/* Star rating display */}
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rating: ${normalizedRating} out of ${maxRating} stars`}
      >
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>

      {/* Rating number */}
      <span className={`${textSizeClasses[size]} font-medium text-gray-700`}>
        {normalizedRating.toFixed(1)}
      </span>

      {/* Review count */}
      {showReviewCount && reviewCount !== undefined && (
        <span className={`${textSizeClasses[size]} text-gray-500`}>
          ({reviewCount.toLocaleString()} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
