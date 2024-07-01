// TODO: keep "open" props inside with hook, add stylable switcher directly to the component
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Collapse extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired
  };

  render() {
    const { open, children } = this.props;

    if (open) {
      return (
        <div>
          { children }
        </div>
      );
    }

    return null;
  }
}
