import { FiExternalLink } from 'react-icons/fi';

import './style.less';

const Footer = () =>
    <footer className="Footer">
        The API for this site <a href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend" target="_blank" rel="noreferrer">is generated</a><FiExternalLink /> and stored as <a href="https://github.com/shapkarin/shapkarin.me/tree/gh-@/Pages/api" target="_blank" rel="noreferrer">JSON and Markdown</a><FiExternalLink /> on GitHub Pages.<br />
        It <a href="https://github.com/shapkarin/shapkarin.me/blob/main/.github/workflows/build-deploy.yml" target="_blank" rel="noreferrer">uses Github Actions<FiExternalLink /></a> to help with CI and generates a static version.
    </footer>

export default Footer;