import {
  FETCH_REPOSITORIES,
  LOAD_REPOSITORIES_START,
  LOAD_REPOSITORIES_SUCCESS,
  LOAD_REPOSITORIES_ERROR,
} from './constants';

export const fetchRepositories = () => ({
  type: FETCH_REPOSITORIES
});

export const loadRepositoriesStart = () => ({
  type: LOAD_REPOSITORIES_START
});

export const loadRepositoriesSuccess = response => ({
  type: LOAD_REPOSITORIES_SUCCESS,
  response
});

export const loadRepositoriesError = error => ({
  type: LOAD_REPOSITORIES_ERROR,
  error
});
