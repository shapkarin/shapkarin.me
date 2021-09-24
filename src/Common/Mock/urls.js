import { pathToRegexp } from 'path-to-regexp';

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

export default backend;