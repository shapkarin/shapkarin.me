import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { FiExternalLink } from 'react-icons/fi';
import { fetchAbout } from 'Common/API';
import Preloader from 'Components/Preloader';
import Menu from 'Components/Menu';

import './style.less';

function About() {
  const { data: { data: { title, intro, links: { linkedin, github } } } } = useQuery('About', () => fetchAbout());
  
  return (
    <>
      <div className={clsx('About', {
          'About_dark': false
        })}>
        <Link to="/" className='About_greeting'>{title}</Link>
        {intro}
        <a href={linkedin.link} className="Social_Link" target="_blank" rel="noreferrer">{linkedin.text}<FiExternalLink /></a>
        <a href={github.link} className="Social_Link" target="_blank" rel="noreferrer">{github.text}<FiExternalLink /></a>
        <br />
        <em>Disclaimer: This project is only a homepage, not an example of application architecture. <a href="https://github.com/shapkarin/shapkarin.me" target="_blank" rel="noreferrer">(git<FiExternalLink />)</a></em>
        <Menu />
      </div>
    </>
  )
}



export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}
