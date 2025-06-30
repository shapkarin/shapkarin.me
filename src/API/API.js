// ===============================================
// OPTIMIZED API LAYER
// ===============================================
import axios from 'axios';
import URLS from './urls.js';

// ===============================================
// PRE-COMPUTED REQUEST CONFIGURATIONS
// ===============================================
const GITHUB_CONFIG = {
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
};

const MARKDOWN_CONFIG = {
  headers: {
    'Accept': 'text/markdown, text/plain, */*',
    'Content-Type': 'text/plain; charset=UTF-8',
  }
};

// ===============================================
// OPTIMIZED REQUEST FUNCTIONS - DIRECT CALLS
// ===============================================
/**
 * Standard request
 * @param {string} url - URL to request
 * @returns {Promise} - Axios promise
 */
const makeStandardRequest = (url) => axios.get(url);

/**
 * GitHub API request
 * @param {string} url - URL to request
 * @returns {Promise} - Axios promise
 */
const makeGithubRequest = (url) => axios.get(url, GITHUB_CONFIG);

/**
 * Markdown content request
 * @param {string} url - URL to request
 * @returns {Promise} - Axios promise
 */
const makeMarkdownRequest = (url) => axios.get(url, MARKDOWN_CONFIG);

// ===============================================
// DIRECT API METHODS - NO FUNCTION WRAPPERS
// ===============================================

// Backend API methods (JSON files)
export const fetchCreativeIntro = () => makeStandardRequest(URLS.creative.intro);
export const fetchCreative = () => makeStandardRequest(URLS.creative.collection);
export const fetchAbout = () => makeStandardRequest(URLS.about);
export const fetchPackages = () => makeStandardRequest(URLS.packages());
export const fetchPackageInfo = (id) => makeStandardRequest(URLS.packages.info(id));
export const fetchArticles = () => makeStandardRequest(URLS.articles);

// GitHub API methods
export const fetchLikes = () => makeGithubRequest(URLS.likes());
export const fetchRepositories = (page = 1) => makeGithubRequest(URLS.repositories(page));
export const fetchContributions = () => makeGithubRequest(URLS.activity());

// Content API methods (Markdown files)
export const fetchArticle = (name) => makeMarkdownRequest(URLS.article(name));
