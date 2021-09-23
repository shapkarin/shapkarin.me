import React, { Component } from 'react';
import { useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { MdWeb } from 'react-icons/md';
import { TiStarOutline } from 'react-icons/ti';
import { FiExternalLink } from 'react-icons/fi';

import { fetchLikes } from 'Common/API';

export default function Liked() {
  const { data: { data: list } } = useQuery('Liked', fetchLikes);

  return (
    <>
      <ReactTooltip
        place="left"
      />
      <div className="Page__Github Page__Inner">
        {list.map(({
          id,
          full_name,
          html_url,
          description,
          open_issues_count,
          stargazers_count,
          homepage,
          fork,
          updated_at,
          language,
          languages_url
        }) => (
          <div key={id} className="Page__GithubItem">
            <div className="Page__GithubItemInner">
              <a className="GithubItem__Link centered-label" href={html_url} target="_blank">
                {full_name}
                {fork && <GoRepoForked data-tip="fork" />}
              </a>
              <div className="centered-label" style={{ lineHeight: '20px', marginBottom: '6px' }}>{description}</div>
              <div className="centered-label">
                <GoPulse data-tip="last update" />
                {' '}
                {(new Date(updated_at)).toLocaleDateString('ru-RU')}
              </div>
              { open_issues_count > 0 && (
              <div className="centered-label">
                <GoIssueOpened data-tip="issues" />
                {' '}
                open issues:
                {' '}
                <a className="IssuesCount" href={`${html_url}/issues`} target="_blank">{open_issues_count}</a>
              </div>
              ) }
              { !!homepage && (
              <div className="centered-label">
                <MdWeb data-tip="homepage" />
                {' '}
                <a href={homepage} target="_blank">Homepage</a>
              </div>
              ) }
              { stargazers_count > 0 && (
              <div className="centered-label">
                <TiStarOutline data-tip="stars" size="18px" />
                {' '}
                Stars:
                {' '}
                {stargazers_count}
              </div>
              )}
              {(false === 'not ready') && language && (
              <>
              Language
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
            <a href="https://github.com/shapkarin?tab=stars" target="_blank" className="GithubItem__Link">More <FiExternalLink /></a>
          </div>
        </div>
      </div>
    </>
  );
}
