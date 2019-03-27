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
  fetch: fetchRepositories,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Github extends Component {
  componentDidMount(){
    // todo
    const { fetch } = this.props;
    if(this.props.repositories.length === 0){
      fetch()
    }
  }

  render () {
    const { loading, repositories } = this.props;
    return (
      <>
        <Loading loading={loading} loaderSize={ 50 }>
          <div>
            {repositories.map(({name, url, id}) =>(
              <div>
                <a href={url} key={id}>{name}</a>
              </div>
            ))}
          </div>
        </Loading>
      </>
    )
  }
}