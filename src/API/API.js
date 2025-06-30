import axios from 'axios';
import URLS from './urls.js';

const GITHUB = 'github';
const MARKDOWN = 'markdown';

// ===============================================
// CENTRALIZED REQUEST CONFIGURATION
// ===============================================
const REQUEST_CONFIGS = {
  [GITHUB]: {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  },
  [MARKDOWN]: {
    headers: {
      'Accept': 'text/markdown, text/plain, */*',
      'Content-Type': 'text/plain; charset=UTF-8',
    }
  }
};

// ===============================================
// UNIFIED REQUEST ABSTRACTION
// ===============================================
/**
 * Universal request creator with configuration selection
 * @param {string} configType - Type of configuration to use
 * @returns {function} - Function that accepts URL and makes request
 */
const createRequest = (configType = null) => (url) => {
  const config = configType && REQUEST_CONFIGS[configType] 
    ? REQUEST_CONFIGS[configType] 
    : {};
  
  return axios.get(url, config);
};

// ===============================================
// SPECIALIZED REQUEST CREATORS
// ===============================================
const createStandardRequest = createRequest();
const createGithubRequest = createRequest(GITHUB);
const createMarkdownRequest = createRequest(MARKDOWN);

// ===============================================
// HIGHER-ORDER API METHOD FACTORY
// ===============================================
/**
 * Universal API method creator
 * @param {function} requestCreator - Request creator function
 * @returns {function} - Function that creates API methods from URL functions
 */
const createApiMethodFactory = (requestCreator) => (urlFunction) => (...args) => {
  const url = typeof urlFunction === 'function' 
    ? urlFunction(...args) 
    : urlFunction;
  
  return requestCreator(url);
};

// ===============================================
// SPECIALIZED API METHOD CREATORS
// ===============================================
const createStandardApiMethod = createApiMethodFactory(createStandardRequest);
const createGithubApiMethod = createApiMethodFactory(createGithubRequest);
const createMarkdownApiMethod = createApiMethodFactory(createMarkdownRequest);

// ===============================================
// API METHOD DEFINITIONS
// ===============================================
/**
 * Centralized API methods configuration
 * Organized by data source and functionality
 */
const API_METHODS = {
  // Backend API methods (JSON files from /src/Generate-Backend/*)
  backend: {
    fetchCreativeIntro: createStandardApiMethod(URLS.creative.intro),
    fetchCreative: createStandardApiMethod(URLS.creative.collection),
    fetchAbout: createStandardApiMethod(URLS.about),
    fetchPackages: createStandardApiMethod(URLS.packages),
    fetchPackageInfo: createStandardApiMethod(URLS.packages.info),
    fetchArticles: createStandardApiMethod(URLS.articles),
  },

  // GitHub API methods (external API calls)
  github: {
    fetchLikes: createGithubApiMethod(URLS.likes),
    fetchRepositories: createGithubApiMethod(URLS.repositories),
    fetchContributions: createGithubApiMethod(URLS.activity),
  },

  // Content API methods (markdown files)
  content: {
    fetchArticle: createMarkdownApiMethod(URLS.article),
  },
};

// ===============================================
// FLATTENED API METHODS FOR EXPORT
// ===============================================
/**
 * Flattens nested API methods into a single object
 * @param {object} methods - Nested API methods object
 * @returns {object} - Flattened methods object
 */
const flattenApiMethods = (methods) => {
  return Object.values(methods).reduce((acc, methodGroup) => {
    return { ...acc, ...methodGroup };
  }, {});
};

// Create flattened methods for export
const apiMethods = flattenApiMethods(API_METHODS);

// ===============================================
// EXPORTS
// ===============================================
// Export individual methods for backward compatibility
export const {
  fetchCreativeIntro,
  fetchCreative,
  fetchAbout,
  fetchPackages,
  fetchPackageInfo,
  fetchLikes,
  fetchRepositories,
  fetchContributions,
  fetchArticles,
  fetchArticle,
} = apiMethods;

// Export grouped methods for organized access
export const API = API_METHODS;

// Export individual request creators for advanced usage
export const requestCreators = {
  standard: createStandardRequest,
  github: createGithubRequest,
  markdown: createMarkdownRequest,
};

// Export method factories for extensibility
export const methodFactories = {
  standard: createStandardApiMethod,
  github: createGithubApiMethod,
  markdown: createMarkdownApiMethod,
};

// TODO: Add repository languages statistics endpoint
// export const fetchRepoLangs = createGithubApiMethod(URLS.repoLanguages);
