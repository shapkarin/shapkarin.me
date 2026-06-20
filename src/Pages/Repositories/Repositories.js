// TODO: refactor
import ReactTooltip from 'react-tooltip';

import SEO from '@/Components/SEO';
import Link from '@/Components/Link';
import { fetchRepositories } from "@/DAL";
import { useQuery } from "@tanstack/react-query";
import { RepositoryCard, RepositoryDescription } from '@/Components/RepoCard';

import './style.less';

export default function Repositories() {
  // const [page, setPage] = useState(1)
  const { data: { data: list } } = useQuery({
    queryKey: ['Repositories'],
    queryFn: () => fetchRepositories({ 
      sort: 'created', 
      direction: 'desc'
    }),
  });

  return (
    <>
      <SEO 
        title="GitHub Repositories | Yuri Shapkarin"
        description="Browse my open-source projects and contributions on GitHub. Collection of web development repositories focusing on JavaScript, React, Redux, and modern web technologies."
      />
      <ReactTooltip
        className="GithubTooltip"
        multiline
        place="left"
      />
      {/* <div>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div> */}
      <Link to="/articles/contributions-to-major-web-dev-repos/" className="ref-link">
        Check out the article about other contributions I chose to highlight.
      </Link>
      <div className="Page__Github Page__Inner">
        {list.map(({
          id,
          name,
          html_url,
          description,
          open_issues_count,
          homepage,
          fork,
          created_at,
          language,
          languages_url,
        }) => (
          <RepositoryCard
            key={id}
            title={name}
            htmlUrl={html_url}
            description={<RepositoryDescription text={description} />}
            isFork={fork}
            date={created_at}
            dateTooltip="Repo creation date"
            openIssuesCount={open_issues_count}
            homepage={homepage}
            language={language}
            languagesUrl={languages_url}
          />
        ))}
        <Link to="https://github.com/shapkarin?tab=stars" wide>More</Link>
      </div>
    </>
  );
}
