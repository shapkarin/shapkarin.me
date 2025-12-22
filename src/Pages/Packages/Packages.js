// import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiExternalLink } from 'react-icons/fi';
import SEO from '@/Components/SEO';

import { fetchNpmAllPackages } from '@/DAL';
import PackageInfo from './PackageInfo';
// import Additional from './Additional';

import './style.less';

export default function Packages() {
  const { data: { data: { results: packages } } } = useQuery({
    queryKey: 'Packages',
    queryFn: fetchNpmAllPackages
  });

  console.log({ packages })

  return (
    <>
      <SEO 
        title="JavaScript & TypeScript NPM Packages | Yuri Shapkarin"
        description="Explore a collection of JavaScript, TypeScript, and Node.js NPM packages for modern web development. Open-source modules for Redux, React, and more."
      />
      <div className="PagePackages Page__Inner">
        <div>
          {packages.map(({
            package: {
              name,
              links: {
                npm,
                // repository
              }
            },
          }) => (
            <div key={name} className="PagePackages__Item">
              <a target="_blank" rel="noreferrer" href={npm}>{name}</a>
              {' '}
              <FiExternalLink />
              <PackageInfo data={name} />
            </div>
            // <div key={name} className="PagePackages__Item">
            //   <a target="_blank" rel="noreferrer" href={npm}>
            //     { name }
            //     {' '}
            //     <FiExternalLink />
            //   </a>
            //   {/* <PackageInfo id={id} /> */}
            //   <PackageInfo id={id} />
            // </div>
          ))}
        {/* <Additional /> */}
        </div>
      </div>
    </>
  );
};
