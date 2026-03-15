import Link from '@/Components/Link';
import { GITHUB_REPO_URL } from '@/constants';

import './style.less';

const Footer = () =>
    <footer className="Footer">
        The API for this site <Link href={`${GITHUB_REPO_URL}/tree/master/src/Generate-Backend`}>is generated</Link> and stored as <Link href={`${GITHUB_REPO_URL}/tree/gh-pages/api`}>JSON and Markdown</Link> on GitHub Pages.<br />
        It <Link href={`${GITHUB_REPO_URL}/blob/main/.github/workflows`}>uses Github Actions</Link> to help with CI and generates a static version. Latest commit: <Link href={`${GITHUB_REPO_URL}/commit/${process.env.REACT_APP_COMMIT_HASH}`}>{process.env.REACT_APP_COMMIT_HASH && process.env.REACT_APP_COMMIT_HASH.slice(0, 7)}</Link>
    </footer>

export default Footer;