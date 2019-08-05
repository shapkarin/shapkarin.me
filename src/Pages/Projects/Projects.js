import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";

import Loading from 'Components/Loading';
import Collapse from 'Components/Collapse';
import { projects, info } from './routines';

import './style.less';

const mapStateToProps = (state) => {
  const { projects: { loading, data: { collection, order = [] } } } = state;
  const projectsArray = order.map(key => collection[key]);

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
      <Loading loading={loading}>
        <>
          {projects.map(({
            name,
            url,
            id,
            loading: projectIsLoading = false,
            open = false,
            fetched = false,
            info = {}
          }) =>(
            <div key={id} className="Project">
              {name}
              {' '}
              {url && <a target="_blank" href={url}><FiExternalLink /></a>}
              <div
                style={{cursor: 'pointer', marginTop: '7px'}}
                onClick={() => toggleInfo({id, fetched})}
              >
                more info {open ? <GoChevronDown /> : <GoChevronRight />}
              </div>
              <Loading loading={projectIsLoading}>
                <Collapse open={open}>
                  <div
                    className="Project__Info"
                    dangerouslySetInnerHTML={info.content}
                  />
                </Collapse>
              </Loading>
            </div>
          ))}
          <div className="Project" style={{width: '70px'}}>
            <a href="https://freelansim.ru/freelancers/yuryshapkarin/projects" target="_blank">
              More <FiExternalLink />
            </a>
          </div>
        </>
      </Loading>
    )
  }
}