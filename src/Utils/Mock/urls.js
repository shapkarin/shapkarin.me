import pathToRegexp from 'path-to-regexp';

export default {
  github: 'https://api.github.com/user/repos',
  projects: '/projects',
  projectInfo: pathToRegexp('/projects/:id'),
  about: '/about',
  mockExample: '/example'
};
