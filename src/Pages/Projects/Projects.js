import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";

import Loading from 'Components/Loading';
import Collapse from 'Components/Collapse';
import { projects, info } from './routines';

import './style.less';

@connect
class Projects extends Component {
  static mapStateToProps = ({ projects: { loading, data: { collection, order = [] } } }) => ({
    loading,
    projects: order.map(key => collection[key])
  })

  static mapDispatchToProps = {
    fetch: projects,
    toggleInfo: info
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      loading: PropTypes.bool,
      open: PropTypes.bool,
      fetched: PropTypes.bool,
      info: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.shape({
          __html: PropTypes.string.isRequired
        }).isRequired,
      })
    })).isRequired,
    fetch: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetch, projects } = this.props;
    if(projects.length === 0) {
      fetch();
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

export default Projects;
