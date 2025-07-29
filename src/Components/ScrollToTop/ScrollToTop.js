import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.less';
import isMobile from 'is-mobile';

function ScrollToTop({ selector = '.CloseButton' }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = function () {
    const targetElement = document.querySelector(selector);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback to top of page if target element not found
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const targetElement = document.querySelector(selector);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setIsVisible(rect.top <= 0);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selector]);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={styles.ScrollToTop}
      onClick={handleScrollToTop}
      title="Scroll to top of content"
    >
      {!isMobile() ? 'Scroll to top' : '↑'}
    </button>
  );
}

export default ScrollToTop; 