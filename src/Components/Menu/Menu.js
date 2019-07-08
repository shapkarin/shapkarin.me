import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';

import Controls from 'Components/Controls';
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
    <Controls />
    <NavLink to="/sketches" style={{paddingTop: '40px'}} className="Menu__Item">
      <FaPlayCircle/> Sketches
    </NavLink>
  </nav>
);

export default Menu;
