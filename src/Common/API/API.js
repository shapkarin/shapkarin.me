import axios from 'axios';

import github from './urls';
import backend from 'Common/Mock/urls';
import applyAdapter from 'Common/Mock/adapter';

const mockedRequest = axios.create();
applyAdapter(mockedRequest);

const githubRequest = axios.create({
  headers: {
    // lock to API v3
    'Accept': 'application/vnd.github.v3+json' // application/vnd.github.VERSION.html+json
    // 'Accept': 'application/vnd.github.beta+json'
    // try application/vnd.github.VERSION.html+json (to get compiled repo markdown README.md)
  }
})
/*
    try to use axios.interceptors.request.use and use axios default instance
    to check if url includes https://api.github.com and set the header dinamically
*/

// axios.interceptors.request.use()

const urls = { ...github, ...backend };
// Mock
export const fetchSketches = () => mockedRequest.get(urls.sketches);
export const fetchAbout = () => axios.get(urls.about);
export const fetchPackages = () => mockedRequest.get(urls.packages._root);
export const fetchPackageInfo = (id) => mockedRequest.get(`/packages/${id}`);

// GitHub API
export const fetchLikes = () => githubRequest.get(urls.likes());
export const fetchRepositories = (n = 1) => githubRequest.get(urls.repositories(n));
export const fetchContributions = () => githubRequest.get(urls.activity());

// maybe add it later, get repo languages statistic
// export const fetchRepoLangs = url => axios.get(url);
