import { useQuery } from '@tanstack/react-query';
import ReactTooltip from 'react-tooltip';

import SEO from '@/Components/SEO';
import Link from '@/Components/Link';

import { fetchLikes } from '@/DAL';
import { RepositoryCard } from '@/Components/RepoCard';

import '../Repositories/style.less';

export default function Liked() {
  const { data: { data: list } } = useQuery({
    queryKey: ['Liked'],
    queryFn: fetchLikes,
  });

  return (
    <>
      <SEO 
        title="Starred GitHub Projects | Yuri Shapkarin"
        description="Discover my curated collection of starred GitHub repositories. A handpicked selection of innovative open-source projects, development tools, and libraries that I find valuable."
      />
      <ReactTooltip
        place="top"
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
          pushed_at,
          language,
          languages_url
        }) => (
          <RepositoryCard
            key={id}
            title={full_name}
            htmlUrl={html_url}
            description={description}
            isFork={fork}
            date={pushed_at}
            dateTooltip="Last update"
            starsCount={stargazers_count}
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
