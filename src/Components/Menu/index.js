import React from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.less';

const links = [
  {
    title: 'Github',
    url: '/github',
  },
  {
    title: 'Projects',
    url: '/projects',
  },
  {
    title: 'Mock Example',
    url: '/example'
  }
];

export default () => (
  <nav>
    {links.map((link) => {
      const { title, url } = link;
      return (
        <NavLink
          key={title}
          to={url}
          className="Menu__Item"
          activeClassName="Menu__Item--active"
        >
          { title }
        </NavLink>
      );
    })}
  </nav>
);
