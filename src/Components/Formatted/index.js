/*
  TODO: remove or rethink this component, due the src/Generate-Backend/database-to-json.js
        and src/Generate-Backend/database.js latest updates
*/
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const Formatted = function Formatted({ children }){
  return children?.split('\n').map((line, id) => <Fragment key={id}>{ line }<br /></Fragment>) || null;
}

Formatted.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Formatted;