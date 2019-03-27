import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Preloader extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
  };

  static defaultProps = {
    size: 150
  };

  render() {
    const { size } = this.props;
    return (
      <div style={{ fontSie: size}}>
        LOADING....
      </div>
    );
  }
}
