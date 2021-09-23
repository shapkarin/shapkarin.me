
import { pathToRegexp } from 'path-to-regexp';

// const REACT_APP_BACKEND_URL = 'https://shapkarin.me';
// const BACKEND_URL = 'https://shapkarin.me';
const BACKEND_URL = '';

const backend = {
  about: `${BACKEND_URL}/about`,
  packages: {
    _root: `${BACKEND_URL}/packages`,
    package() {
      return pathToRegexp(`${this._root}/:id`);
    },
  },
  sketches: `${BACKEND_URL}/sketches`,
}

export default {
  ...backend
};