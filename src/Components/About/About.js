import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiExternalLink } from 'react-icons/fi';

import Preloader from 'Components/Preloader';
import { fetchAbout } from 'Common/API';
import RandomButton from 'Components/RandomButton';
import Collapse from 'Components/Collapse';

import './style.less';

function About() {
  const { data: { data: text } } = useQuery('About', () => fetchAbout());

  const [isCopied, setIsCopied] = useState(false);
  const [isMoreInfo, setIsMoreInfo] = useState(false);

  const EMAIL = 'yury@shapkarin.me';

  return (
    <>
      <div className={'About About_dark'}>
        <div dangerouslySetInnerHTML={{__html: text}} />
        {!isMoreInfo && <div className="Link" onClick={() => setIsMoreInfo(true)}>[About website]</div>}
        <Collapse open={isMoreInfo}>
          <div style={{ marginTop: 10 }}>
            <hr />
            <div className="p">
              Current website uses React, React Hooks, React Query, Github API and Axios Mock Adapter.<br />
              The backgound is <RandomButton className="Link">generated</RandomButton> by pure JS with Canvas API.<br />
              Pages, menu, routing and redirects are combined with array to keep that all consistent.
            </div>
            <div className="p">
              From the previous version <b>it's refactored a lot</b>: redux and redux-saga was replaced with Hooks and Functional components, that was allow to remove a lot of boilerplate code!<br />
              Today's problem: it's still doesn't has any CSS methodology and markup is not so clear.<br />
              You can have a look at <a href='https://github.com/shapkarin/shapkarin.me' target='_blank'>the source code <FiExternalLink /></a>.
            </div>
            <div className="Link" onClick={() => setIsMoreInfo(false)}>[Hide website info]</div>
            <hr />
          </div>
        </Collapse>
        <div style={{marginTop: '10px'}}>
          You can visit <a href="https://github.com/shapkarin" target="_blank">my Github <FiExternalLink /></a>
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