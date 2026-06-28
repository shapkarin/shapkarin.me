import { useQuery } from '@tanstack/react-query';
import { FiExternalLink } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';

import SEO from '@/Components/SEO';
import Link from '@/Components/Link';

import { fetchPackages } from '@/DAL';
import PackageInfo from './PackageInfo';
import Additional from './Additional';


import './style.less';

export default function Packages() {
  const { data: { data: { packages } } } = useQuery({
    queryKey: ['Packages'],
    queryFn: fetchPackages
  }); 

  return (
    <>
      <SEO 
        title="JavaScript & TypeScript NPM Packages | Yuri Shapkarin"
        description="Explore a collection of JavaScript, TypeScript, and Node.js NPM packages for modern web development. Open-source modules for Redux, React, and more."
      />
      <ReactTooltip
        place="bottom"
      />
      <div className="PagePackages Page__Inner">
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
        <Additional />
      </div>
      <Link to="https://github.com/shapkarin/redux-scaffolder" data-tip="I unpublished it later but still visible via npm API">
        Created the CLI tool in 2019
      </Link>
    </>
  );
};
