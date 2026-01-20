import React from 'react';
import { GoClock, GoRepoForked, GoBrowser, GoStar } from 'react-icons/go';
import { LuMessageCircle } from 'react-icons/lu';

import './style.less';

const GitHubItem = ({
  id,
  displayName,
  html_url,
  description,
  open_issues_count,
  homepage,
  fork,
  updated_at,
  language,
  languages_url,
  stargazers_count
}) => {
  return (
    <div key={id} className="GithubItem">
      <div className="GithubItem__Inner">
        <a className="GithubItem__Link centered-label" href={html_url} target="_blank" rel="noreferrer">
          {displayName}
          {fork && <GoRepoForked data-tip="fork" />}
        </a>
        <div className="centered-label" style={{ lineHeight: '20px', paddingBottom: '6px' }}>{description}</div>
        <div className="centered-label">
          <GoClock data-tip="Last update" size="19px" />
          {' '}
          {(new Date(updated_at)).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        </div>
        {stargazers_count > 0 && (
          <div className="centered-label">
            <GoStar size="20px" />
            {' '}
            Stars:
            {' '}
            {stargazers_count}
          </div>
        )}
        {open_issues_count > 0 && (
          <div className="centered-label">
            <LuMessageCircle size="20px" style={{ strokeWidth: 1.5 }} />
            {' '}
            Open issues:
            {' '}
            <a className="IssuesCount" href={`${html_url}/issues`} target="_blank" rel="noreferrer">{open_issues_count}</a>
          </div>
        )}
        {homepage && (
          <div className="centered-label">
            <GoBrowser style={{ paddingLeft: 2 }} />
            {' '}
            <a href={homepage} target="_blank" rel="noreferrer">{homepage}</a>
          </div>
        )}
        {language && (
          <>
            Lang:
            {' '}
            <a href={languages_url} target="_blank" rel="noreferrer">
              {language}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default GitHubItem;