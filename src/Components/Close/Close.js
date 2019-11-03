import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

import './style.less';

const Close = () => (
  <NavLink
      to="/"
      className="CloseButton"
      style={{position: 'absolute', right: '0px', top: '-15px'}}
    >
      <IoMdClose />
    </NavLink>
);

export default Close;
