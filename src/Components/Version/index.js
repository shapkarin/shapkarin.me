import { FiExternalLink } from 'react-icons/fi';

export default function Version({ prefix = 'v', number = null }) {
  const version = process.env.REACT_APP_VERSION || null;
  return version 
  && <>
    <a
      href="https://github.com/shapkarin/shapkarin.me/blob/main/.env.production#L1"
      target="_blank"
      rel="noreferrer"
    >
      {!number && prefix}{ version }
    </a>
    <FiExternalLink />
    </>
}