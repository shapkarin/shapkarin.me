import React from 'react';
import { NavLink } from 'react-router-dom';

import RandomButton from 'Components/RandomButton';
import pages from './pages';

import './Menu.less';

const Menu = () => (
  <nav className="Menu">
    {pages.map((link) => {
      const { title, url, icon } = link;
      return (
        <NavLink
          key={title}
          to={url}
          className="Menu__Item"
          activeClassName="Menu__Item--active"
        >
          {icon()}
          {' '}
          { title }
        </NavLink>
      );
    })}
    <RandomButton />
  </nav>
);

export default Menu;
