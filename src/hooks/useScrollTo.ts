// Custom hook for scroll to element
import { useCallback } from 'react';

interface ScrollToOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  offset?: number;
}

export const useScrollTo = () => {
  const scrollToElement = useCallback((
    elementId: string,
    options: ScrollToOptions = {}
  ) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    const {
      behavior = 'smooth',
      block = 'start',
      inline = 'nearest',
      offset = 0,
    } = options;

    // If there's an offset, calculate the position manually
    if (offset !== 0) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    } else {
      element.scrollIntoView({
        behavior,
        block,
        inline,
      });
    }
  }, []);

  const scrollToTop = useCallback((behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, []);

  return { scrollToElement, scrollToTop };
};

export default useScrollTo;
