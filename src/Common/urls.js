// TODO: move out of Mock folder
import pathToRegexp from 'path-to-regexp';

const github = {
  user: 'https://api.github.com/users/shapkarin'
};

export default {
  repositories: n => `${github.user}/repos?sort=updated&per_page=30&page=${n}`,
  packages: '/packages',
  packageInfo: pathToRegexp('/packages/:id'),
  about: '/about',
  likes: `${github.user}/starred`,
  sketches: '/sketches'
};
