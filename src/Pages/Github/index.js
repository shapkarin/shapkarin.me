// TODO: maybe move to the separate file Github.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from './actions';
import Loading from 'Components/Loading';

const mapStateToProps = (state) => {
  const { github: { loading, repositories } } = state;
  return { loading, repositories };
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
    const { load, loading, repositories } = this.props;
    return (
      <>
        <button onClick={load}>Load</button>
        <Loading loading={loading} loaderSize={ 50 }>
          {repositories.map(({name}, index) =>(
            <div key={index}>{name}</div>
          ))}
        </Loading>
      </>
    )
  }
}