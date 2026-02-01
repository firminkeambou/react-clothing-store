//import { takeLatest, all, call, put } from 'redux-saga/effects';
import { takeLatest, all, call, put } from 'typed-redux-saga/macro'; // typed-redux-saga/macro  instead of typed-redux-saga because we want to leverage babel plugin
import USER_ACTION_TYPES from './user.action-types';
import {
  SignInFailed,
  SignInSuccess,
  createUserEmailPasswordFailed,
  createUserEmailPasswordSuccess,
  signoutSuccess,
  signoutStart,
  signoutFailed,
  EMailSignInStart,
  CreateUserEmailPasswordStart,
  //createUserEmailPasswordStart,
} from './user.action';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup, //return a promise
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  auth,
} from '../../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';
import { AdditionalInformation } from '../../../utils/firebase/firebase.utils.types';
import { AuthError } from 'firebase/auth';

//due to saga, every "yield"  becomes "yield*"
export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation //this parameter is optional
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth, //store the user in a local database table
      userAuth,
      additionalDetails
    ); // call effect is used to call a function with parameters as well

    //console.log('userSnapShot', userSnapshot); // content userId
    //console.log('userSnapShot.data', userSnapshot.data()); // doesn't content userid
    if (userSnapshot) {
      yield* put(
        SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) //userSnapshot.id because id belongs to userSnapshot ogject itself but not in userSnapshot.data()
      );
    }
  } catch (error) {
    yield* put(SignInFailed(error as AuthError));
  }
}
//worker for "CHECK_USER_SESSION"
export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth); // userAuth === parameter
  } catch (error) {
    yield* put(SignInFailed(error as AuthError));
  }
}

////////
//////=========================================
//worker for "CREATE_USER_EMAIL_PASSWORD_START"
export function* createUserEmailPassword({
  payload: { email, password, displayName },
}: CreateUserEmailPasswordStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      //if (!user) return;

      //const successResult = true;
      // if the user document already exists, it will update the existing document with the new data given that onAuthStateChangedListener will have created the user document reference by the time we get here
      // console.log('aristide displayName', displayName);
      yield* call(createUserDocumentFromAuth, user, { displayName });
      yield* put(createUserEmailPasswordSuccess(email, displayName));
      //the following line dealt with the fact that firebase automatically connects after creating a user, we disconnect it as i don't want this behavior, otherwise , I will comment this out
      yield* put(signoutStart()); // because it's a function that return an object, we should use the closing parantheses, we don't any created user to remain sign in
    }
    //yield call(isUserAuthenticated);
    //console.log('keambou authhh++++++++++______', {  createdAt,  displayName,  email,      id: uid,    });
    //yield call(getSnapshotFromUserAuth, userAuth); // userAuth === parameter
  } catch (error) {
    //const failedResult = false;
    yield* put(createUserEmailPasswordFailed(error as AuthError));
  }
}

//watchers for "CREATE_USER_EMAIL_PASSWORD_START" ;isSignInWithGooglePopup
export function* onCreatingUserEmailPasswordStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_START,
    createUserEmailPassword
  );
}

export function* onCreatingUserEmailPasswordSuccess() {
  yield* takeLatest(
    USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_START,
    createUserEmailPassword
  );
}
//////==============END==============================
//worker for "EMAIL_SIGN_IN_START"
export function* signInWithEmail({
  payload: { email, password },
}: EMailSignInStart) {
  // destructing "action" to get the payload, and from the payload, getting {email,password}
  try {
    // the call of a function  with parameters  (email,password)
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      // this additional check helps us to deal with "undefined type"
      //console.log('keambou authhh++++++++++______', {  createdAt,  displayName,  email,      id: uid,    });
      //storing user in our local table
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user); // userAuth === parameter
    }
  } catch (error) {
    yield* put(SignInFailed(error as AuthError));
  }
}
//worker for "GOOGLE_SIGN_IN_START"
export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    // if (!userAuth) return;
    // old code by myself
    /*const createdAt = userAuth.user.metadata.createdAt;
    const { uid, displayName, email } = userAuth.user;
    yield put(
      SignInSuccess({
        createdAt,
        displayName,
        email,
        id: uid,
      })
    );*/
    //yield call(isUserAuthenticated);
    //console.log('keambou authhh++++++++++______', {  createdAt,  displayName,  email,      id: uid,    });
    yield* call(getSnapshotFromUserAuth, user); // userAuth === parameter
  } catch (error) {
    yield* put(SignInFailed(error as AuthError));
  }
}

//Worker signOut

export function* signOutWorker() {
  try {
    yield* call(signOutUser, auth); // possible other signature ; call(signOutUser); will still work
    yield* put(signoutSuccess());
  } catch (error) {
    console.log(error);
    yield* put(signoutFailed(error as Error));
  }
}

//watchers for "GOOGLE_SIGN_IN_START" ;isSignInWithGooglePopup
export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

//as soon as USER_ACTION_TYPES.CHECK_USER_SESSION is fired, isUserAuthenticated is fired
//watchers for "CHECK_USER_SESSION" ;isUserAuthenticated

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
//watchers for "EMAIL_SIGN_IN_START" ;
export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail); // this call passes
  // "action" as a parameter  to "signInWithEmail"(action), therefore, the payload
}

//watchers for "SIGN_OUTSTART" ;
export function* onSignOut() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutWorker); // this call passes
  // "action" as a parameter  to "signInWithEmail"(action), therefore, the payload
}

//aggregator function
export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCreatingUserEmailPasswordStart),
    call(onSignOut),
  ]);
}
