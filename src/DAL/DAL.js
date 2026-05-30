import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

import URLS from './URL';
import { IS_PRODUCTION, IS_DEVELOPMENT } from '@/constants'

const githubRequest = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
})

const markdownRequest = axios.create({
  headers: {
    'Accept': 'text/markdown, text/plain, */*',
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: IS_PRODUCTION ? 1000 * 60 * 60 * 24 * 7 : 0,
      retry: (_, error) => {
        if (IS_DEVELOPMENT) {
          return false;
        }
        /*
          S3 and Github API workaroud
          unfortunately we can get these codes
          and it's not because of this website
        */
        if ([400, 401, 403, 429, 404].includes(error?.response?.status || error?.status)) {
          return false;
        }
        return true; // each new request is twice as long
      }
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
export const fetchRepositories = (params) => githubRequest.get(URLS.repositories(params));
export const fetchContributions = () => githubRequest.get(URLS.activity);

// Articles (MD files)
export const fetchArticle = (name) => markdownRequest.get(URLS.article(name));

// Fetch AeoScript for related articles
export const fetchAeo = (name) => axios.get(URLS.aeo(name));

// Search index
export const fetchSearchIndex = () => axios.get(URLS.search);

// maybe add it later, get repo languages statistic
// export const fetchRepoLangs = url => axios.get(url);
