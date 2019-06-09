import { createAction } from 'redux-actions';


export const createActionCreator = ({ type, typePrefix }) => createAction(`${typePrefix}/${type}`);

export default function extendRoutine(routine, types = []){
  const triggerType = routine.toString();
  const typePrefix = triggerType.substring(0, triggerType.lastIndexOf('/'));
  return types.reduce(
    (result, stage) => {
      const actionCreator = createActionCreator({ type: stage, typePrefix });
      return Object.assign(result, {
        [stage.toLowerCase()]: actionCreator,
        [stage.toUpperCase()]: actionCreator.toString(),
      });
    },
    routine
  );
}
