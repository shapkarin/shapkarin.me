/* 
    if you want to cancel reqest by saga worker cancelling 
    read that https://gist.github.com/shapkarin/5dfb7dd134fca1e51fdcef1fd24a8adf
*/
import axios from 'axios';

import urls from './Mock/urls';
import initMock from './Mock/init';

const request = axios.create();
initMock(request);

export const fetchGithub = () => (
  request.get(urls.github)
);

export const fetchProjects = () => (
  request.get(urls.projects)
);

export const fetchAbout = () => (
  request.get(urls.about)
);
