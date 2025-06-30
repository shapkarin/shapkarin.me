// ===============================================
// OPTIMIZED URL BUILDER - ELIMINATED FUNCTIONAL UTILITIES
// ===============================================

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

// Pre-computed common paths
const GITHUB_USER_BASE = `${API_CONSTANTS.GITHUB_API_URL}/users/${API_CONSTANTS.USER_NAME}`;
const API_BASE = '/api';

// ===============================================
// OPTIMIZED PARAMETER PROCESSING
// ===============================================
/**
 * Optimized query string builder with minimal overhead
 * @param {object} params - Parameters object
 * @returns {string} - Query string
 */
const buildQueryString = (params) => {
  if (!params) return '';
  
  let query = '';
  let hasParams = false;
  
  // Direct iteration - no intermediate arrays
  for (const key in params) {
    const value = params[key];
    if (value !== null && value !== undefined) {
      if (hasParams) query += '&';
      query += `${key}=${encodeURIComponent(value)}`;
      hasParams = true;
    }
  }
  
  return hasParams ? `?${query}` : '';
};

// ===============================================
// DIRECT URL BUILDERS
// ===============================================
/**
 * Fast GitHub user URL builder
 * @param {string} path - User path
 * @param {object} params - URL parameters
 * @returns {string} - Complete URL
 */
const createGithubUserUrl = (path = '', params = null) => 
  `${GITHUB_USER_BASE}${path}${buildQueryString(params)}`;

/**
 * Fast backend API URL builder
 * @param {string} path - API path
 * @returns {string} - Complete URL
 */
const createBackendApiUrl = (path) => `${API_BASE}${path}`;

/**
 * Fast raw content URL builder
 * @param {string} path - Content path
 * @returns {string} - Complete URL
 */
const createRawApiUrl = (path) => `${API_CONSTANTS.RAW_PREFIX}${API_BASE}${path}`;

// ===============================================
// PRE-COMPUTED PARAMETER OBJECTS
// ===============================================
const ACTIVITY_PARAMS = { per_page: API_CONSTANTS.ACTIVITY_PER_PAGE };

/**
 * Optimized repository parameters with minimal object creation
 * @param {number} page - Page number
 * @returns {object} - Repository parameters
 */
const getRepositoryParams = (page = 1) => ({
  sort: 'updated',
  per_page: API_CONSTANTS.DEFAULT_PER_PAGE,
  page
});

// ===============================================
// OPTIMIZED URL GENERATORS - DIRECT CALLS
// ===============================================
/**
 * Repository URL generator
 * @param {number} page - Page number
 * @returns {string} - Repository URL
 */
const createRepositoryUrl = (page = 1) => 
  createGithubUserUrl('/repos', getRepositoryParams(page));

/**
 * Activity URL generator
 * @returns {string} - Activity URL
 */
const createActivityUrl = () => 
  createGithubUserUrl('/events/public', ACTIVITY_PARAMS);

/**
 * User URL generator
 * @returns {string} - User URL
 */
const createUserUrl = () => createGithubUserUrl('');

/**
 * Likes URL generator
 * @returns {string} - Likes URL
 */
const createLikesUrl = () => createGithubUserUrl('/starred');

// ===============================================
// PRE-COMPUTED URLS
// ===============================================
const STATIC_URLS = {
  about: createBackendApiUrl('/about.json'),
  articles: createBackendApiUrl('/articles/articles.json'),
  packagesBase: createBackendApiUrl('/packages/packages.json'),
  creativeIntro: createBackendApiUrl('/creative/intro.json'),
  creativeCollection: createBackendApiUrl('/creative/collection.json'),
};

// ===============================================
// OPTIMIZED PACKAGE URLS WITH CACHING
// ===============================================
const packageInfoCache = new Map();

/**
 * Optimized package URLs with caching
 * @returns {Function & object} - Package URLs with cached info method
 */
const createPackageUrls = () => {
  const packagesUrl = () => STATIC_URLS.packagesBase;
  
  // Cached info method for repeated access
  packagesUrl.info = (id) => {
    if (!packageInfoCache.has(id)) {
      packageInfoCache.set(id, createBackendApiUrl(`/packages/${id}.json`));
    }
    return packageInfoCache.get(id);
  };
  
  return packagesUrl;
};

// ===============================================
// MAIN URL CONFIGURATION - PRE-COMPUTED
// ===============================================
const URLS = {
  // GitHub API endpoints
  user: createUserUrl,
  activity: createActivityUrl,
  repositories: createRepositoryUrl,
  likes: createLikesUrl,
  
  // Backend API endpoints
  about: STATIC_URLS.about,
  packages: createPackageUrls(),
  creative: {
    intro: STATIC_URLS.creativeIntro,
    collection: STATIC_URLS.creativeCollection,
  },
  articles: STATIC_URLS.articles,
  article: (name) => createRawApiUrl(`/articles/${name}.md`),
};

export default URLS;
