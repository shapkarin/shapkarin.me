import {
  FETCH_ABOUT,
  LOAD_ABOUT_START,
  LOAD_ABOUT_SUCCESS,
  LOAD_ABOUT_ERROR,
} from './constants';

export const fetchAbout = () => ({
  type: FETCH_ABOUT
});

export const loadAboutStart = () => ({
  type: LOAD_ABOUT_START
});

export const loadAboutSuccess = response => ({
  type: LOAD_ABOUT_SUCCESS,
  response
});

export const loadAboutError = error => ({
  type: LOAD_ABOUT_ERROR,
  error
});
