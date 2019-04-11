import pathToRegexp from 'path-to-regexp';

export default {
  github: 'https://api.github.com/users/shapkarin/repos?sort=updated&limit=3',
  projects: '/projects',
  projectInfo: pathToRegexp('/projects/:id'),
  about: '/about',
  mockExample: '/example'
};
