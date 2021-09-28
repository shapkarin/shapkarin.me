import { FiExternalLink } from 'react-icons/fi';

export default function Additional() {
  return <div>
    <a
      className="PagePackages__Item_more"
      style={{ width: '175px' }}
      href="https://www.npmjs.com/~shapkarin"
      target="_blank" rel="noreferrer"
    >
      All published packages
      {' '}
      <FiExternalLink />
    </a>
    <a
      className="PagePackages__Item_more"
      style={{ width: '185px' }}
      href="https://github.com/shapkarin?tab=repositories"
      target="_blank" rel="noreferrer"
    >
      My GitHub repositories
      {' '}
      <FiExternalLink />
    </a>
    <a
      className="PagePackages__Item_more"
      style={{ width: '82px' }}
      href="https://freelansim.ru/freelancers/yuryshapkarin/projects"
      target="_blank" rel="noreferrer"
    >
      Portfolio
      {' '}
      <FiExternalLink />
    </a>
  </div>
}