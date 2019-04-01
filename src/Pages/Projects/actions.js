import {
  FETCH_PROJECTS,
  LOAD_PROJECTS_START,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_ERROR,
  FETCH_PROJECT_INFO,
  LOAD_PROJECT_INFO_START,
  LOAD_PROJECT_INFO_SUCCESS,
  LOAD_PROJECT_INFO_ERROR,
  TOGGLE_PROJECT_INFO
} from './constants';

export const fetchProjects = () => ({
  type: FETCH_PROJECTS
});

export const loadProjectsStart = () => ({
  type: LOAD_PROJECTS_START
});

export const loadProjectsSuccess = response => ({
  type: LOAD_PROJECTS_SUCCESS,
  response
});

export const loadProjectsError = error => ({
  type: LOAD_PROJECTS_ERROR,
  error
});


export const fetchProjectInfo = ({ id, fetched }) => ({
  type: FETCH_PROJECT_INFO,
  id,
  fetched
});

export const loadProjectInfoStart = id => ({
  type: LOAD_PROJECT_INFO_START,
  id
});

export const loadProjectInfoSuccess = (response, id) => ({
  type: LOAD_PROJECT_INFO_SUCCESS,
  response,
  id
});

export const loadProjectInfoError = error => ({
  type: LOAD_PROJECT_INFO_ERROR,
  error
});

export const toggleProjectInfo = id => ({
  type: TOGGLE_PROJECT_INFO,
  id
});
