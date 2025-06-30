import axios from 'axios';

import URLS from './urls';

// Curried function to create request with specific configuration
const createRequest = config => url => axios.get(url, config === undefined ? {} : config);

// Specialized request creators
const createStandardRequest = createRequest();
const createGithubRequest = createRequest({
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});
const createMarkdownRequest = createRequest({
  headers: {
    'Accept': 'text/markdown, text/plain, */*',
    'Content-Type': 'text/plain; charset=UTF-8',
  }
});

// Higher-order function to create API methods
const createApiMethod = requestFn => urlFn => (...args) => 
  requestFn(typeof urlFn === 'function' ? urlFn(...args) : urlFn);

// Create specialized API method creators
const createStandardApi = createApiMethod(createStandardRequest);
const createGithubApi = createApiMethod(createGithubRequest);
const createMarkdownApi = createApiMethod(createMarkdownRequest);

// Backend API methods (from generated JSON files) [/src/Generate-Backend/*
export const fetchCreativeIntro = createStandardApi(URLS.creative.intro);
export const fetchCreative = createStandardApi(URLS.creative.collection);
export const fetchAbout = createStandardApi(URLS.about);
export const fetchPackages = createStandardApi(URLS.packages);
export const fetchPackageInfo = createStandardApi(URLS.packages.info);

// GitHub API methods
export const fetchLikes = createGithubApi(URLS.likes);
export const fetchRepositories = createGithubApi(URLS.repositories);
export const fetchContributions = createGithubApi(URLS.activity);

// Articles API methods (Markdown files)
export const fetchArticles = createStandardApi(URLS.articles);
export const fetchArticle = createMarkdownApi(URLS.article);

// maybe add it later, get repo languages statistic
// export const fetchRepoLangs = url => axios.get(url);
