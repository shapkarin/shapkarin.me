import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from './actions';
import Loading from 'Components/Loading';

const mapStateToProps = (state) => {
  const { github: { loading, repositories } } = state;
  return { loading, repositories };
};

const mapDispatchToProps = {
  fetch: fetchRepositories
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Github extends Component {
  componentDidMount(){
    // todo
    const { fetch, repositories } = this.props;
    if(repositories.length === 0){
      fetch()
    }
  }

  render () {
    const { loading, repositories } = this.props;
    return (
      <>
        <Loading loading={loading}>
          <div>
            {repositories.map(({name, url, id}) =>(
              <div key={id}>
                <a href={url}>{name}</a>
              </div>
            ))}
          </div>
        </Loading>
      </>
    )
  }
}