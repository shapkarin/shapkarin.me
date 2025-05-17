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
        title="Software Development Articles & Tutorials | Yury Shapkarin"
        description="Read technical articles about JavaScript development, React ecosystem, Redux patterns, and software engineering. In-depth tutorials and guides about my open-source packages."
        type="blog"
        name="Yury Shapkarin"
      />
      <h1>Articles [ It's WIP bcs most of the text is AI generated for SEO ]</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link to={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ArticlesList;
