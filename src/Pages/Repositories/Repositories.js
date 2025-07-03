import ReactTooltip from 'react-tooltip';
import { GoRepoForked, GoPulse, GoIssueOpened } from 'react-icons/go';
import { FiExternalLink } from 'react-icons/fi';
import { MdWeb } from 'react-icons/md';
import SEO from '@/Components/SEO';

import { fetchRepositories } from "@/API";
import { useQuery } from "react-query";

import './style.less';

export default function Repositories() {
  // const [page, setPage] = useState(1)
  const { data: { data: list } } = useQuery(['Repositories', 1], () => fetchRepositories(1), 
    // { keepPreviousData : true }
  );

  return (
    <>
      <SEO 
        title="GitHub Repositories | Iurii Shapkarin"
        description="Browse my open-source projects and contributions on GitHub. Collection of web development repositories focusing on JavaScript, React, Redux, and modern web technologies."
        type="website"
        name="Iurii Shapkarin"
      />
      <ReactTooltip
        place="left"
      />
      {/* <div>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div> */}
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
              <a className="GithubItem__Link centered-label" href={html_url} target="_blank" rel="noreferrer">
                {name}
                {fork && <GoRepoForked data-tip="fork" />}
              </a>
              <div className="centered-label" style={{ lineHeight: '20px' }}>{description}</div>
              <div className="centered-label">
                <GoPulse data-tip="Last update" />
                {' '}
                {(new Date(updated_at)).toLocaleDateString('ru-RU')}
              </div>
              { open_issues_count > 0 && (
              <div className="centered-label">
                <GoIssueOpened />
                {' '}
                Open issues:
                {' '}
                <a className="IssuesCount" href={`${html_url}/issues`} target="_blank" rel="noreferrer">{open_issues_count}</a>
              </div>
              ) }
              { homepage && (
              <div className="centered-label">
                <MdWeb />
                {' '}
                <a href={homepage} target="_blank" rel="noreferrer">Website</a>
              </div>
              ) }
              {language && (
                <>
                Language:
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
            <a href="https://github.com/shapkarin?tab=repositories" target="_blank" rel="noreferrer" className="GithubItem__Link">More <FiExternalLink /></a>
          </div>
        </div>
      </div>
    </>
  );
}
