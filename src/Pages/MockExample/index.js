// TODO: maybe move to the separate file Github.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMockExample } from './actions';
import Loading from 'Components/Loading';

const mapStateToProps = (state) => {
  const { example: { loading, list } } = state;
  return { loading, list };
};

const mapDispatchToProps = {
  fetch: fetchMockExample
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Github extends Component {
  componentDidMount(){
    this.props.fetch()
  }

  render () {
    const { loading, list } = this.props;
    return (
      <>
        <Loading loading={loading}>
          <div>
            {list.map(({title, id}) =>(
              <div key={id}>
                {id}: {title}
              </div>
            ))}
          </div>
        </Loading>
      </>
    )
  }
}