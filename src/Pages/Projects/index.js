// TODO: maybe move to the separate file Github.js
import React, { Component } from 'react';
import { connect } from 'react-redux';


import { fetchProjects, fetchProjectInfo } from './actions';
import Loading from 'Components/Loading';
import Collapse from 'Components/Collapse';

const mapStateToProps = (state) => {
  const { projects: { loading, data } } = state;
  const projectsArray = Object.keys(data).map(key => data[key]);

  return {
    loading,
    projects: projectsArray 
  };
};

const mapDispatchToProps = {
  fetch: fetchProjects,
  toggleInfo: fetchProjectInfo
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Projects extends Component {
  componentDidMount(){
    const { fetch, projects } = this.props;
    if(projects.length === 0){
      fetch()
    }
  }

  render () {
    const { loading, projects, toggleInfo } = this.props;
    return (
      <>
        <Loading loading={loading}>
          <div>
            {projects.map(({
              name, url, id, loading, info, open, fetched
            }) =>(
              <div key={id}>
                <a href={url}>
                  {name}: {id}
                </a>
                <br/>
                <button onClick={() => toggleInfo({id, fetched})}>{open ? 'close' : 'open'}</button>
                <Loading loading={loading}>
                  <Collapse open={open}>
                    <div>{info}</div>
                  </Collapse>
                </Loading>
              </div>
            ))}
          </div>
        </Loading>
      </>
    )
  }
}