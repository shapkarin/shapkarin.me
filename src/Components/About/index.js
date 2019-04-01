import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAbout } from './actions';
import Loading from 'Components/Loading';

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
          <div>
            [it's new ver. under dev. <a href="https://github.com/shapkarin/shapkarin.me">Github</a>]<br/>
            {text}
          </div>
        </Loading>
      </>
    )
  }
}