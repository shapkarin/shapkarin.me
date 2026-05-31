import { useQuery } from '@tanstack/react-query';
import { GoClock, GoRepo } from 'react-icons/go';
import { LuMessageCircle } from 'react-icons/lu';

import SEO from '@/Components/SEO';
import Link from '@/Components/Link';
import { fetchIssues } from '@/DAL';

import './style.less';

const githubSearchUrl = 'https://github.com/search?q=author%3Ashapkarin+is%3Aissue&type=issues&s=created&o=desc';

const formatDate = (date) => (
  (new Date(date)).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
);

const getRepositoryName = (repositoryUrl) => (
  repositoryUrl.replace('https://api.github.com/repos/', '')
);

const getLabelTextColor = (color) => {
  if (!color) {
    return '#000';
  }

  const [red, green, blue] = color
    .match(/[0-9a-f]{2}/gi)
    .map((part) => parseInt(part, 16));

  const luminance = ((red * 299) + (green * 587) + (blue * 114)) / 1000;

  return luminance > 150 ? '#000' : '#fff';
};

export default function Issues() {
  const { data: { data: { items: list, total_count } } } = useQuery({
    queryKey: ['Issues'],
    queryFn: fetchIssues,
  });

  return (
    <>
      <SEO
        title="GitHub Issues | Yuri Shapkarin"
        description="Latest GitHub issues opened by Yuri Shapkarin across public repositories."
      />
      <div className="Page__Github Page__Inner Page__Issues">
        <div className="Issues__Summary">
          Latest
          {' '}
          {list.length}
          {' '}
          of
          {' '}
          {total_count}
          {' '}
          GitHub issues opened by shapkarin
        </div>
        {list.map(({
          id,
          html_url,
          repository_url,
          title,
          state,
          created_at,
          comments,
          labels,
        }) => {
          const repositoryName = getRepositoryName(repository_url);

          return (
            <article key={id} className="Page__GithubItem Page__IssueItem">
              <div className="Page__GithubItemInner">
                <a className="GithubItem__Link IssueItem__Title" href={html_url} target="_blank" rel="noreferrer">
                  {title}
                </a>
                <div className="IssueItem__Meta">
                  <span className="centered-label">
                    <GoRepo />
                    <a href={`https://github.com/${repositoryName}`} target="_blank" rel="noreferrer">
                      {repositoryName}
                    </a>
                  </span>
                  <span className="centered-label">
                    <GoClock size="19px" />
                    {formatDate(created_at)}
                  </span>
                  <span className={`IssueItem__State IssueItem__State--${state}`}>
                    {state}
                  </span>
                  {comments > 0 && (
                    <span className="centered-label">
                      <LuMessageCircle size="20px" style={{ strokeWidth: 1.5 }} />
                      {comments}
                    </span>
                  )}
                </div>
                {labels.length > 0 && (
                  <div className="IssueItem__Labels">
                    {labels.map(({ id: labelId, name, color }) => (
                      <span
                        key={labelId}
                        className="IssueItem__Label"
                        style={{
                          backgroundColor: `#${color}`,
                          color: getLabelTextColor(color),
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
        <Link to={githubSearchUrl} wide>More</Link>
      </div>
    </>
  );
}
