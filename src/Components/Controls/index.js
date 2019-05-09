import React from 'react';
import { connect } from 'react-redux';
import { IoIosRefresh } from "react-icons/io";

import { CHANGE_BACKGROUND } from './constants';

const mapDispatchToProps = ({
  do_change: () => ({ type: CHANGE_BACKGROUND })
});

const Controls = (props) => {
  return (
    <span onClick={() => props.do_change()} style={{cursor: 'pointer', userSelect: 'none', marginTop: '1em'}} >
      <IoIosRefresh/> Background
    </span>
  )
}

export default connect(() => ({}), mapDispatchToProps)(Controls);