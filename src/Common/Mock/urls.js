
import { pathToRegexp } from 'path-to-regexp';

// const REACT_APP_BACKEND_URL = 'https://shapkarin.me';
// const BACKEND_URL = 'https://shapkarin.me';

const backend = {
  about: '/api/about.json',
  packages: {
    _root: '/packages',
    package() {
      return pathToRegexp(`${this._root}/:id`);
    },
  },
  sketches: '/sketches',
}

export default {
  ...backend
};