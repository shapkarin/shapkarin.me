import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Preloader extends PureComponent {
  static propTypes = {
    size: PropTypes.number.isRequired
  };

  render() {
    const { size } = this.props;
    return (
      <div style={{ fontSize: '50px' }}>
        LOADING....
      </div>
    );
  }
}
