import React from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.less';

const links = [
  {
    title: 'Repositories',
    url: '/repositories',
  },
  {
    title: 'Liked',
    url: '/liked'
  },
  {
    title: 'Projects',
    url: '/projects',
  },
];

export default () => (
  <nav className="Menu">
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
