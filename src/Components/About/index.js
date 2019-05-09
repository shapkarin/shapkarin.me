import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAbout } from './actions';
import Loading from 'Components/Loading';

import './style.less';

const mapStateToProps = (state) => {
  const { about: { loading, text } } = state;
  return { loading, text };
};

const mapDispatchToProps = {
  fetch: fetchAbout
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class About extends Component {
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
            <div>links</div>
          </div>
        </Loading>
      </>
    )
  }
}