import { createAction } from 'redux-actions';

const isFunction = value => typeof value === 'function';

const getCreatorForType = (type, creator) => {
  if (!creator) {
    return creator;
  }
  if (isFunction(creator[type])) {
    return creator[type];
  }
  if (isFunction(creator[type.toLowerCase()])) {
    return creator[type.toLowerCase()];
  }
  if (isFunction(creator)) {
    return creator;
  }
  return undefined;
};

export const createActionCreator = ({ type, typePrefix, payloadCreator, metaCreator }) => createAction(`${typePrefix}/${type}`, getCreatorForType(type, payloadCreator), getCreatorForType(type, metaCreator));

export default function extendRoutine(routine, types = [], payloadCreator, metaCreator){
  const triggerType = routine.toString();
  const typePrefix = triggerType.substring(0, triggerType.lastIndexOf('/'));
  return types.reduce(
    (result, stage) => {
      const actionCreator = createActionCreator({ type: stage, typePrefix, payloadCreator, metaCreator });
      return Object.assign(result, {
        [stage.toLowerCase()]: actionCreator,
        [stage.toUpperCase()]: actionCreator.toString(),
      });
    },
    routine
  );
}
