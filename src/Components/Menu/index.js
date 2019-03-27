import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  {
    title: 'Githib',
    url: '/github',
  },
  {
    title: 'Projects',
    url: '/projects',
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
          className="main-menu__item main-menu__item--link"
          activeClassName="active"
        >
          { title }
        </NavLink>
      );
    })}
  </nav>
);
