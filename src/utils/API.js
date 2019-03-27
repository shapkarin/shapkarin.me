/* 
    if you want to cancel reqest by saga worker cancelling 
    read that https://gist.github.com/shapkarin/5dfb7dd134fca1e51fdcef1fd24a8adf
*/
import axios from 'axios';

import urls from './mock/urls';
import initMock from './mock/init';

const request = axios.create();
initMock(request);

export const fetchGithub = () => (
  axios.get(urls.github)
);

export const fetchProjects = () => (
  axios.get(urls.projects)
);

export const fetchAbout = () => (
  axios.get(urls.about)
);
