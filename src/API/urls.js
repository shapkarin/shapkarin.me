const GITHUB_API_URL = 'https://api.github.com';

const github = {
  user() {
    return `${GITHUB_API_URL}/users/shapkarin`;
  },
  activity() {
    return `${this.user()}/events/public?per_page=100`;
  },
  repositories(n = 1) {
    // TODO: pagination
    const PER_PAGE = 64;
    return `${this.user()}/repos?sort=updated&per_page=${PER_PAGE}&page=${n}`;
  },
  likes() {
    return `${this.user()}/starred`;
  },
}

const backend = {
  about: '/api/about.json',
  packages: {
    _root: '/api/packages/packages.json',
    info: (id) => `/api/packages/${id}.json`,
  },
  sketches: {
    intro:  '/api/sketches/intro.json',
    collection: '/api/sketches/collection.json',
  },
  articles: '/api/articles/list.json',
  article: (name) => `/api/articles/${name}.md`,
}

const URLS = {
  ...backend,
  ...github,
}

export default URLS;
