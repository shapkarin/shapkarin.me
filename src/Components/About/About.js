import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { FiExternalLink } from 'react-icons/fi';
import { fetchAbout } from 'Common/API';
import Preloader from 'Components/Preloader';

import './style.less';

function About() {
  const { data: { data: { title, intro, links: { linkedin, github } } } } = useQuery('About', () => fetchAbout());
  
  return (
    <header className={clsx('About', {
        'About_dark': false
      })}>
      <Link to="/" className='About_greeting'>{title}</Link>
      {intro}
      <a href={linkedin.link} className="Social_Link" target="_blank" rel="noreferrer">{linkedin.text}<FiExternalLink /></a>
      <a href={github.link} className="Social_Link" target="_blank" rel="noreferrer">{github.text}<FiExternalLink /></a>
      <br />
      <em className="Disclaimer">
        Disclaimer: gradually developed <a href="https://web.archive.org/web/20130801000000*/shapkarin.me" target="_blank" rel="noreferrer">since 2013<FiExternalLink /></a> with limited time, is not an example of application architecture {' | '} <a href="https://github.com/shapkarin/shapkarin.me" target="_blank" rel="noreferrer">cource code<FiExternalLink /></a>
      </em>
    </header>
  )
}



export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}
