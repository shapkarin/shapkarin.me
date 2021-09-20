import axios from 'axios';

import urls from './urls';
import initMock from './Mock/init';

const mockedRequest = axios.create();
initMock(mockedRequest);

// Mock requests
export const fetchSketches = () => mockedRequest.get(urls.sketches);
export const fetchAbout = () => mockedRequest.get(urls.about);
export const fetchPackages = () => mockedRequest.get(urls.packages);
export const fetchPackageInfo = ({ payload: { id } }) => mockedRequest.get(`/packages/${id}`);

// GitHub API
export const fetchLikes = () => axios.get(urls.likes());
export const fetchRepositories = (n = 1) => axios.get(urls.repositories(n));
export const fetchContributions = () => axios.get(urls.activity());


// maybe add it later, get repo languages statistic
// export const fetchRepoLangs = url => axios.get(url);
