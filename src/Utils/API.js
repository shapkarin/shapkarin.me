/*
    // todo: move to `Components` too
    if you want to cancel reqest by saga worker cancelling
    read that https://gist.github.com/shapkarin/5dfb7dd134fca1e51fdcef1fd24a8adf
*/
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
