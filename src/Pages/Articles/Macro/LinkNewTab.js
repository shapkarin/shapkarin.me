import { createElement } from 'react';

const LinkNewTab = ({ href, children }) => {
  const isAnchorLink = href.startsWith('#');
  const target = isAnchorLink ? '_self' : '_blank';
  
  // Check if browser supports CSS scroll-behavior
  const supportsScrollBehavior = CSS.supports('scroll-behavior', 'smooth');
  
  const handleAnchorClick = (e) => {
    if (!isAnchorLink) return;
    
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offset = 60;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return createElement('a', { 
    target, 
    href: href, 
    ...(isAnchorLink && !supportsScrollBehavior ? { onClick: handleAnchorClick } : {})
  }, children);
};

export default LinkNewTab;
