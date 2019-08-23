/*
  fork from https://github.com/danielsneijers/react-flash-message/blob/master/src/index.jsx
*/
import React, { Component } from "react";
import { node, number, bool } from "prop-types"; // eslint-disable-line import/no-extraneous-dependencies

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = { isVisible: true };

    this.hide = this.hide.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  componentDidMount() {
    this.remaining = this.props.duration;
    this.resumeTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  hide() {
    this.setState({ isVisible: false });
  }

  resumeTimer() {
    window.clearTimeout(this.timer);

    this.start = new Date();
    this.timer = setTimeout(this.hide, this.remaining);
  }

  pauseTimer() {
    if (this.props.persistOnHover) {
      clearTimeout(this.timer);

      this.remaining -= new Date() - this.start;
    }
  }

  render() {
    const { isVisible } = this.state;
    const { children, className, style } = this.props;
    const styles = { className, style };

    return isVisible ? (
      <div
        onMouseEnter={this.pauseTimer}
        onMouseLeave={this.resumeTimer}
        {...styles}
      >
        {className}
        {children}
      </div>
    ) : null;
  }
}

FlashMessage.defaultProps = {
  duration: 5000,
  children: null,
  persistOnHover: true
};

FlashMessage.propTypes = {
  children: node,
  duration: number,
  persistOnHover: bool
};

export default FlashMessage;
