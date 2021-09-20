import React from 'react';
import { NavLink } from 'react-router-dom';

import RandomButton from 'Components/RandomButton';
import { PAGES } from 'Components/Structure';

import './Menu.less';

const Menu = () => (
  <nav className="Menu">
    {PAGES.map(({ name, path, icon }) => {
      return (
        <NavLink
          key={name}
          to={path}
          className="Menu__Item"
          activeClassName="Menu__Item--active"
        >
          {icon()}
          {' '}
          { name }
        </NavLink>
      );
    })}
    <RandomButton />
  </nav>
);

export default Menu;
