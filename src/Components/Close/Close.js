import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

import './style.less';

const Close = () => (
  <NavLink
    to="/"
    className="CloseButton"
  >
    <IoMdClose />
  </NavLink>
);

export default Close;
