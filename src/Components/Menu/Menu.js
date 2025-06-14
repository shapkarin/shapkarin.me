import { NavLink } from 'react-router-dom';
import { IoIosRefresh } from 'react-icons/io';
import clsx from 'clsx';

import RandomButton from 'Components/RandomButton';
import { PAGES } from '../../Structure';

import './Menu.less';

const Menu = () => (
  <nav className="Menu">
    {PAGES.map(({ name, path, icon, hidden }) => {
      return (
        <NavLink
          key={`Menu_${name}`}
          to={path}
          className={clsx('Menu__Item', {
            'Menu__Item--hidden': false && hidden,
          })}
          activeClassName="Menu__Item--active"
        >
          {icon()}
          {' '}
          { name }
        </NavLink>
      );
    })}
    <RandomButton className="Menu__Item">
      <IoIosRefresh/> Background
    </RandomButton>
  </nav>
);

export default Menu;
