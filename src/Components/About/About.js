import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import { FiExternalLink } from 'react-icons/fi';

import { fetchAbout } from 'Common/API';
import Loading from 'Components/Loading';
import RandomButton from 'Components/RandomButton';

import './style.less';

export default function About() {
  
  const { isLoading, error, data: { data: text } = { data: ''} } = useQuery("About", () => fetchAbout());

  const status = { isLoading, error }

  const [isCopied, setIsCopied] = useState();
  const [isMoreInfo, setIsMoreInfo] = useState();

  const EMAIL = 'yury@shapkarin.me';

  return (
    <>
      <Loading {...status}>
        <div className={'About About_dark'}>
          <div 
            dangerouslySetInnerHTML={{__html: text}}
          ></div>
          {!isMoreInfo ?
          <div className="Link" onClick={() => setIsMoreInfo(true)}>About website</div>
          :
          <div style={{ marginTop: 10 }}>
            <ReactTooltip
              place="right"
            />
            <hr />
            <p>
            Current website use React, React Query, Github API and Axios Mock Adapter.<br />
            The backgound is <RandomButton className="Link" data-tip="click to generate">generated</RandomButton> by pure JS with Canvas API.<br />
            Pages, menu, routing and redirects are combined with array to keep that all consistent.
            </p>
            <p>
            From the previous version <b>it's refactored a lot</b>: redux and redux-saga was replaced with Hooks and Functional components, that was allow to remove a lot of boilerplate code!<br />
            Today's problem: it's still doesn't has any CSS methodology and markup is not so clear.<br />
            You can have a look at <a href='https://github.com/shapkarin/shapkarin.me' target='_blank'>the source code <FiExternalLink /></a>.
            </p>
            <div className="Link" onClick={() => setIsMoreInfo(false)} data-tip="collapse">[Hide website info]</div>
            <hr />
          </div>}
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
      </Loading>
    </>
  )
}