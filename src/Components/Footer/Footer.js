import { FiExternalLink } from 'react-icons/fi';

import './style.less';

const Footer = () =>
    <footer className="Footer">
        The API for this site <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">is generated</a><FiExternalLink /> and stored as <a href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api" target="_blank" rel="noreferrer">JSON and Markdown</a><FiExternalLink /> on <a href="https://github.com/shapkarin/shapkarin.me/blob/main/.github/workflows/build-deploy.yml" target="_blank" rel="noreferrer">GitHub Pages<FiExternalLink /></a><br />
        + It uses Github Actions to help with CI, and generates a static version,
        {' '}<a href="https://github.com/shapkarin/shapkarin.me" target='_blank' rel='noreferrer'>This website source code<FiExternalLink /></a><br/>
        The website has been active since 2013 {'=> '}<a href="https://web.archive.org/web/20130801000000*/shapkarin.me" target="_blank" rel="noreferrer">Proof<FiExternalLink /></a>{' | '}
        semver: <a href="https://github.com/shapkarin/shapkarin.me/tree/main/.env#L1" target="_blank" rel="noreferrer">{process.env.REACT_APP_VERSION}</a>
    </footer>

export default Footer;