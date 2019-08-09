import axios from 'axios';

import urls from './urls';
import initMock from './Mock/init';

const mockedRequest = axios.create();
initMock(mockedRequest);

export const fetchAbout = () => mockedRequest.get(urls.about);

export const fetchProjects = () => mockedRequest.get(urls.projects);

export const fetchProjectInfo = ({ payload: { id } }) => mockedRequest.get(`/projects/${id}`);

export const fetchLikes = () => axios.get(urls.likes);

export const fetchGithub = (n = 1) => axios.get(urls.github(n));
