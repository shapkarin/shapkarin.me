import axios from 'axios';

import urls from './urls';
import initMock from '../Mock/init';

const mockedRequest = axios.create();
initMock(mockedRequest);

export const fetchSketches = () => mockedRequest.get(urls.sketches);

export const fetchAbout = () => mockedRequest.get(urls.about);

export const fetchPackages = () => mockedRequest.get(urls.packages);

export const fetchPackageInfo = ({ payload: { id } }) => mockedRequest.get(`/packages/${id}`);

export const fetchLikes = () => axios.get(urls.likes);

export const fetchGithub = (n = 1) => axios.get(urls.repositories(n));

// export const fetchRepoLangs = url => axios.get(url);
