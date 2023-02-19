import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // make api request to sign in with email and password
    // change state to reflect user is authenticated
    // handle error
  };
};

const signup = (dispatch) => {
  return ({ email, password }) => {
    // Sign up request
    // change state
    // handle error
  };
};

const signout = (dispatch) => {
  return () => {
    //signout state
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { isSignedIn: false }
);
