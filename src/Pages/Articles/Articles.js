import { Link } from 'react-router-dom';

import { fetchArticles } from "Common/API";
import { useQuery } from "react-query";
import SEO from 'Components/SEO';

import './style.less';

function ArticlesList() {
  const { data: { data: articles } } = useQuery(['Articles'], () => fetchArticles(), 
    { keepPreviousData : false }
  );

  return (
    <>
      <SEO 
        title="Software Development Articles & Tutorials | Iurii Shapkarin"
        description="Read technical articles about JavaScript development, React ecosystem, Redux patterns, and software engineering. In-depth tutorials and guides about my open-source packages."
        type="blog"
        name="Iurii Shapkarin"
      />
      <div className="Page__Inner">
        <h1>Articles [ It's WIP, going to rewrite ]</h1>
        <ul>
          {articles.map(({ slug, title }) => (
            <li key={slug}>
              <Link to={`/articles/${slug}`}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ArticlesList;
