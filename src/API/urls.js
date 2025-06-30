// Curried function to create URL with parameters
const createUrl = baseUrl => endpoint => params => {
  const url = new URL(`${baseUrl}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

// Curried function for simple URL concatenation (no query params)
const createSimpleUrl = baseUrl => endpoint => `${baseUrl === undefined ? '' : baseUrl}${endpoint}`;

// GitHub API URL builders
const GITHUB_API_URL = 'https://api.github.com';
const createGithubUrl = createUrl(GITHUB_API_URL);
const createGithubSimpleUrl = createSimpleUrl(GITHUB_API_URL);

const createUserUrl = endpoint => createGithubSimpleUrl(`/users/shapkarin${endpoint === undefined ? '' : endpoint}`);
const createUserUrlWithParams = endpoint => params => createGithubUrl(`/users/shapkarin${endpoint}`)(params);

// Backend URL builders
const rawPrefix = process.env.NODE_ENV === 'production' 
  ? 'https://raw.githubusercontent.com/shapkarin/shapkarin.me/refs/heads/gh-pages' 
  : '';

const createBackendUrl = createSimpleUrl();
const createApiUrl = endpoint => createBackendUrl(`/api${endpoint}`);
const createRawUrl = endpoint => createSimpleUrl(rawPrefix)(`/api${endpoint === undefined ? '' : endpoint}`);


const URLS = {
  // GitHub API endpoints
  user: () => createUserUrl(),
  activity: () => createUserUrlWithParams('/events/public')({ per_page: 100 }),
  repositories: (n = 1) => {
    const PER_PAGE = 64;
    return createUserUrlWithParams('/repos')({ 
      sort: 'updated', 
      per_page: PER_PAGE, 
      page: n 
    });
  },
  likes: () => createUserUrl('/starred'),
  // Authors API endpoints
  about: createApiUrl('/about.json'),
  packages: Object.assign(
    () => createApiUrl('/packages/packages.json'),
    {
      info: (id) => createApiUrl(`/packages/${id}.json`),
    }
  ),
  creative: {
    intro: createApiUrl('/creative/intro.json'),
    collection: createApiUrl('/creative/collection.json'),
  },
  articles: createApiUrl('/articles/articles.json'),
  article: (name) => createRawUrl(`/articles/${name}.md`),
};

export default URLS;
