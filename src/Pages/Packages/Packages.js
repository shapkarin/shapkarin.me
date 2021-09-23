import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { GoChevronRight, GoChevronDown } from 'react-icons/go';
import { FiExternalLink } from 'react-icons/fi';

import { fetchPackages, fetchPackageInfo } from 'Common/API';
import Collapse from 'Components/Collapse';
import Preloader from 'Components/Preloader';

import './style.less';

export default function Packages() {
  const { data: { data: list } } = useQuery('Packages', fetchPackages); 

  return (
    <div className="PageProjects Page__Inner">
      <div>
        {list.map(({
          name,
          url,
          id,
        }) => (
          <div key={id} className="PageProjects__Item">
            <a target="_blank" href={url}>
              {name}
              {' '}
              <FiExternalLink />
            </a>
            <PackageInfo id={id} />
          </div>
        ))}
      </div>
      <Additional />
    </div>
  );
}

// TODO: rethink
function PackageInfo({ id }) {
  const [isOpen, setIsOpen] = useState(false); // todo: persist

  return (
    <>
      <div
        className="toggle_info"
        onClick={() => setIsOpen(!isOpen)}
      >
        more info
        {' '}
        {isOpen ? <GoChevronDown /> : <GoChevronRight />}
      </div>
      <Preloader>
        <PackageInfoContent isOpen={isOpen} id={id} />
      </Preloader>
    </>
  )
}

function PackageInfoContent({ isOpen = false, id }) {

  const { data: { data: { intro } = {} } = {}, refetch } = useQuery(['PackageInfo', id], () => fetchPackageInfo(id), {
    enabled: false,
    refetchOnWindowFocus:false
  });

  if(isOpen) refetch()

  return (
    <Collapse open={isOpen}>
      <div
        className="Project__Info"
        dangerouslySetInnerHTML={{ __html: intro }}
      />
    </Collapse>
  )
}


function Additional() {
  return <div>
    <a
      className="PageProjects__Item_more"
      style={{ width: '175px' }}
      href="https://www.npmjs.com/~shapkarin"
      target="_blank"
    >
      All published packages
      {' '}
      <FiExternalLink />
    </a>
    <a
      className="PageProjects__Item_more"
      style={{ width: '185px' }}
      href="https://github.com/shapkarin?tab=repositories"
      target="_blank"
    >
      My GitHub repositories
      {' '}
      <FiExternalLink />
    </a>
    <a
      className="PageProjects__Item_more"
      style={{ width: '82px' }}
      href="https://freelansim.ru/freelancers/yuryshapkarin/projects"
      target="_blank"
    >
      Portfolio
      {' '}
      <FiExternalLink />
    </a>
  </div>
}