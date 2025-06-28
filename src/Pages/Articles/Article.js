import { useParams, Link } from 'react-router-dom';
import { useCallback } from 'react';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { fetchArticle } from "Common/API";
import { useQuery } from "react-query";
import SEO from 'Components/SEO';
import ScrollToTop from 'Components/ScrollToTop';
// Markdown macros
import HeadingMacro from './Macros/HeadingMacro';
import LinkMacro from './Macros/LinkMacro';

function Article() {
  const { slug: articleName } = useParams();

  const { data: { data: content } } = useQuery(['Articles', articleName], () => fetchArticle(articleName), 
    { 
      enabled: Boolean(articleName),
      keepPreviousData : true,
    },
  );

  const { data: frontMatter, content: markdownContent } = matter(content);

  const handleAnchorScrollSPA = useCallback(({ children } = { children: null }) => {
    if (children && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="Article Page__Article Page__Inner">
        <SEO 
          title={`${frontMatter.title || articleName} | Iurii Shapkarin`}
          description={frontMatter.description || `Article about ${articleName}`}
          type="article"
          name="Iurii Shapkarin"
        />
        <Link relative="path" to="/articles" className="Article__GoBack">{'← All articles'}</Link>
        <div ref={handleAnchorScrollSPA}>
          <Markdown
            components={{
              h2: HeadingMacro,
              h3: HeadingMacro,
              a: LinkMacro,
              code(props) {
                const {children, className, node, ...rest} = props;
                const match = /language-(json|js|javascript|jsx|ts|typescript|bash|sh|python|py|cpp|rust|mermaid|text)/.exec(className || '');
                return match ? (
                  <>
                    <h3 className="Article__CondingLang">{match[1]}:</h3>
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      language={match[1] === 'js' ? 'javascript' : match[1]}
                      style={vscDarkPlus}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </>
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
      <ScrollToTop />
    </div>
  );
}

export default Article;