import React, { useState, useEffect } from 'react';
import { scrollToTop } from './utils';

interface ScrollToTopProps {
  showAfter?: number;
  className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  showAfter = 300,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16 pointer-events-none'
      } ${className}`}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg
        className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
      
      {/* Ripple effect on hover */}
      <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300" />
    </button>
  );
};

export default ScrollToTop;
