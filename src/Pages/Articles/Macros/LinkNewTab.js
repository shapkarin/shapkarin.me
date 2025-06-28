import { createElement } from 'react';
import { Link } from 'react-router-dom';

const LinkMacro = ({ href, children }) => {
  const isAnchorLink = href.startsWith('#');
  const isExternalLink = href.startsWith('http://') || href.startsWith('https://');
  const isInternalLink = !isAnchorLink && !isExternalLink;
  
  // For internal links, use react-router-dom Link
  if (isInternalLink) {
    return createElement(Link, { to: href }, children);
  }
  
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

export default LinkMacro;
