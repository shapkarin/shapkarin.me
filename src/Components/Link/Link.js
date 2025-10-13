import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';

const LinkComponent = ({ href, to, children, external, ...props }) => {
  const address = href || to;
  const isExternal = external ?? (address.startsWith('http://') || address.startsWith('https://'));
  const externalAttr = external ? {
    target: '_blank',
    rel: 'noreferrer'
  } : {};
  if(isExternal){
    return <a href={address} {...externalAttr} {...props}>{children}<FiExternalLink size={12} style={{ marginLeft: 2 }}/></a>
  }
  return (
    <Link to={address} {...externalAttr} {...props}>{children}</Link>
  );
}

export default LinkComponent;