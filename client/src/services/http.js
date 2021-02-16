import { BASE_URL, METHODS } from '../constants/api';

function joinUrl(url) {
	return BASE_URL + url;
}

// Default Headers
async function getHeaders() {
	// TODO: Include headers if available
	const headers = {
		Accept: '*',
		'Content-Type': 'application/json',
	};

	const token = await localStorage.getItem('token');
	console.log('token==', token);
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	// TODO: Include user toke in logged

	return headers;
}

class Http {
	constructor() {
		// assign base url to local variable
		this.baseurl = BASE_URL;
	}

	static async request(url, method, data) {
		// Get headers before API call
		const headers = await getHeaders();

		// Create options for the API call
		const options = {
			method,
			headers,
		};

		// If data add it in to body
		// Stringfy the body
		if (data != null) {
			options.body = JSON.stringify(data);
		}

		// Return fetch response
		return fetch(url, options).then((res) => {
			console.log(res, 'api data');
			return res.json();
		});
	}

	// Post method
	static async post(url, data = {}) {
        console.log('post call')
		return this.request(joinUrl(url), METHODS.POST, data);
	}

	// Get method
	static async get(url) {
		return this.request(joinUrl(url), METHODS.GET);
	}

	// Update method
	static async update(url, data = {}) {
		return this.request(joinUrl(url), METHODS.PUT, data);
	}

	// Delete method
	static async delete(url) {
		return this.request(joinUrl(url), METHODS.DELETE);
	}
}

export default Http;
