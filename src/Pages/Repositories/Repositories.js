// TODO: refactor
import ReactTooltip from 'react-tooltip';

import SEO from '@/Components/SEO';
import Button from '@/Components/Button';
import GitHubItem from '@/Components/GitHub';
import { fetchRepositories } from "@/DAL";
import { useQuery } from "@tanstack/react-query";

import './style.less';

export default function Repositories() {
  // const [page, setPage] = useState(1)
  const { data: { data: list } } = useQuery({
    queryKey: ['Repositories'],
    queryFn: () => fetchRepositories(), 
    // { keepPreviousData : true }
  });

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
        {list.map((repo) => (
          <GitHubItem
            key={repo.id}
            displayName={repo.name}
            {...repo}
          />
        ))}
        <Button url="https://github.com/shapkarin?tab=repositories" />
      </div>
    </>
  );
}
