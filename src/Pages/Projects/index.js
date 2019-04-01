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
              name, url, id, loading = false, info, open = false, fetched
            }) =>(
              <div key={id} style={{marginBottom: '10px'}}>
                <a href={url}>
                  {name}
                </a>
                <br/>
                <div style={{cursor: 'pointer'}}onClick={() => toggleInfo({id, fetched})}>{open ? 'close' : 'show'} info</div>
                <Loading loading={loading}>
                  <Collapse open={open}>
                    <div dangerouslySetInnerHTML={info} />
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