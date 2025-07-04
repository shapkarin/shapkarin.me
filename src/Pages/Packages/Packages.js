import { useQuery } from 'react-query';
import { FiExternalLink } from 'react-icons/fi';
import SEO from '@/Components/SEO';

import { fetchPackages } from '@/API';
import PackageInfo from './PackageInfo';
import Additional from './Additional';

import './style.less';

export default function Packages() {
  const { data: { data: { packages } } } = useQuery('Packages', fetchPackages); 

  return (
    <>
      <SEO 
        title="JavaScript & TypeScript NPM Packages | Iurii Shapkarin"
        description="Explore a collection of JavaScript, TypeScript, and Node.js NPM packages for modern web development. Open-source modules for Redux, React, and more."
        type="website"
        name="Iurii Shapkarin"
      />
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
        <Additional />
        </div>
      </div>
    </>
  );
};
