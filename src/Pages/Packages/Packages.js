import { useQuery } from 'react-query';
import { FiExternalLink } from 'react-icons/fi';

import { fetchPackages } from 'Common/API';
import PackageInfo from './PackageInfo';
import Additional from './Additional';

import './style.less';

export default function Packages() {
  const { data: { data: { packages } } } = useQuery('Packages', fetchPackages); 

  return (
    <>
    <div className="PagePackages Page__Inner">
      <div>
        {packages.map(({
          title,
          url,
          id,
        }) => (
          <div key={id} className="PagePackages__Item">
            <a target="_blank" rel="noreferrer" href={url}>
              { title }
              {' '}
              <FiExternalLink />
            </a>
            <PackageInfo id={id} />
          </div>
        ))}
      </div>
      <Additional />
    </div>
    </>
  );
};
