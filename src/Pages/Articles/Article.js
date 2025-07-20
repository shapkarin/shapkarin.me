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
import URLS from '@/API/urls';


// Maybe make auto aeo schema with Macro or node.js

const Article = () => {
  const { slug: articleName } = useParams();

  const { data: { data: content } } = useQuery(['Articles', articleName], () => fetchArticle(articleName), 
    { 
      enabled: Boolean(articleName),
      keepPreviousData : true,
    },
  );

  const { data: frontMatter, content: markdownContent } = matter(content);

  // Dynamically load AEO script based on article name
  const { data: aeoScriptData, isLoading: aeoLoading, error: aeoError } = useQuery(
    ['AeoScript', URLS.aeoScript(articleName)], 
    () => fetchAeoScript(articleName),
    {
      enabled: Boolean(articleName),
      keepPreviousData: true,
      // Don't retry if AEO file doesn't exist (404)
      retry: false,
      // Fail silently if AEO file doesn't exist
      onError: (error) => {
        if (error.response?.status !== 404) {
          console.error('Error loading AEO script:', error);
        }
      }
    }
  );

  // Extract AEO script from response or fallback to frontMatter
  const aeoScript = aeoScriptData?.data ? JSON.stringify(aeoScriptData.data) : frontMatter.aeoScript;

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
      }
    };
  }, [markdownContent])

  console.log('AEO script loaded:', { aeoLoading, aeoError: aeoError?.response?.status, hasAeoScript: !!aeoScript });

  return (
    <div className="Article Page__Article Page__Inner">
        <SEO 
          title={`${frontMatter.title || articleName} | Iurii Shapkarin`}
          description={frontMatter.description || `Article about ${articleName}`}
          type="article"
          name="Iurii Shapkarin"
          aeoScript={aeoScript}
        />
        <Link relative="path" to="/articles" className="Article__GoBack">{'← All articles'}</Link>
        <div ref={articleRef}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: HeadingMacro,
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
    </div>
  );
}

export default Article;