import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Preloader from '../Preloader';

export default class Loading extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string
    }),

    loaderSize: PropTypes.number,
    loading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    error: {
      code: 0,
      message: ''
    },
    loaderSize: 150
  };

  render() {
    const {
      children,
      error: {
        code,
        message
      },
      loaderSize,
      loading,
      small
    } = this.props;

    if (loading) {
      return <Preloader size={ loaderSize } />;
    }

    if (code) {
      return message;
    }

    return children;
  }
}
