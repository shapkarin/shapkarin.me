import {
  FETCH_MOCK_EXAMPLE,
  LOAD_MOCK_EXAMPLE_START,
  LOAD_MOCK_EXAMPLE_SUCCESS,
  LOAD_MOCK_EXAMPLE_ERROR,
} from './constants';

export const fetchMockExample = () => ({
  type: FETCH_MOCK_EXAMPLE
});

export const loadMockExampleStart = () => ({
  type: LOAD_MOCK_EXAMPLE_START
});

export const loadMockExampleSuccess = response => ({
  type: LOAD_MOCK_EXAMPLE_SUCCESS,
  response
});

export const loadMockExampleError = error => ({
  type: LOAD_MOCK_EXAMPLE_ERROR,
  error
});
