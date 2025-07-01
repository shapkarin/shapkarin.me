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

const rawPrefix = process.env.NODE_ENV === 'production' ? 'https://raw.githubusercontent.com/shapkarin/shapkarin.me/refs/heads/gh-pages' : '';

const backend = {
  about: '/api/about.json',
  packages: Object.assign(
    '/api/packages/packages.json', {
    info: (id) => `/api/packages/${id}.json`,
  }),
  creative: {
    intro:  '/api/creative/intro.json',
    collection: '/api/creative/collection.json',
  },
  articles: '/api/articles/articles.json',
  article: (name) => `${rawPrefix}/api/articles/${name}.md`,
}

const URLS = {
  ...backend,
  ...github,
}

export default URLS;
