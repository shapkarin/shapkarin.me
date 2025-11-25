import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

import URLS from './urls';

const githubRequest = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
})

const markdownRequest = axios.create({
  headers: {
    'Accept': 'text/markdown, text/plain, */*',
    'Content-Type': 'text/plain; charset=UTF-8',
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
     queries: {
       suspense: true,
       staleTime: 60 * 1000 * 17, // 15 minutes chached data lifetime]
       retry: 3,
     },
   },
});

// From generated JSON files
export const fetchCreativeIntro = () => axios.get(URLS.creative.intro);
export const fetchCreative = () => axios.get(URLS.creative.collection);
export const fetchAbout = () => axios.get(URLS.about);
export const fetchPackages = () => axios.get(URLS.packages);
export const fetchPackageInfo = (id) => axios.get(URLS.packages.info(id));
export const fetchArticles = () => axios.get(URLS.articles);
export const fetchMainPage = () => axios.get(URLS.main)

// GitHub API
export const fetchLikes = () => githubRequest.get(URLS.likes);
export const fetchRepositories = () => githubRequest.get(URLS.repositories);
export const fetchContributions = () => githubRequest.get(URLS.activity);

// Articles (MD files)
export const fetchArticle = (name) => markdownRequest.get(URLS.article(name));

// Fetch AeoScript for related articles
export const fetchAeoScript = (name) => axios.get(URLS.aeoScript(name));

// maybe add it later, get repo languages statistic
// export const fetchRepoLangs = url => axios.get(url);
