import Link from '@/Components/Link';

import './style.less';

const Footer = () =>
    <footer className="Footer">
        The API for this site <Link href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend">is generated</Link> and stored as <Link href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api">JSON and Markdown</Link> on GitHub Pages.<br />
        It <Link href="https://github.com/shapkarin/shapkarin.me/blob/main/.github/workflows">uses Github Actions</Link> to help with CI and generates a static version.
    </footer>

export default Footer;