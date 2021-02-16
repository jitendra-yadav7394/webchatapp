import Http from './http';

class ChatServices {
	static async authenticate() {
		await localStorage.getItem('token');
	}

	static async useGetGlobalMessages() {
		return Http.post('');
	}
	static async useSendGlobalMessage() {
		return Http.post('');
	}
	static async useGetConversationMessages() {
		return Http.post('');
	}
	static async useSendConversationMessage() {
		return Http.post('');
	}

	static async useGetConversationMessages() {
		return Http.get('/users');
	}

	static async login(input) {
		return Http.post('/user/login', { ...input });
	}

	static async signup(input) {
		return Http.post('/user/register', { ...input });
	}

	static async logout() {
		return Http.post('user/logout', {});
	}
}

export default ChatServices;
