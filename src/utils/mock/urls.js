import pathToRegexp from 'path-to-regexp';

export default {
  github: 'https://api.github.com/user/repos',
  projects: '/projects',
  project_info: pathToRegexp('/projects/:id'),
  about: '/about',
};
