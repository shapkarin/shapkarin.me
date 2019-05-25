import {
  TOGGLE_PROJECT_INFO
} from './constants';

export const toggleProjectInfo = id => ({
  type: TOGGLE_PROJECT_INFO,
  id
});
