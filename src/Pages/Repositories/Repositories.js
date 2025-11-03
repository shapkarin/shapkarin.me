// TODO: refactor
import ReactTooltip from 'react-tooltip';

import { GoClock, GoRepoForked, GoBrowser } from 'react-icons/go';
import { LuMessageCircle } from 'react-icons/lu';
import SEO from '@/Components/SEO';
import Button from '@/Components/Button';
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
        title="GitHub Repositories | Yuri Shapkarin"
        description="Browse my open-source projects and contributions on GitHub. Collection of web development repositories focusing on JavaScript, React, Redux, and modern web technologies."
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
              <div className="centered-label" style={{ lineHeight: '20px', paddingBottom: '6px' }}>{description}</div>
              <div className="centered-label">
                <GoClock data-tip="Last update" size="19px" />
                {' '}
                {(new Date(updated_at)).toLocaleDateString('ru-RU')}
              </div>
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
                  <a href={languages_url}>
                    { language }
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
        <Button url="https://github.com/shapkarin?tab=repositories" />
      </div>
    </>
  );
}
