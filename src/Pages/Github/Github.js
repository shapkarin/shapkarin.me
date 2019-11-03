import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { MdWeb } from 'react-icons/md';

import Loading from 'Components/Loading';
import Close from 'Components/Close';
import repositories from './routines';

import './style.less';

@connect
class Github extends Component {
  static mapStateToProps = ({ github: { loading, repositories: list } }) => ({
    loading,
    list
  })

  static mapDispatchToProps = {
    fetch: repositories
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // todo: arrayOf
    list: PropTypes.array.isRequired,
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string
    }),
    fetch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetch();
  }

  render () {
    const { loading, error, list } = this.props;
    const status = { loading, error };
    return (
      <Loading {...status}>
        <Close />
        <div className="Page__Github Page__Inner">
          {list.map(({
            id,
            name,
            html_url,
            description,
            open_issues_count,
            homepage,
            fork,
            updated_at
          }) =>(
            <div key={id} className="Page__GithubItem">
              <div className="Page__GithubItemInner" style={{ maxWidth: '250px' }}>
                <a className="GithubItem__Link centered-label" href={html_url} target="_blank">{name}{fork && <GoRepoForked />}</a>
                <div className="centered-label" style={{lineHeight: "20px"}}>{description}</div>
                <div className="centered-label"><GoPulse /> {(new Date(updated_at)).toLocaleDateString('ru-RU')}</div>
                { open_issues_count > 0 && <div className="centered-label"><GoIssueOpened /> open issues: <a className="IssuesCount" href={`${html_url}/issues`} target="_blank">{open_issues_count}</a></div> }
                { !!homepage && <div className="centered-label" ><MdWeb /> <a href={homepage} target="_blank">homepage</a></div> }
              </div>
            </div>
          ))}
          <div className="Page__GithubItem" style={{flexBasis: '100%'}}>
            <div className="Page__GithubItemInner">
              <a href="https://github.com/shapkarin?tab=repositories" target="_blank" className="GithubItem__Link">More at Github...</a>
            </div>
          </div>
        </div>
      </Loading>
    )
  }
}

export default Github;
