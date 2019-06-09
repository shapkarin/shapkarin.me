import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoChevronRight, GoChevronDown } from "react-icons/go";

import Loading from 'Components/Loading';
import Collapse from 'Components/Collapse';
import { projects, info } from './routines';

import './style.less';

const mapStateToProps = (state) => {
  const { projects: { loading, data } } = state;
  const projectsArray = Object.keys(data).map(key => data[key]);

  return {
    loading,
    projects: projectsArray 
  };
};

const mapDispatchToProps = {
  fetch: projects,
  toggleInfo: info
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Projects extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    toggleInfo: PropTypes.func.isRequired,
  }

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
          <div className="Project">
            {projects.map(({
              name, id, loading = false, info, open = false, fetched = false
            }) =>(
              <div key={id} style={{marginBottom: '10px'}}>
                {name}
                <br/>
                <div style={{cursor: 'pointer'}} onClick={() => toggleInfo({id, fetched})}>more info {open ? <GoChevronDown /> : <GoChevronRight />}</div>
                <Loading loading={loading}>
                  <Collapse open={open}>
                    <div
                      className="Project__Info"
                      dangerouslySetInnerHTML={info}
                    />
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