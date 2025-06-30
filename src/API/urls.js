// ===============================================
// CENTRALIZED CONSTANTS & CONFIGURATION
// ===============================================
const API_CONSTANTS = {
  GITHUB_API_URL: 'https://api.github.com',
  RAW_PREFIX: process.env.NODE_ENV === 'production' 
    ? 'https://raw.githubusercontent.com/shapkarin/shapkarin.me/refs/heads/gh-pages' 
    : '',
  USER_NAME: 'shapkarin',
  DEFAULT_PER_PAGE: 64,
  ACTIVITY_PER_PAGE: 100,
};

// ===============================================
// UNIFIED URL BUILDER ABSTRACTION
// ===============================================
/**
 * Universal curried URL builder that handles all URL creation scenarios
 * @param {string} baseUrl - Base URL (can be empty string)
 * @returns {function} - Curried function expecting endpoint
 */
const createUrlBuilder = (baseUrl = '') => (endpoint = '') => (params = null) => {
  const fullUrl = `${baseUrl}${endpoint}`;
  
  if (!params || Object.keys(params).length === 0) {
    return fullUrl;
  }
  
  const url = new URL(fullUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value);
    }
  });
  
  return url;
};

// ===============================================
// SPECIALIZED URL BUILDERS
// ===============================================
const buildGithubUrl = createUrlBuilder(API_CONSTANTS.GITHUB_API_URL);
const buildBackendUrl = createUrlBuilder('');
const buildRawUrl = createUrlBuilder(API_CONSTANTS.RAW_PREFIX);

// ===============================================
// PATH PATTERN HELPERS
// ===============================================
/**
 * Creates GitHub user endpoint path
 * @param {string} path - Additional path after username
 * @returns {string} - Complete user endpoint path
 */
const createUserEndpoint = (path = '') => `/users/${API_CONSTANTS.USER_NAME}${path}`;

/**
 * Creates API endpoint path
 * @param {string} path - API path
 * @returns {string} - Complete API endpoint path
 */
const createApiEndpoint = (path = '') => `/api${path}`;

// ===============================================
// HIGHER-ORDER URL GENERATORS
// ===============================================
/**
 * Creates GitHub user URL with optional parameters
 * @param {string} endpoint - User endpoint path
 * @returns {function} - Function that accepts parameters and returns URL
 */
const createGithubUserUrl = (endpoint = '') => (params = null) => 
  buildGithubUrl(createUserEndpoint(endpoint))(params);

/**
 * Creates backend API URL
 * @param {string} endpoint - API endpoint path
 * @returns {string} - Complete backend API URL
 */
const createBackendApiUrl = (endpoint = '') => buildBackendUrl(createApiEndpoint(endpoint))();

/**
 * Creates raw content URL
 * @param {string} endpoint - Raw content endpoint path
 * @returns {string} - Complete raw content URL
 */
const createRawApiUrl = (endpoint = '') => buildRawUrl(createApiEndpoint(endpoint))();

// ===============================================
// PARAMETERIZED URL GENERATORS
// ===============================================
/**
 * Repository URL generator with pagination support
 * @param {number} page - Page number (default: 1)
 * @returns {string} - Repository URL with parameters
 */
const createRepositoryUrl = (page = 1) => createGithubUserUrl('/repos')({
  sort: 'updated',
  per_page: API_CONSTANTS.DEFAULT_PER_PAGE,
  page
});

/**
 * Activity URL generator
 * @returns {string} - Activity URL with parameters
 */
const createActivityUrl = () => createGithubUserUrl('/events/public')({
  per_page: API_CONSTANTS.ACTIVITY_PER_PAGE
});

// ===============================================
// PACKAGE URL FACTORY
// ===============================================
/**
 * Creates package URL structure with nested info method
 * @returns {function & object} - Function with info method attached
 */
const createPackageUrls = () => {
  const packagesUrl = () => createBackendApiUrl('/packages/packages.json');
  packagesUrl.info = (id) => createBackendApiUrl(`/packages/${id}.json`);
  return packagesUrl;
};

// ===============================================
// CREATIVE URLS FACTORY
// ===============================================
/**
 * Creates creative URLs object
 * @returns {object} - Object with intro and collection URLs
 */
const createCreativeUrls = () => ({
  intro: createBackendApiUrl('/creative/intro.json'),
  collection: createBackendApiUrl('/creative/collection.json'),
});

// ===============================================
// MAIN URL CONFIGURATION
// ===============================================
const URLS = {
  // GitHub API endpoints
  user: () => createGithubUserUrl()(),
  activity: createActivityUrl,
  repositories: createRepositoryUrl,
  likes: () => createGithubUserUrl('/starred')(),
  
  // Backend API endpoints
  about: createBackendApiUrl('/about.json'),
  packages: createPackageUrls(),
  creative: createCreativeUrls(),
  articles: createBackendApiUrl('/articles/articles.json'),
  article: (name) => createRawApiUrl(`/articles/${name}.md`),
};

export default URLS;
