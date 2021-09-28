import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiExternalLink } from 'react-icons/fi';

import { fetchAbout } from 'Common/API';
import Preloader from 'Components/Preloader';
import Version from 'Components/Version';
import Formatted from 'Components/Formatted';

import AboutWebsite from './Website';

import './style.less';

const EMAIL = process.env.REACT_APP_EMAIL;

function About() {
  const { data: { data } } = useQuery('About', () => fetchAbout());
  const [isCopied, setIsCopied] = useState(false);
  
  return (
    <Fragment>
      <div className={'About About_dark'}>
        <h1>{data.title}</h1>
          <Formatted>
            {data.intro}
          </Formatted>
        <AboutWebsite />
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
        <br />
        <a href='https://github.com/shapkarin/shapkarin.me' target='_blank' rel='noreferrer'>Website source code<FiExternalLink /></a> <Version number/> 
      </div>
    </Fragment>
  )
}



export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}