import { useState, useEffect } from 'react';

/**
 * Hook to track the currently active section based on scroll position
 * Uses IntersectionObserver for efficient performance
 */
export const useActiveSection = (
  sectionIds: string[],
  offset: number = 80
): string => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const intersecting = entries.filter(entry => entry.isIntersecting);
        
        if (intersecting.length > 0) {
          // Sort by intersection ratio and position
          intersecting.sort((a, b) => {
            // Prioritize elements closer to the top
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            
            // If both are above the fold, pick the one closer to the offset
            if (aTop < offset && bTop < offset) {
              return Math.abs(aTop - offset) - Math.abs(bTop - offset);
            }
            
            // Otherwise, pick the one closer to the top
            return aTop - bTop;
          });
          
          const topEntry = intersecting[0];
          const sectionId = topEntry.target.id;
          
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      },
      {
        // Adjust root margin to account for fixed navbar
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observe all sections
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    sections.forEach(section => observer.observe(section));

    // Set initial active section
    const initialSection = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= offset && rect.bottom >= offset;
    });

    if (initialSection) {
      setActiveSection(initialSection.id);
    } else if (sections.length > 0) {
      // Default to first section if none are in view
      setActiveSection(sections[0].id);
    }

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [sectionIds, offset]);

  return activeSection;
};

/**
 * Extract section IDs from navigation items
 */
export const extractSectionIds = (navItems: { href: string }[]): string[] => {
  return navItems
    .map(item => {
      if (item.href.startsWith('#')) {
        return item.href.substring(1);
      }
      return null;
    })
    .filter((id): id is string => id !== null && id !== '');
};
