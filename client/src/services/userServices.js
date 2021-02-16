import Http from './http';

class UserServices {
	static async authenticate() {
		await localStorage.getItem('token');
	}

	static async useGetUsers() {
		return Http.get('/users');
	}

	static async login(input) {
		console.log('user calling login');
		return Http.post('/user/login', { ...input });
	}

	static async signup(input) {
		return Http.post('/user/register', { ...input });
	}

	static async logout() {
		return Http.post('user/logout', {});
	}
}

export default UserServices;
