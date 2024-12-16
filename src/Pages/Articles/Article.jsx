import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SEO from 'Components/SEO';

function Articles() {
  const { slug: articleName } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  const fetchArticle = async (name) => {
    try {
      console.log('Fetching article:', name);
      const response = await fetch(`/articles/${name}.md`, {
        headers: {
          'Accept': 'text/markdown, text/plain, */*',
          'Content-Type': 'text/plain; charset=UTF-8'
        }
      });
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      console.log('Fetched content:', text.substring(0, 100));
      return text;
    } catch (error) {
      console.error('Error loading article:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadArticle = async () => {
      console.log('Loading article:', articleName);
      const articleContent = await fetchArticle(articleName);
      
      if (!articleContent) {
        setError('Failed to load article');
        return;
      }
      
      console.log('Setting content...');
      setContent(articleContent);
    };
    
    loadArticle();
  }, [articleName]);

  console.log('Current state:', { error, content, articleName });

  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>Loading...</div>;

  const { data: frontMatter, content: markdownContent } = matter(content);
  
  return (
    <div className="Article">
        <SEO 
          title={`${frontMatter.title || articleName} | Yury Shapkarin`}
          description={frontMatter.description || `Article about ${articleName}`}
          type="article"
          name="Yury Shapkarin"
        />
        <Markdown
          components={{
          code(props) {
            const {children, className, node, ...rest} = props;
            const match = /language-(js|javascript|jsx|ts|typescript|bash|sh)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1] === 'js' ? 'javascript' : match[1]}
                style={vscDarkPlus}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
              );
            }
          }}
        >
        {markdownContent}
      </Markdown>
    </div>
  );
}

export default Articles;