import Link from '@/Components/Link';

import './style.less';

const Footer = () =>
    <footer className="Footer">
        The API for this site <Link href="https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend">is generated</Link> and stored as <Link href="https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api">JSON and Markdown</Link> on GitHub Pages.<br />
        It <Link href="https://github.com/shapkarin/shapkarin.me/blob/main/.github/workflows">uses Github Actions</Link> to help with CI and generates a static version. Latest commit: <Link href={`https://github.com/shapkarin/shapkarin.me/commit/${process.env.REACT_APP_COMMIT_HASH}`}>{process.env.REACT_APP_COMMIT_HASH && process.env.REACT_APP_COMMIT_HASH.slice(0, 7)}</Link>
    </footer>

export default Footer;