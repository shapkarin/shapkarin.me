import { FiExternalLink } from 'react-icons/fi';

export default function Additional() {
  return <div>
    <a
      className="PagePackages__Item_more"
      style={{ width: '185px' }}
      href="https://www.npmjs.com/~shapkarin"
      target="_blank" rel="noreferrer"
    >
      Npm packages
      {' '}
      <FiExternalLink />
    </a>
  </div>
}
