import { createExtendedRoutine } from 'extend-saga-routines';

export default createExtendedRoutine('liked', ['GO_TO', 'PREVIOUS', 'NEXT', 'FIRST', 'LAST']);
