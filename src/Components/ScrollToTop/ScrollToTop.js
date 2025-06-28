import styles from './ScrollToTop.module.less';
import isMobile from 'is-mobile';

function ScrollToTop() {
  const handleScrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      className={styles.ScrollToTop}
      onClick={handleScrollToTop}
      title="Scroll to top of page"
    >
      {!isMobile() ? 'Scroll to top' : '↑'}
    </button>
  );
}

export default ScrollToTop; 