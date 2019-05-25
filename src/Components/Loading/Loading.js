import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Preloader from './Preloader';

export default class Loading extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string
    }),
    size: PropTypes.shape({
      preloader: PropTypes.number,
      text: PropTypes.number
    }),
    loading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    error: {
      code: 0,
      message: ''
    },
    size: {
      preloader: 150,
      text: 15
    }
  };

  render() {
    const {
      children,
      error,
      size,
      loading,
      small
    } = this.props;

    if (loading) {
      return <Preloader size={ size.text } />;
    }

    if (error.code) {
      return error.message;
    }

    return children;
  }
}
