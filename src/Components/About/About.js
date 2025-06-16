import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { FiExternalLink } from 'react-icons/fi';
import { fetchAbout } from 'Common/API';
import Preloader from 'Components/Preloader';
import Menu from 'Components/Menu';

import './style.less';

function About() {
  const { data: { data: { title, intro, links: { linkedin, github, website } } } } = useQuery('About', () => fetchAbout());
  
  return (
    <>
      <div className={clsx('About', {
          'About_dark': false
        })}>
        <Link to="/" className='About_greeting'>{title}</Link>
        {intro}
        <Menu />
        {/* yup `<br/><br/> is not good markup` https://github.com/shapkarin/shapkarin.me/tree/main?tab=readme-ov-file#NOTE-2 */}
        The API for this site <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">is generated</a><FiExternalLink /> and stored as <a href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api" target="_blank" rel="noreferrer">JSON and Markdown</a><FiExternalLink /> on <a href="https://github.com/shapkarin/shapkarin.me/blob/main/.github/workflows/build-deploy.yml" target="_blank" rel="noreferrer">GitHub Pages<FiExternalLink /></a><br />
        + It uses Github Actions to help with CI, and generates a static version,
        {' '}<a href={website.link} target='_blank' rel='noreferrer'>{website.text}<FiExternalLink /></a><br/>
        Disclaimer: This project is only a homepage, not an example of application architecture.<br/>
        The website has been active since 2013 {'=> '}<a href="https://web.archive.org/web/20130801000000*/shapkarin.me" target="_blank" rel="noreferrer">Proof<FiExternalLink /></a>{' | '}
        semver: <a href="https://github.com/shapkarin/shapkarin.me/tree/main/.env#L1" target="_blank" rel="noreferrer">{process.env.REACT_APP_VERSION}</a>

      </div>
    </>
  )
}



export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}
