import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';
import { GoChevronRight, GoChevronDown } from 'react-icons/go';
import { FiExternalLink } from 'react-icons/fi';

import Loading from 'Components/Loading';
import Close from 'Components/Close';
import Collapse from 'Components/Collapse';
import { packages as packagesTrigger, info } from './routines';

import './style.less';

@connect
class Packages extends Component {
  static mapStateToProps = ({ packages: { loading, data: { collection, order = [] } } }) => ({
    loading,
    packages: order.map(key => collection[key])
  })

  static mapDispatchToProps = {
    fetch: packagesTrigger,
    fetchInfoOrToggle: info
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    packages: PropTypes.arrayOf(PropTypes.shape({
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
    fetchInfoOrToggle: PropTypes.func.isRequired,
  }

  componentDidMount() {
    // todo: use memo or loading status
    this.props.fetch();
  }

  render () {
    const { loading, packages, fetchInfoOrToggle } = this.props;
    return (
      <Loading loading={loading}>
        <Close />
        <div className="PageProjects Page__Inner">
          <div>
            {packages.map(({
              name,
              url,
              id,
              loading: projectIsLoading = false,
              open = false,
              fetched = false,
              info = {}
            }) => (
              <div key={id} className="PageProjects__Item">
                <a target="_blank" href={url}>
                  {name}
                  {' '}
                  <FiExternalLink />
                </a>
                <div
                  onClick={() => fetchInfoOrToggle({ id, fetched })}
                  className="toggle_info"
                >
                  more info
                  {' '}
                  {open ? <GoChevronDown /> : <GoChevronRight />}
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
          <div>
            <a
              className="PageProjects__Item_more"
              style={{ width: '170px' }}
              href="https://www.npmjs.com/~shapkarin"
              target="_blank"
            >
              All published packages
              {' '}
              <FiExternalLink />
            </a>
            <a
              className="PageProjects__Item_more"
              style={{ width: '170px' }}
              href="https://github.com/shapkarin?tab=repositories"
              target="_blank"
            >
              My GitHub repositories
              {' '}
              <FiExternalLink />
            </a>
            <a
              className="PageProjects__Item_more"
              style={{ width: '80px' }}
              href="https://freelansim.ru/freelancers/yuryshapkarin/projects"
              target="_blank"
            >
              Portfolio
              {' '}
              <FiExternalLink />
            </a>
          </div>
        </div>
      </Loading>
    );
  }
}

export default Packages;
