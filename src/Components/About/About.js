import { useQuery } from 'react-query';
import { FiExternalLink } from 'react-icons/fi';
import { fetchAbout } from 'Common/API';
import Preloader from 'Components/Preloader';

import './style.less';

function About() {
  const { data: { data } } = useQuery('About', () => fetchAbout());
  
  return (
    <>
      <div className={'About About_dark'}>
        <h1>{data.title}</h1>
        {data.intro}<br /><br />
        <a  href="https://github.com/shapkarin" target="_blank" rel="noreferrer">My Github <FiExternalLink /></a>
        <br/>
        <a href='https://github.com/shapkarin/shapkarin.me' target='_blank' rel='noreferrer'>Website source code<FiExternalLink /></a>
        {/* yup `<br/><br/> is not good markup` https://github.com/shapkarin/shapkarin.me/tree/main?tab=readme-ov-file#NOTE-2 */}
        <br/><br/>
        The API for this site is generated <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">by this code</a><FiExternalLink /> and stored as <a href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api" target="_blank" rel="noreferrer">JSON files</a><FiExternalLink /> on <a href="https://github.com/shapkarin/shapkarin.me/tree/main/.github/workflows/deploy.yml">GitHub Pages</a><br/>
        semver: <a href="https://github.com/shapkarin/shapkarin.me/tree/main/.env#L1">{process.env.REACT_APP_VERSION}</a>
      </div>
    </>
  )
}



export default function SuspensedAbout() {
  return <Preloader><About /></Preloader>
}
