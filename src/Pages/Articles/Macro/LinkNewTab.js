import { createElement } from 'react';

const LinkNewTab = ({ href, children }) => {
  const target = href.startsWith('#') ? '_self' : '_blank';
  return createElement('a', { target, href: href }, children);
};

export default LinkNewTab;
