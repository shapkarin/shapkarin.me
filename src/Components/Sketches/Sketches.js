// todo: SPA canvas sketches gallery
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';

const Sketches = () => (
  <NavLink to="/gallery" style={{paddingTop: '40px'}} className="Menu__Item">
    <FaPlayCircle/> Sketches
  </NavLink>
);

export default Sketches;
