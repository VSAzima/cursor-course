/**
 * Smooth scroll utilities for navigation
 */

/**
 * Smooth scroll to a target element or position
 * @param target - Element ID (without #), Element, or number (pixels from top)
 * @param offset - Offset in pixels (useful for fixed headers)
 */
export const smoothScrollTo = (
  target: string | HTMLElement | number,
  offset: number = 0
): void => {
  let element: HTMLElement | null = null;
  let targetPosition = 0;

  if (typeof target === 'number') {
    // Scroll to specific position
    targetPosition = target;
  } else if (typeof target === 'string') {
    // Scroll to element by ID
    element = document.getElementById(target);
    if (!element) {
      console.warn(`Element with ID "${target}" not found`);
      return;
    }
    targetPosition = element.offsetTop - offset;
  } else {
    // Scroll to element
    targetPosition = target.offsetTop - offset;
  }

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

/**
 * Scroll to the top of the page smoothly
 */
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Handle anchor link clicks with smooth scroll
 * @param href - The href attribute of the link
 * @param offset - Offset in pixels for fixed headers
 * @returns true if anchor was handled, false otherwise
 */
export const handleAnchorClick = (
  href: string,
  offset: number = 80
): boolean => {
  // Check if it's an anchor link
  if (href.startsWith('#')) {
    const targetId = href.substring(1);
    if (targetId) {
      smoothScrollTo(targetId, offset);
      return true;
    }
    // If just '#', scroll to top
    scrollToTop();
    return true;
  }
  return false;
};

/**
 * Enable smooth scrolling globally by adding CSS
 */
export const enableGlobalSmoothScroll = (): void => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
};

/**
 * Disable global smooth scrolling
 */
export const disableGlobalSmoothScroll = (): void => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'auto';
  }
};

/**
 * Check if user is near bottom of page
 */
export const isNearBottom = (threshold: number = 100): boolean => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  
  return documentHeight - (windowHeight + scrollTop) <= threshold;
};

/**
 * Get scroll percentage
 */
export const getScrollPercentage = (): number => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  
  return (scrollTop / (documentHeight - windowHeight)) * 100;
};
