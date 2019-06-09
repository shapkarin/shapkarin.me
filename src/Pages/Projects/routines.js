import { createRoutine } from 'redux-saga-routines';

import extendRoutine from 'Utils/extendRoutine';

export const projects = extendRoutine(createRoutine('projects'), ['TOGGLE_PROJECT_INFO']);
export const info = createRoutine('info');
