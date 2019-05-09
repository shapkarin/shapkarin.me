import pathToRegexp from 'path-to-regexp';

const github = {
  user: 'https://api.github.com/users/shapkarin'
};

export default {
  github: `${github.user}/repos?sort=updated&limit=3`,
  projects: '/projects',
  projectInfo: pathToRegexp('/projects/:id'),
  about: '/about',
  likes: `${github.user}/starred`
};
