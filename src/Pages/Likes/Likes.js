// TODO: refactor
import { useQuery } from '@tanstack/react-query';
import ReactTooltip from 'react-tooltip';

import SEO from '@/Components/SEO';
import Button from '@/Components/Button';
import GitHubItem from '@/Components/GitHub';

import { fetchLikes } from '@/DAL';

export default function Liked() {
  const { data: { data: list } } = useQuery({ queryKey: ['Liked'], queryFn: fetchLikes });

  return (
    <>
      <SEO 
        title="Starred GitHub Projects | Yuri Shapkarin"
        description="Discover my curated collection of starred GitHub repositories. A handpicked selection of innovative open-source projects, development tools, and libraries that I find valuable."
      />
      <ReactTooltip
        place="left"
      />
      <div className="Page__Github Page__Inner">
        {list.map((repo) => (
          <GitHubItem
            key={repo.id}
            displayName={repo.full_name}
            {...repo}
          />
        ))}
        <Button url="https://github.com/shapkarin?tab=stars" />
      </div>
    </>
  );
}
