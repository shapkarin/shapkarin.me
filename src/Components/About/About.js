import { useState } from 'react';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import isMobile from 'is-mobile';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { fetchAbout } from '@/API';
import Preloader from '@/Components/Preloader';
import Link from '@/Components/Link';

import './style.less';

const EMAIL = 'yu.shapkarin@gmail.com';


const isMobileDevice = isMobile();

function About() {
  const { data: { data: { greeting, links: { linkedin, github } } } } = useQuery('About', fetchAbout);
  
  const [copied, setCopied] = useState(false);

  return (
    <>
      <div className={clsx('About', {
          'About_dark': false
        })}>
        <Link to="/" className='About_greeting'>{greeting}</Link>
        {isMobileDevice && <br />}
        <Link href={linkedin.link} className={clsx('Social_Link', {
          'Social_Link__mobile': isMobileDevice
        })} target="_blank" rel="noreferrer">{linkedin.text}</Link>
        <Link href={github.link} className="Social_Link">{github.text}</Link>
        <CopyToClipboard text={EMAIL}
          onCopy={() => setCopied(true)}>
          {copied ? <>{<a href={`mailto:${EMAIL}`}>{EMAIL}</a>} [in clipboard!]</> : <span className="About_email">Get my email</span>}
        </CopyToClipboard>
        <em className="Disclaimer">
          Disclaimer: homepage has been gradually developed <Link href="https://web.archive.org/web/20130801000000*/shapkarin.me">since 2013</Link> with limited time {' | '} <Link href="https://github.com/shapkarin/shapkarin.me">cource code</Link>
        </em>
      </div>
    </>
  )
}


export default function SuspensedAbout() {
  return (
    <Preloader
      height={isMobileDevice ? 260 : 100}
      lines={isMobileDevice ? 12 : 4}
      className="About"
    >
      <About />
    </Preloader>
  )
}
