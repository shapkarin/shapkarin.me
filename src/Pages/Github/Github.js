import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
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
    fetch: repositories,
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // todo: arrayOf
    list: PropTypes.array.isRequired,
    // eslint-disable-next-line react/require-default-props
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string
    }),
    fetch: PropTypes.func.isRequired,
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
        <ReactTooltip
          place="left"
        />
        <div className="Page__Github Page__Inner">
          {list.map(({
            id,
            name,
            html_url,
            description,
            open_issues_count,
            homepage,
            fork,
            updated_at,
            language,
            languages_url
          }) => (
            <div key={id} className="Page__GithubItem">
              <div className="Page__GithubItemInner" style={{ maxWidth: '250px' }}>
                <a className="GithubItem__Link centered-label" href={html_url} target="_blank">
                  {name}
                  {fork && <GoRepoForked data-tip="fork" />}
                </a>
                <div className="centered-label" style={{ lineHeight: '20px' }}>{description}</div>
                <div className="centered-label">
                  <GoPulse data-tip="last update" />
                  {' '}
                  {(new Date(updated_at)).toLocaleDateString('ru-RU')}
                </div>
                { open_issues_count > 0 && (
                <div className="centered-label">
                  <GoIssueOpened data-tip="issues" />
                  {' '}
                  Open issues:
                  {' '}
                  <a className="IssuesCount" href={`${html_url}/issues`} target="_blank">{open_issues_count}</a>
                </div>
                ) }
                { homepage && (
                <div className="centered-label">
                  <MdWeb data-tip="homepage" />
                  {' '}
                  <a href={homepage} target="_blank">Homepage</a>
                </div>
                ) }
                {(false === 'not ready') && language && (
                  <>
                  languages
                    {' '}
                    <a href={languages_url}>
                      { language }
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="Page__GithubItem" style={{ flexBasis: '100%' }}>
            <div className="Page__GithubItemInner">
              <a href="https://github.com/shapkarin?tab=repositories" target="_blank" className="GithubItem__Link">More at Github...</a>
            </div>
          </div>
        </div>
      </Loading>
    );
  }
}

export default Github;
