import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoRepo, GoStar, GoProject } from "react-icons/go";


import Controls from 'Components/Controls';
import './Menu.less';

const links = [
  {
    title: 'Repositories',
    url: '/repositories',
    icon: () => <GoRepo />
  },
  {
    title: 'Liked',
    url: '/liked',
    icon: () => <GoStar />
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: () => <GoProject />
  },
];

export default () => (
  <nav className="Menu">
    {links.map((link) => {
      const { title, url, icon } = link;
      return (
        <NavLink
          key={title}
          to={url}
          className="Menu__Item"
          activeClassName="Menu__Item--active"
        >
          {icon && icon()}
          {' '}
          { title }
        </NavLink>
      );
    })}
    <Controls />
  </nav>
);
