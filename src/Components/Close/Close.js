import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

import './style.less';

const Close = () => (
  <Link
    to="/"
    className="CloseButton"
    aria-label="Back to the main page"
  >
    <IoMdClose />
  </Link>
);

export default Close;
