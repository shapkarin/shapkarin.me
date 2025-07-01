const GITHUB_API_URL = 'https://api.github.com';

const github = {
  get user() {
    return `${GITHUB_API_URL}/users/shapkarin`;
  },
  get activity() {
    return `${this.user}/events/public?per_page=100`;
  },
  get repositories() {
    // TODO: pagination
    const perPage = 64;
    const page = 1;
    return `${this.user}/repos?sort=updated&per_page=${perPage}&page=${page}`;
  },
  get likes() {
    return `${this.user}/starred`;
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
