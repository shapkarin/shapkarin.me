import { Link } from 'react-router-dom';

import { fetchArticles } from "@/API";
import { useQuery } from "react-query";
import SEO from '@/Components/SEO';

import './style.less';

function ArticlesList() {
  const { data: { data: articles } } = useQuery(['Articles'], () => fetchArticles(), 
    { keepPreviousData : false }
  );

  return (
    <div className="Page Page__Article Page__Inner">
    {/*'Page_Articles">'*/}
      <SEO 
        title="Software Development Articles & Tutorials | Iurii Shapkarin"
        description="Read technical articles about JavaScript development, React ecosystem, Redux patterns, and software engineering. In-depth tutorials and guides about my open-source packages."
        type="blog"
        name="Iurii Shapkarin"
      />
      <div className="Page__Inner">
        <h1 className="Page__ArticlesTitle">Articles</h1>
        <ul className="Article__List">
          {articles.map(({ slug, title }) => (
            <li key={slug} className="Article__Item">
              <Link to={`/articles/${slug}/`}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArticlesList;
