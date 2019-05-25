import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import about from './routines';
import Loading from 'Components/Loading';

import './style.less';

const mapStateToProps = (state) => {
  const { about: { loading, text } } = state;
  return { loading, text };
};

const mapDispatchToProps = {
  fetch: about
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class About extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }

  componentDidMount(){
    this.props.fetch();
  }

  render () {
    const { loading, text } = this.props;
    return (
      <>
        <Loading loading={loading}>
          <div className="About">
            {text}
            <div>
              <a href="https://github.com/shapkarin" target="_blank">My github</a>
            </div>
          </div>
        </Loading>
      </>
    )
  }
}