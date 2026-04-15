import Link from '@/Components/Link';
import { GITHUB_REPO_URL, COMMIT_HASH } from '@/constants';

import './style.less';

const Footer = () =>
    <footer className="Footer">
        <Link href={`${GITHUB_REPO_URL}/blob/main/.github/workflows`}>Github Actions</Link> to help with CI, generate API as flat files and static version. Latest commit: <Link href={`${GITHUB_REPO_URL}/commit/${COMMIT_HASH}`}>{COMMIT_HASH && COMMIT_HASH.slice(0, 7)}</Link>
    </footer>

export default Footer;