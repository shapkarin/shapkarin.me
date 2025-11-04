import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineSearch } from "react-icons/md";
import { IoIosRefresh } from 'react-icons/io';
import { isMobile } from '@/constants';

import RandomButton from '@/Components/RandomButton';
import Search from '@/Components/Search';
import { PAGES } from '@/Structure';

import './Menu.less';

const Menu = ({ ...rest }) => {
  const [isShowSearch, setIsShowSearch] = useState(false);

  return (
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
        {isMobile && <li>
          <MdOutlineSearch onClick={() => setIsShowSearch(currentState => !currentState)}>Search</MdOutlineSearch>
        </li>}
      </ul>
      {(isShowSearch || !isMobile) && <Search />}
      {isMobile && <RandomButton className="Menu__Item Menu__Item--unselect Menu__Item--bg">
        <IoIosRefresh/> bg upd
      </RandomButton>}
    </nav>
  )
};

export default Menu;
