import { useQuery } from 'react-query';
import { FiExternalLink } from 'react-icons/fi';
import { fetchAbout } from 'Common/API';
import Preloader from 'Components/Preloader';

import './style.less';

function About() {
  const { data: { data: { title, intro, links: { linkedin, github, website } } } } = useQuery('About', () => fetchAbout());
  
  return (
    <>
      <div className={'About About_dark'}>
        <h1>{title}</h1>
        {intro}
        <ul className='About__links'>
          <li><a href={linkedin.link} target="_blank" rel="noreferrer">{linkedin.text}<FiExternalLink /></a></li>
          <li><a  href={github.link} target="_blank" rel="noreferrer">{github.text}<FiExternalLink /></a></li>
        </ul>
        {/* yup `<br/><br/> is not good markup` https://github.com/shapkarin/shapkarin.me/tree/main?tab=readme-ov-file#NOTE-2 */}
        The API for this site <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">is generated</a><FiExternalLink /> and stored as <a href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api" target="_blank" rel="noreferrer">JSON and Markdown</a><FiExternalLink /> on <a href="https://github.com/shapkarin/shapkarin.me/blob/main/.github/workflows/build-deploy.yml">GitHub Pages</a><br/>
        It also uses Github Actions to help with CI, and generates a static version,
        {' '}<a href={website.link} target='_blank' rel='noreferrer'>{website.text}<FiExternalLink /></a><br/>
        Website since 2013 {'=> '}<a href="https://web.archive.org/web/20250000000000*/shapkarin.me" target="_blank" rel="noreferrer">Proof<FiExternalLink /></a><br/>
        semver: <a href="https://github.com/shapkarin/shapkarin.me/tree/main/.env#L1">{process.env.REACT_APP_VERSION}</a>

      </div>
    </>
  )
}



export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}
