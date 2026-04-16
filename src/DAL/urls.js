import { IS_PRODUCTION } from '@/constants';

const GITHUB_API_URL = 'https://api.github.com';

const github = {
  get user() {
    return `${GITHUB_API_URL}/users/shapkarin`;
  },
  get activity() {
    return `${this.user}/events/public?per_page=100`;
  },
  get repositories() {
    const perPage = 100;
    const page = 1;
    return `${this.user}/repos?sort=pushed&per_page=${perPage}&page=${page}`;
  },
  get likes() {
    return `${this.user}/starred`;
  },
}

const backend = {
  about: '/api/about.json',
  main: '/api/mainpage.json',
  packages: Object.assign(
    '/api/packages/packages.json', {
    info: (id) => `/api/packages/${id}.json`,
  }),
  creative: {
    intro:  '/api/creative/intro.json',
    collection: '/api/creative/collection.json',
  },
  articles: '/api/articles/articles.json',
  article: (name) => `/api/articles/${name}.md`,
  aeo: (name) => `/api/articles/${name}.aeo.json`,
  search: '/api/search-index.json',
}

const URLS = {
  ...backend,
  ...github,
}

export default URLS;
