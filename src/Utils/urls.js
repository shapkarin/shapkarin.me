// TODO: move out of Mock folder
import pathToRegexp from 'path-to-regexp';

const github = {
  user: 'https://api.github.com/users/shapkarin'
};

export default {
  github: n => `${github.user}/repos?sort=updated&per_page=30&page=${n}`,
  projects: '/projects',
  projectInfo: pathToRegexp('/projects/:id'),
  about: '/about',
  likes: `${github.user}/starred`
};
