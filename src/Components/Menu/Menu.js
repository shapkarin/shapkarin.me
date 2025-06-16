import { NavLink } from 'react-router-dom';
import { IoIosRefresh } from 'react-icons/io';
import clsx from 'clsx';

import RandomButton from 'Components/RandomButton';
import { PAGES } from '../../Structure';

import './Menu.less';

const Menu = () => (
  <nav className="Menu">
    <ul className="Menu_List">
    {PAGES.map(({ name, path, icon, hidden }, id) => {
      return (
        <li
          className="Menu_List_Item"
          key={id}
        >
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
        </li>
      );
    })}
    <RandomButton className="Menu__Item Menu__Item--unselect">
      <IoIosRefresh/> Background
    </RandomButton>
    </ul>
  </nav>
);

export default Menu;
