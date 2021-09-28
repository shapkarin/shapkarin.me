import { Fragment } from 'react';
import PropTypes from 'prop-types';

const Formatted = function Formatted({ children }){
  return children?.split('\n').map((line, id) => <Fragment key={id}>{ line }<br /></Fragment>) || null;
}

Formatted.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Formatted;