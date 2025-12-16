// this function is called by  by UseSelector() to get the current state or the user
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectErrorLogin = (state) => state.user.errorSignIn;
export const selectLoginSuccess = (state) => state.user.loginSuccess;
export const selectErrorSignUP = (state) => state.user.errorSignUP;
export const selectUserCreationSuccess = (state) =>
  state.user.successUserCreation;
export const selectUserCreated = (state) => state.user.currentCreatedUser;
