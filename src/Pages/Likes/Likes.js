// TODO: refactor
import { useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';

import {  GoStar, GoClock, GoRepoForked, GoBrowser } from 'react-icons/go';
import { LuMessageCircle } from 'react-icons/lu';
import SEO from '@/Components/SEO';
import Button from '@/Components/Button';

import { fetchLikes } from '@/API';

export default function Liked() {
  const { data: { data: list } } = useQuery('Liked', fetchLikes);

  return (
    <>
      <SEO 
        title="Starred GitHub Projects | Yuri Shapkarin"
        description="Discover my curated collection of starred GitHub repositories. A handpicked selection of innovative open-source projects, development tools, and libraries that I find valuable."
        type="website"
        name="Yuri Shapkarin"
      />
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
              <a className="GithubItem__Link centered-label" href={html_url} target="_blank" rel="noreferrer">
                {full_name}
                {fork && <GoRepoForked data-tip="fork" />}
              </a>
              <div className="centered-label" style={{ lineHeight: '20px', paddingBottom: '6px' }}>{description}</div>
              <div className="centered-label">
                <GoClock data-tip="Last update" size="19px" />
                {' '}
                {(new Date(updated_at)).toLocaleDateString('ru-RU')}
              </div>
              { stargazers_count > 0 && (
              <div className="centered-label">
                <GoStar size="20px" />
                {' '}
                Stars:
                {' '}
                {stargazers_count}
              </div>
              )}
              { open_issues_count > 0 && (
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
                  { language }
                </a>
              </>
              )}
            </div>
          </div>
        ))}
        <Button url="https://github.com/shapkarin?tab=stars" />
      </div>
    </>
  );
}
