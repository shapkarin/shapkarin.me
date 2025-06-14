import { FiExternalLink } from 'react-icons/fi';

export default function Additional() {
  return <a
      className="PagePackages__Item_more"
      href="https://www.npmjs.com/~shapkarin"
      target="_blank" rel="noreferrer"
    >
      https://www.npmjs.com/~shapkarin
      {' '}
      <FiExternalLink />
    </a>
}
