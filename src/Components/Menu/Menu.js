import React from 'react';
import { NavLink } from 'react-router-dom';

import Controls from 'Components/Controls';
import Sketches from 'Components/Sketches';
import links from './links';

import './Menu.less';

const Menu = () => (
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
    <Sketches />
  </nav>
);

export default Menu;
