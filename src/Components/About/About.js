import { useState } from 'react';
import { useQuery } from 'react-query';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiExternalLink } from 'react-icons/fi';

import { fetchAbout } from 'Common/API';
import Preloader from 'Components/Preloader';
import RandomButton from 'Components/RandomButton';
import Collapse from 'Components/Collapse';
import Version from 'Components/Version';

import './style.less';

const EMAIL = 'yury@shapkarin.me';

function About() {
  const { data: { data: { text } } } = useQuery('About', () => fetchAbout());

  const [isCopied, setIsCopied] = useState(false);
  const [isMoreInfo, setIsMoreInfo] = useState(false);

  return (
    <>
      <div className={'About About_dark'}>
        <div dangerouslySetInnerHTML={{__html: text}} />
        {!isMoreInfo && <div className="Link" onClick={() => setIsMoreInfo(true)}>[About website]</div>}
        <Collapse open={isMoreInfo}>
          <div style={{ marginTop: 10 }}>
            <hr />
            <div className="p">
              Website <Version /> uses React, React Hooks, React Query, Github API.<br />
              Persional JSON API is <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">generating</a>{' '}
              from JS structures and serve as a static JSON files(<a href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api/packages/info" target="_blank" rel="noreferrer">example</a>).<br />
              The backgound is <RandomButton className="Link">generated</RandomButton> with pure JS and Canvas API.<br />
            </div>
            <div className="p">
              it's still doesn't has any CSS methodology and markup is not so clear.<br />
              You can have a look at <a href='https://github.com/shapkarin/shapkarin.me' target='_blank' rel='noreferrer'>the source code <FiExternalLink /></a>.
            </div>
            <div className="Link" onClick={() => setIsMoreInfo(false)}>[Hide website info]</div>
            <hr />
          </div>
        </Collapse>
        <div style={{marginTop: '10px'}}>
          You can visit <a href="https://github.com/shapkarin" target="_blank" rel="noreferrer">my Github <FiExternalLink /></a>
          {!isCopied ? ' ' : '. '}
          {
            !isCopied ?
            <>
              and maybe you need
              {' '}
              <CopyToClipboard 
                text={EMAIL}
                onCopy={() => setIsCopied(true)}
              >
                <span style={{cursor: 'pointer', textDecoration: 'underline'}}>
                  to copy my email.
                </span>
              </CopyToClipboard>
            </>
          :
          <span>Email in a clipboard: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
          }
        </div>
      </div>
    </>
  )
}

export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}