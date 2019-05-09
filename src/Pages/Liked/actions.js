import {
  FETCH_LIKED,
  LOAD_LIKED_START,
  LOAD_LIKED_SUCCESS,
  LOAD_LIKED_ERROR,
} from './constants';

export const fetchLiked = () => ({
  type: FETCH_LIKED
});

export const loadLikedStart = () => ({
  type: LOAD_LIKED_START
});

export const loadLikedSuccess = response => ({
  type: LOAD_LIKED_SUCCESS,
  response
});

export const loadLikedError = error => ({
  type: LOAD_LIKED_ERROR,
  error
});
