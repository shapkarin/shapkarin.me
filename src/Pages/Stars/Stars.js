import { useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { MdWeb } from 'react-icons/md';
import { TiStarOutline } from 'react-icons/ti';
import { FiExternalLink } from 'react-icons/fi';
import SEO from '@/Components/SEO';

import { fetchLikes } from '@/API';

export default function Liked() {
  const { data: { data: list } } = useQuery('Liked', fetchLikes);

  return (
    <>
      <SEO 
        title="Starred GitHub Projects | Iurii Shapkarin"
        description="Discover my curated collection of starred GitHub repositories. A handpicked selection of innovative open-source projects, development tools, and libraries that I find valuable."
        type="website"
        name="Iurii Shapkarin"
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
              <div className="centered-label" style={{ lineHeight: '20px', marginBottom: '6px' }}>{description}</div>
              <div className="centered-label">
                <GoPulse data-tip="Last update" />
                {' '}
                {(new Date(updated_at)).toLocaleDateString('ru-RU')}
              </div>
              { !!homepage && (
              <div className="centered-label">
                <MdWeb />
                {' '}
                <a href={homepage} target="_blank" rel="noreferrer">Website</a>
              </div>
              ) }
              { stargazers_count > 0 && (
              <div className="centered-label">
                <TiStarOutline size="18px" />
                {' '}
                Stars:
                {' '}
                {stargazers_count}
              </div>
              )}
              { open_issues_count > 0 && (
              <div className="centered-label">
                <GoIssueOpened />
                {' '}
                Open issues:
                {' '}
                <a className="IssuesCount" href={`${html_url}/issues`} target="_blank" rel="noreferrer">{open_issues_count}</a>
              </div>
              )}
            {language && (
              <>
              Language:
                {' '}
                <a href={languages_url} target="_blank" rel="noreferrer">
                  { language }
                </a>
              </>
              )}
            </div>
          </div>
        ))}
        <div className="Page__GithubItem" style={{ flexBasis: '100%' }}>
          <div className="Page__GithubItemInner">
            <a href="https://github.com/shapkarin?tab=stars" target="_blank" rel="noreferrer" className="GithubItem__Link">More <FiExternalLink /></a>
          </div>
        </div>
      </div>
    </>
  );
}
