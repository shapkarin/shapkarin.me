import axios from 'axios';

import URLS from './urls';

const githubRequest = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
})

// From generated JSON files
export const fetchSketchesIntro = () => axios.get(URLS.sketches.intro);
export const fetchSketches = () => axios.get(URLS.sketches.collection);
export const fetchAbout = () => axios.get(URLS.about);
export const fetchPackages = () => axios.get(URLS.packages._root);
export const fetchPackageInfo = (id) => axios.get(URLS.packages.info(id));

// GitHub API
export const fetchLikes = () => githubRequest.get(URLS.likes());
export const fetchRepositories = (n = 1) => githubRequest.get(URLS.repositories(n));
export const fetchContributions = () => githubRequest.get(URLS.activity());

// Articles (MD files)
export const fetchArticles = () => axios.get(URLS.articles);
export const fetchArticle = (name) => axios.get(URLS.article(name), {
  headers: {
    'Accept': 'text/markdown, text/plain, */*',
    'Content-Type': 'text/plain; charset=UTF-8',
  },
});

// maybe add it later, get repo languages statistic
// export const fetchRepoLangs = url => axios.get(url);
