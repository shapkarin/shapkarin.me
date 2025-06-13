import { useParams, Link } from 'react-router-dom';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { fetchArticle } from "Common/API";
import { useQuery } from "react-query";
import SEO from 'Components/SEO';
import HeadingRenderer from './Macro/Anchor';
import LinkNewTab from './Macro/LinkNewTab';

function Article() {
  const { slug: articleName } = useParams();

  const { data: { data: content } } = useQuery(['Articles', articleName], () => fetchArticle(articleName), 
    { 
      // enable the query only if articleName is truthy
      enabled: Boolean(articleName),
      keepPreviousData : true,
    },
  );

  const { data: frontMatter, content: markdownContent } = matter(content);

  return (
    <div className="Article">
        <SEO 
          title={`${frontMatter.title || articleName} | Iurii Shapkarin`}
          description={frontMatter.description || `Article about ${articleName}`}
          type="article"
          name="Iurii Shapkarin"
        />
        <Link relative="path" to="/articles" className="Article__GoBack">{'<- Go back'}</Link>
        {/* TODO: fix re-renders on link click inside serrilised markdown content */}
        <Markdown
          components={{
            h2: HeadingRenderer,
            h3: HeadingRenderer,
            a: LinkNewTab,
            code(props) {
              const {children, className, node, ...rest} = props;
              const match = /language-(js|javascript|jsx|ts|typescript|bash|sh|python|py|cpp|rust)/.exec(className || '');
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

export default Article;