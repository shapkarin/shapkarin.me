import React from 'react';
import PropTypes from 'prop-types';
import { IoIosRefresh } from 'react-icons/io';

import scene from '../Background';

import './style.less';

const defaultInner = () => <><IoIosRefresh/> Background</>;

const RandomButton = ({ children = defaultInner(), ...rest }) => {
  const randomize = function(){
    scene.randomizeAll();
    scene.draw();
  };

  return (
    <div onClick={randomize} className="Menu__Item--bckg" {...rest}>
      {children}
    </div>
  )
};

export default RandomButton;
