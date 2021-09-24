import { useState } from 'react';
import { useQuery } from 'react-query';
import { GoChevronRight, GoChevronDown } from 'react-icons/go';
import { FiExternalLink } from 'react-icons/fi';

import { fetchPackages, fetchPackageInfo } from 'Common/API';
import Collapse from 'Components/Collapse';
import Preloader from 'Components/Preloader';

import './style.less';

export default function Packages() {
  const { data: { data: { packages } } } = useQuery('Packages', fetchPackages); 

  return (
    <div className="PageProjects Page__Inner">
      <div>
        {packages.map(({
          name,
          url,
          id,
        }) => (
          <div key={id} className="PageProjects__Item">
            <a target="_blank" rel="noreferrer" href={url}>
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
        <Collapse open={isOpen}>
          <PackageInfoContent id={id} />
        </Collapse>
      </Preloader>
    </>
  )
}

function PackageInfoContent({ isOpen = false, id }) {
  const { data: { data: { description } = {} } = {} } = useQuery(['PackageIntro', id], () => fetchPackageInfo(id));

  return (
    <div
      className="Project__Info"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )
}


function Additional() {
  return <div>
    <a
      className="PageProjects__Item_more"
      style={{ width: '175px' }}
      href="https://www.npmjs.com/~shapkarin"
      target="_blank" rel="noreferrer"
    >
      All published packages
      {' '}
      <FiExternalLink />
    </a>
    <a
      className="PageProjects__Item_more"
      style={{ width: '185px' }}
      href="https://github.com/shapkarin?tab=repositories"
      target="_blank" rel="noreferrer"
    >
      My GitHub repositories
      {' '}
      <FiExternalLink />
    </a>
    <a
      className="PageProjects__Item_more"
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