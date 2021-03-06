import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import ReactTooltip from 'react-tooltip';

import Loading from 'Components/Loading';
import Close from 'Components/Close';
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
        content: PropTypes.string.isRequired
      })
    })).isRequired,
    fetch: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetch, projects } = this.props;
    if (projects.length === 0) {
      fetch();
    }
  }

  render () {
    const { loading, projects, toggleInfo } = this.props;
    return (
      <Loading loading={loading}>
        <Close />
        <ReactTooltip
          place="right"
        />
        <div className="PageProjects Page__Inner">
          <div>
            {projects.map(({
              name,
              url,
              id,
              loading: projectIsLoading = false,
              open = false,
              fetched = false,
              info = {}
            }) =>(
              <div key={id} className="PageProjects__Item">
                {name}
                {' '}
                {url && <a target="_blank" href={url}><FiExternalLink data-tip="open in a new tab" /></a>}
                <div
                  style={{cursor: 'pointer', margin: '7px 0 7px 0'}}
                  onClick={() => toggleInfo({id, fetched})}
                >
                  more info {open ? <GoChevronDown /> : <GoChevronRight />}
                </div>
                <Loading loading={projectIsLoading}>
                  <Collapse open={open}>
                    <div
                      className="Project__Info"
                      dangerouslySetInnerHTML={{ __html: info.content }}
                    />
                  </Collapse>
                </Loading>
              </div>
            ))}
            </div>
            <div  >
              <a
                className="PageProjects__Item_more"
                style={{width: '80px'}}
                href="https://freelansim.ru/freelancers/yuryshapkarin/projects"
                target="_blank"
              >
                Portfolio <FiExternalLink data-tip="open in a new tab" />
              </a>
              <a
                className="PageProjects__Item_more"
                style={{width: '200px'}}
                href="https://www.npmjs.com/~shapkarin"
                target="_blank"
              >
                Other published packages <FiExternalLink data-tip="open in a new tab" />
              </a>
            </div>
          </div>
      </Loading>
    )
  }
}

export default Projects;
