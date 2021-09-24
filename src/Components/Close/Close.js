import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

import './style.less';

const Close = () => (
  <Link
    to="/"
    className="CloseButton"
  >
    <IoMdClose />
  </Link>
);

export default Close;
