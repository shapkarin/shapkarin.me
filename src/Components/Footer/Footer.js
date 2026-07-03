import ReactTooltip from 'react-tooltip';

import './style.less';

const Footer = () =>
    <>
        <ReactTooltip
            place="top"
        />
        <footer className="Footer">
            It uses Github Actions to help with deploy and prepare a static HTML version.<br/>
            API is build with node.js code and stored as flat JSON and Markdown files on <a data-tip="again, back to the gh-pages">lovely GitHub pages</a>.
        </footer>
    </>

export default Footer;