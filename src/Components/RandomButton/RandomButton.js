import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IoIosRefresh } from 'react-icons/io';

import { changeBackground } from './actions';
import './style.less';

const mapDispatchToProps = ({
  randomize: changeBackground
});

const defaultInner = () => <><IoIosRefresh/> Background</>;

const Controls = ({ randomize, children = defaultInner(), ...rest }) => (
  <div onClick={randomize} className="Menu__Item--bckg" {...rest}>
    {children}
  </div>
);

Controls.propTypes = {
  randomize: PropTypes.func.isRequired
};

export default connect(() => ({}), mapDispatchToProps)(Controls);
