import Link from '@/Components/Link';
import { GITHUB_REPO_URL } from '@/constants';

import './style.less';

const Footer = () =>
    <footer className="Footer">
        <Link href={`${GITHUB_REPO_URL}/blob/main/.github/workflows`}>Github Actions</Link> to help with CI, generate API as flat files and static version.
    </footer>

export default Footer;