import { NavLink } from 'react-router-dom';
import { IoIosRefresh } from 'react-icons/io';

import RandomButton from 'Components/RandomButton';
import { PAGES } from '../../Structure';

import './Menu.less';

const Menu = () => (
  <nav className="Menu">
    {PAGES.map(({ name, path, icon }) => {
      return (
        <NavLink
          key={`Menu_${name}`}
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
    <RandomButton className="Menu__Item--bckg">
      <IoIosRefresh/> Background
    </RandomButton>
  </nav>
);

export default Menu;
