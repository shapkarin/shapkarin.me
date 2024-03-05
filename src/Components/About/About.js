import { Fragment } from 'react';
import { useQuery } from 'react-query';
import { FiExternalLink } from 'react-icons/fi';

import { fetchAbout } from 'Common/API';
import Preloader from 'Components/Preloader';
import Formatted from 'Components/Formatted';
// import AboutWebsite from './Website';

import './style.less';

function About() {
  const { data: { data } } = useQuery('About', () => fetchAbout());
  
  return (
    <Fragment>
      <div className={'About About_dark'}>
        <h1>{data.title}</h1>
        <Formatted>
          {data.intro}
        </Formatted>
        <br />
        <a href='https://github.com/shapkarin/shapkarin.me' target='_blank' rel='noreferrer'>Website source code<FiExternalLink /></a>
        <br/><br/>
        <a href="https://github.com/shapkarin" target="_blank" rel="noreferrer">My Github <FiExternalLink /></a>
        <br/><br/>
        PS: The API for this site is generated <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">by this code</a><FiExternalLink /> and stored as <a href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api" target="_blank" rel="noreferrer">JSON files on GitHub Pages</a>.
      </div>
    </Fragment>
  )
}



export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}
