import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';

import RandomButton from 'Components/RandomButton';
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
          {icon()}
          {' '}
          { title }
        </NavLink>
      );
    })}
    <NavLink
      to="/sketches"
      className="Menu__Item"
      activeClassName="Menu__Item--active"
    >
      <FaPlayCircle/> Sketches
    </NavLink>
    <RandomButton />
  </nav>
);

export default Menu;
