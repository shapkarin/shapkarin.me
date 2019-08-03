import { createRoutine, createRoutines } from 'redux-saga-routines';

const { some } = createRoutines({ 'some': {'other': {'shit': there => there * 2 }} });

console.log('SOME');
console.log(some.SUCCESS);

export default createRoutine('about');
