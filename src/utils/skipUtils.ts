import { Skip } from '../types';

/**
 * Utility functions for skip-related operations
 */

export const getSkipImageUrl = (skip: Skip): string => {
  // Map skip sizes to actual image files in the public folder
  const imageMap: Record<number, string> = {
    4: '4-yarder-skip.jpg',
    5: '5-yarder-skip.jpg',
    6: '6-yarder-skip.jpg',
    8: '8-yarder-skip.jpg',
    10: '10-yarder-skip.jpg',
    12: '12-yarder-skip.jpg',
    14: '14-yarder-skip.jpg',
    16: '16-yarder-skip.jpg',
    20: '20-yarder-skip.jpg',
    40: '40-yarder-skip.jpg',
  };

  // Return the actual image URL, or fallback to a similar size if exact match not found
  const exactImage = imageMap[skip.size];
  if (exactImage) {
    return `/${exactImage}`;
  }

  // Fallback logic: find the closest available image size
  const availableSizes = Object.keys(imageMap).map(Number).sort((a, b) => a - b);
  const closestSize = availableSizes.reduce((prev, curr) => 
    Math.abs(curr - skip.size) < Math.abs(prev - skip.size) ? curr : prev
  );
  
  return `/${imageMap[closestSize]}`;
};

export const formatHirePeriod = (skip: Skip): string => {
  const days = skip.hire_period_days;
  if (days === 1) return '1 day';
  if (days === 7) return '1 week';
  if (days === 14) return '2 weeks';
  if (days === 21) return '3 weeks';
  if (days === 28) return '4 weeks';
  return `${days} days`;
};

export const getSkipCapacityDescription = (skip: Skip): string => {
  const size = skip.size;
  
  // Provide capacity descriptions based on skip size
  if (size <= 4) {
    return 'Perfect for small household clearouts and garden waste';
  } else if (size <= 6) {
    return 'Ideal for bathroom renovations and small building projects';
  } else if (size <= 8) {
    return 'Great for kitchen renovations and medium household clearouts';
  } else if (size <= 12) {
    return 'Suitable for large home renovations and construction projects';
  } else if (size <= 16) {
    return 'Perfect for major building work and large-scale clearouts';
  } else if (size <= 20) {
    return 'Ideal for commercial projects and extensive renovations';
  } else {
    return 'Perfect for large commercial and industrial projects';
  }
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
