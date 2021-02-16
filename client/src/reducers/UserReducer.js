import {actionTypes} from '../actions/UserActions';

const initialState = {
  isLoading: false,
  errors: [],
  isLoggedIn: false,
};

const userReducer = (state = initialState, {payload, type}) => {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload.user,
        isLoggedIn: true,
        isLoading: false,
        errors: [],
      };
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        ...payload.user,
        isLoggedIn: false,
        isLoading: false,
        errors: [],
      };
    case actionTypes.LOGIN_REQUEST:
      return {...state, isLoading: true};
    case actionTypes.LOGIN_ERROR:
      return {...state, isLoading: false, errors: payload.errors};
    case actionTypes.CLEAR_STORE:
      return initialState;
    case actionTypes.SIGNUP_SUCCESS:
      return {...state, ...payload.user};
    default:
      return state;
  }
};

export default userReducer;
