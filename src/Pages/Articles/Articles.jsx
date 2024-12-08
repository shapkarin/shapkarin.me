import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.less';
function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/articles/list.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setArticles(result);
      } catch (error) {
        console.error('Error loading articles:', error);
        setError('Failed to load articles');
      }
    };

    fetchArticles();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!articles.length) return <div>Loading articles...</div>;

  return (
    <>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link 
              key={article.slug} 
              to={`/articles/${article.slug}`}
            >
            {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ArticlesList;
