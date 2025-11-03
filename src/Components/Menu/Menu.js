import { NavLink } from 'react-router-dom';
import { IoIosRefresh } from 'react-icons/io';
import isMobile from 'is-mobile';

import RandomButton from '@/Components/RandomButton';
import Search from '@/Components/Search';
import { PAGES } from '@/Structure';

import './Menu.less';

const Menu = ({ ...rest }) => (
  <nav className="Menu" role="navigation" aria-label="Main Menu" {...rest}>
    <ul className="Menu_List">
    {PAGES.map(({ name, path, Icon, noInMenu }, id) => {
      if (noInMenu) {
        return null;
      }

      return (
        <li
          className="Menu_List_Item"
          key={id}
        >
          <NavLink
            exact
            key={`Menu_${name}`}
            to={path}
            className="Menu__Item"
            activeClassName="Menu__Item--active"
          >
            <Icon />
            {' '}
            { name }
          </NavLink>
        </li>
      );
    })}
    </ul>
    <Search />
    {isMobile && <RandomButton className="Menu__Item Menu__Item--unselect Menu__Item--bg">
      <IoIosRefresh/> bg upd
    </RandomButton>}
  </nav>
);

export default Menu;
