import { UnknownAction } from 'redux';
// type narrowing is what we will be using to check if we receive a specific type of action
/* this is the signature of a map in general ( group of key,value)
 type map= {
    [extraProps: string]: unknown;
} */
//AC = Action Creator
// in UnknownAction, {type:T} is always a string , type in this case is always a string
//every function in  JavaScript is an Object (like "AC" function)
// the below code means the "Matchable" will have the " action creator  (AC) " body as well
//the below type affects double duty to any action creator that is of Matchable Type
//in fine ,we're here trying to match the received action when dispatched by UI with the action created by an "Action Creator" in a reducer
type Matchable<AC extends () => UnknownAction> = AC & {
  //here, we have kind of restricting "AC type scope", saying "AC" is any function that's going to return "UnknownAction" type; "AC & {}"" means the result should be an action creator and other thing
  type: ReturnType<AC>['type']; // this is how we get the type of the object return by the generic function "AC"
  match(action: UnknownAction): action is ReturnType<AC>; // we are using a predicate function to narrow things down/ narrowing the action received into  ReturnType<AC>; kind of casting. this is the declaration of the function
};

// below is the action creator that has no parameter, her is how it is defined
//overLoading, as you can see it's limited to the declaration of the function, just after that, we will have to define it
export function withMatcher<AC extends () => UnknownAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>; // this declaration means AC should be a function with empty parameter but that returned  a type of UnknownAction

export function withMatcher<
  AC extends (...args: any[]) => UnknownAction & { type: string }
>(actionCreator: AC): Matchable<AC>; // // this declaration means AC should be a function with any number of parameters but that returned  a type of UnknownAction

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type; // this works because actionCreator as a function, it's also view as an object in TypeScript, JavaScript
  return Object.assign(actionCreator, {
    type,
    match(action: UnknownAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};
export type Action<T> = {
  type: T;
};

// overloading createAction<T extends string, P> twice, no more need of the body as it was just set above, only types to return
//"T extends string"  limits  a generic type T to be a string or a string literal
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

//Declaration of the function "createAction" overloaded above. the declaration should always be before the overloaded version of the function
// the following also means you pass the type at the moment you are calling a function
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload }; // no more need of a type as  ; type and payload received their types when they were declared as a parameter
}

/* old version of createAction in plain javaScript
export const createAction = (type, payload) => ({ type, payload });
 */
