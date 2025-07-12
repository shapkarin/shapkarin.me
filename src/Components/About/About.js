import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import isMobile from 'is-mobile';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { FiExternalLink } from 'react-icons/fi';
import { fetchAbout } from '@/API';
import Preloader from '@/Components/Preloader';

import './style.less';

const EMAIL = 'yu.shapkarin@gmail.com';

function About() {
  const { data: { data: { title, intro, links: { linkedin, github } } } } = useQuery('About', () => fetchAbout());
  const [copied, setCopied] = useState(false);
  
  return (
    <>
      <div className={clsx('About', {
          'About_dark': false
        })}>
        <Link to="/" className='About_greeting'>{title}</Link>
        {' '}{intro}
        {isMobile() && <br />}
        <a href={linkedin.link} className={clsx('Social_Link', {
          'Social_Link__mobile': isMobile()
        })} target="_blank" rel="noreferrer">{linkedin.text}<FiExternalLink /></a>
        <a href={github.link} className="Social_Link" target="_blank" rel="noreferrer">{github.text}<FiExternalLink /></a>
        <CopyToClipboard text={EMAIL}
          onCopy={() => setCopied(true)}>
          {copied ? <>{<a href={`mailto:${EMAIL}`}>{EMAIL}</a>} [in clipboard!]</> : <span className="About_email">Get my email</span>}
        </CopyToClipboard>
        <em className="Disclaimer">
          Disclaimer: homepage has been gradually developed <a href="https://web.archive.org/web/20130801000000*/shapkarin.me" target="_blank" rel="noreferrer">since 2013<FiExternalLink /></a> with limited time {' | '} <a href="https://github.com/shapkarin/shapkarin.me" target="_blank" rel="noreferrer">cource code<FiExternalLink /></a>
        </em>
      </div>
    </>
  )
}


export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}
