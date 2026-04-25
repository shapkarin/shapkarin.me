import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import isMobile from 'is-mobile';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { fetchAbout } from '@/DAL';
import Preloader from '@/Components/Preloader';
import Link from '@/Components/Link';
import { GITHUB_REPO_URL } from '@/constants';

import './style.less';

const EMAIL = 'yu.shapkarin@gmail.com';

// TODO: use one isMobile for all app
const isMobileDevice = isMobile();

function About() {
  const { data: { data: { greeting, intro, links: { linkedin, github } } } } = useQuery({ queryKey: ['About'], queryFn: fetchAbout });
  
  const [copied, setCopied] = useState(false);

  return (
    <>
      <div className={clsx('About', {
          'About_dark': false
        })}>
        <Link to="/" className='About_greeting'>{greeting}</Link>
        {' '}{intro}
        {isMobileDevice}
        <Link href={linkedin.link} className={clsx('Social_Link', {
          'Social_Link__mobile': isMobileDevice
        })} target="_blank" rel="noreferrer">{linkedin.text}</Link>
        <Link href={github.link} className="Social_Link">{github.text}</Link>
        <CopyToClipboard text={EMAIL}
          onCopy={() => setCopied(true)}>
          {copied ? <>{<a href={`mailto:${EMAIL}`}>{EMAIL}</a>} [in clipboard!]</> : <span className="About_email">Get my email</span>}
        </CopyToClipboard>
        <em className="Disclaimer">
          Disclaimer: homepage has been gradually developed <Link href="https://web.archive.org/web/20170709213808/https://shapkarin.me/" target="_blank">since 2013</Link> with limited time {' | '} <Link href={GITHUB_REPO_URL}>cource code</Link>
        </em>
      </div>
    </>
  )
}


export default function SuspensedAbout() {
  return (
    <Preloader
      height={isMobileDevice ? 143 : 75}
      lines={isMobileDevice ? 6 : 3}
      className="About"
    >
      <About />
    </Preloader>
  )
}
