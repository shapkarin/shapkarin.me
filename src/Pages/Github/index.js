import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from './actions';

const mapStateToProps = (state) => {
  const { github: { repositories } } = state;
  return { repositories };
};

const mapDispatchToProps = {
  load: fetchRepositories,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Github extends Component {
  render () {
    const { load } = this.props;
    return (
      <>
        <div>ALIVE</div>
        <button onClick={load}>Load</button>
      </>
    )
  }
}