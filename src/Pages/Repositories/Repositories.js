import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { FiExternalLink } from 'react-icons/fi';
import { MdWeb } from 'react-icons/md';

import Loading from 'Components/Loading';
import Close from 'Components/Close';

import './style.less';

function Repositories({ isLoading, error, data: { data: list } = { data: [] } }) {
  const status = { isLoading, error };

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
              <div className="Page__GithubItemInner">
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
              <a href="https://github.com/shapkarin?tab=repositories" target="_blank" className="GithubItem__Link">More <FiExternalLink /></a>
            </div>
          </div>
        </div>
      </Loading>
    );
  }

Repositories.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  error: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string
  }),
}

export default Repositories;