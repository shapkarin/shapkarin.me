import pathToRegexp from 'path-to-regexp';

const github = {
  githubAPI: 'https://api.github.com',
  user() {
    return `${this.githubAPI}/users/shapkarin`;
  },
  activity() {
    return `${this.user()}/events/public?per_page=100`;
  },
  repositories(n = 1) {
    return `${this.user()}/repos?sort=updated&per_page=30&page=${n}`;
  },
  likes() {
    return `${this.user()}/starred`;
  },
};

const mocked = {
  packages: '/packages',
  packageInfo: pathToRegexp('/packages/:id'),
  about: '/about',
  sketches: '/sketches',
}

export default {
  ...github,
  ...mocked
};
