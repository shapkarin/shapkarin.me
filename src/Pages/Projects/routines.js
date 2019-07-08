import { createRoutine } from 'redux-saga-routines';
import extendRoutine from 'extend-saga-routines';

export const projects = createRoutine('projects');
export const info = extendRoutine(createRoutine('projects/info'), 'TOGGLE');
