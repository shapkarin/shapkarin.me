import { useParams, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm'

import { fetchArticle, fetchAeoScript } from "@/API";
import { useQuery } from "react-query";
import SEO from '@/Components/SEO';
import { SCROLL_OFFSET } from '@/constants';
// Markdown macros
import HeadingMacro from './Macros/HeadingMacro';
import LinkMacro from './Macros/LinkMacro';
import TableMacro from './Macros/TableMacro';
import TOCMacro from './Macros/TOCMacro';
// Maybe make auto aeo schema with Macro or node.js

import TOCSidebar from '@/Components/TOCSidebar';
import { useTOC } from '@/Contexts/TOCContext';

const CodeBlock = ({ children, className, node, match, ...rest }) => {
  return (
  <SyntaxHighlighter
      {...rest}
      PreTag="div"
      language={match[1] === 'js' ? 'javascript' : match[1]}
      style={vscDarkPlus}
    >
      {String(children).replace(/\n$/, '')}
  </SyntaxHighlighter>
  )
}

const Article = () => {
  const { slug: articleName } = useParams();
  const hasUpdatedTOC = useRef(false);
  const { clearTOC } = useTOC();

  const { data: { data: content } } = useQuery(['Articles', articleName], () => fetchArticle(articleName), 
    { 
      enabled: Boolean(articleName),
      keepPreviousData : true,
    },
  );

  const { data: frontMatter, content: markdownContent } = matter(content);

  // Dynamically load AEO script based on article name
  const { data: aeoScript } = useQuery(
    ['AeoScript', articleName], 
    async () => {
      try {
        const response = await fetchAeoScript(articleName);
        return response.data;
      } catch (error) {
        // If endpoint doesn't exist (404) or any other error, return null
        console.log(`No AEO script found for ${articleName}, continuing without it`);
        return null;
      }
    },
    {
      enabled: Boolean(articleName),
      keepPreviousData: process.env.NODE_ENV === 'production' ? true : false,//fasle,
    }
  );

  const articleRef = useRef(null);

  useEffect(() => {
    if (articleRef?.current?.children?.length > 0 && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - SCROLL_OFFSET;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    // Cleanup function to remove ref on unmount
    return () => {
      if (articleRef.current) {
        articleRef.current = null;
        hasUpdatedTOC.current = false;
        clearTOC()
      }
    };
  }, [markdownContent])


  return (
    <div className="Article Page__Article Page__Inner">
        <SEO 
          title={`${frontMatter.title || articleName} | Iurii Shapkarin`}
          description={frontMatter.description || `Article about ${articleName}`}
          keywords={frontMatter.keywords || ''}
          type="article"
          name="Iurii Shapkarin"
          aeoScript={aeoScript}
        />
        <Link to="/" className="Article__GoBack">{'← All articles'}</Link>
        <TOCSidebar />
        <div ref={articleRef}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: HeadingMacro,
              h2: HeadingMacro,
              h3: HeadingMacro,
              ol: (props) => <TOCMacro {...props} hasUpdatedTOC={hasUpdatedTOC} />,
              a: LinkMacro,
              table: TableMacro,
              code(props) {
                const {children, className, node, ...rest} = props;
                const match = /language-(json|js|javascript|jsx|ts|typescript|bash|sh|python|py|cpp|rust|text|mermaid|solidity|go|toml|yaml|yml|math)/.exec(className || '');
                const ifMermaid = match && match[1] === 'mermaid';
                if (ifMermaid) {
                  return (
                  <details>
                    <summary>Show Mermaid Code</summary>
                    <CodeBlock {...props} match={match} />
                  </details>
                  )
                }
                return match ? (
                  <>
                    <h3 className="Article__CondingLang">{match[1]}:</h3>
                    <CodeBlock {...props} match={match} />
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
    </div>
  );
}

export default Article;