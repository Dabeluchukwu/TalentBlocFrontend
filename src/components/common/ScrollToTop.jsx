
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Pages where scroll position should be preserved
    const preserveScrollPages = [
      '/resources',
      '/resources/articles',
      '/resources/case-studies',
      '/resources/announcements'
    ];

    // Check if current page should preserve scroll
    const shouldPreserveScroll = preserveScrollPages.some(page => 
      pathname === page
    );

    // For all other pages, scroll to top
    if (!shouldPreserveScroll) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    // For resource pages, we do nothing - let React Router handle it
  }, [pathname]);

  return null;
};

export default ScrollToTop;