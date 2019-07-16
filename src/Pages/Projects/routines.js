import { createRoutine } from 'redux-saga-routines';
import { createExtendedRoutine } from 'extend-saga-routines';

export const projects = createRoutine('projects');
export const info = createExtendedRoutine('projects/info', 'TOGGLE');
