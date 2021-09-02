export function prefixActionTypes(prefix = '') {
  return (actions: { [propName: string]: string }) => {
    Object.keys(actions).forEach(action => {
      actions[action] = prefix + '_' + action;
    });
  };
}
