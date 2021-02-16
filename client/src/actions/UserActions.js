import userServices from '../services/userServices';
import history from '../utils/history';
// import { saveItem } from '../services/storageServices';

export const actionTypes = {
	CLEAR_STORE: 'CLEAR_STORE',
	LOGIN: 'LOGIN',
	LOGIN_REQUEST: 'LOGIN_REQUEST',
	SIGNUP_REQUEST: 'SIGNUP_REQUEST',
	LOGIN_ERROR: 'LOGIN_ERROR',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
	SIGNUP_ERROR: 'SIGNUP_ERROR',
};

const loginRequest = () => ({
	type: actionTypes.LOGIN_REQUEST,
	payload: null,
});

export const signupRequest = () => {
	// history.push(navigationConstants.signup);
	return {};
};

const loginError = (errors) => ({
	type: actionTypes.LOGIN_ERROR,
	payload: { errors },
});

const signupError = (errors) => ({
	type: actionTypes.LOGIN_ERROR,
	payload: { errors },
});

export const loginSuccess = (user) => ({
	type: actionTypes.LOGIN_SUCCESS,
	payload: { user },
});

export const signupSuccess = (user) => ({
	type: actionTypes.SIGNUP_SUCCESS,
	payload: { user },
});

export const clearStore = () => ({
	type: actionTypes.CLEAR_STORE,
	payload: null,
});

export const loginAction = (data) => async (dispatch) => {
	console.log('loginAction', data);
	dispatch(loginRequest());

	try {
		console.log('before login')
		const response = await userServices.login(data);
		console.log(response, 'response')
		const user = response.user;
		console.log('user===', user);
		await localStorage.setItem('token', user.token);
		global.user = user;
		await dispatch(loginSuccess(user));
		history.push('chat')
	} catch (errors) {
		console.log(errors, 'errors');
		// TODO: Handle error scenario
		dispatch(loginError(errors));
	}
};

export const signupAction = (data) => async (dispatch) => {
	console.log('signupAction', data);
	// dispatch(signupRequest());

	try {
		const response = await userServices.signup(data);
		console.log('user===', response.user);
		await localStorage.setItem('token', response.user.token);
		dispatch(signupSuccess(response.user));
		history.push('chat')
		// navigate(navigationConstants.dashboard);
	} catch (errors) {
		// TODO: Handle error scenario
		dispatch(signupError(errors));
	}
};

export const logout = () => async (dispatch) => {
	try {
		await userServices.logout();
	} finally {
		dispatch(clearStore());
	}
};
