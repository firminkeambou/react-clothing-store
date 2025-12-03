// custom middleware
export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);
  console.log('action type:', action.type);
  console.log('payload:', action.payload);
  console.log('current state:', store.getState());
  next(action); // pass the action to the next middleware or reducer, which will then run. if it's a root reducer for example, it will get executed
  console.log('next state:', store.getState());
};
//end custom middleware
