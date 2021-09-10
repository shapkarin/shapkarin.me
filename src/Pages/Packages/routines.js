import { createRoutine } from 'redux-saga-routines';
import { createExtendedRoutine } from 'extend-saga-routines';

export const packages = createRoutine('packages');
export const info = createExtendedRoutine('packages/info', 'TOGGLE');
