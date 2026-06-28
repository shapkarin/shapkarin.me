import { createElement } from 'react';
import Link from '@/Components/Link';
import { SCROLL_OFFSET } from '@/constants';
import { highlightHeading } from '@/highlightHeading';

const LinkMacro = ({ href, children }) => {
  const isAnchorLink = href.startsWith('#');
  const isExternalLink = href.startsWith('http://') || href.startsWith('https://');
  const isEmailLink = href.startsWith('mailto:');
  const isInternalLink = !isAnchorLink && !isExternalLink && !isEmailLink;
  
  if (isInternalLink) {
    return createElement(Link, { to: href }, children);
  }
  
  const target = isAnchorLink ? '_self' : '_blank';
  
  const supportsScrollBehavior = CSS.supports('scroll-behavior', 'smooth');
  
  const handleAnchorClick = (e) => {
    if (!isAnchorLink) return;
    
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offset = SCROLL_OFFSET;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      highlightHeading(targetElement);
    }
  };

  const handleAnchorHighlight = () => {
    if (!isAnchorLink) return;
    highlightHeading(document.getElementById(href.substring(1)));
  };

  if(isAnchorLink || isEmailLink){
    return createElement('a', { 
      target, 
      href: href,
      onClick: supportsScrollBehavior ? handleAnchorHighlight : handleAnchorClick
    }, children);
  }

  return createElement(Link, { 
    target, 
    href: href,
    external: isExternalLink,
  }, children);
};

export default LinkMacro;
