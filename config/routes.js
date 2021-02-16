const user = require('../api/controllers/UserController');
const message = require('../api/controllers/MessageController');
const authToken = require('../api/policies/authToken');
const conversation = require('../api/controllers/ConversationController');
module.exports = (app) => {
	app.get('/', (req, res) => {
		res.send('hello');
	});

	app.get('/api/v1/users', authToken, user.list);
	app.post('/api/v1/user/login', user.login);
	app.post('/api/v1/user/register', user.register);
	// Message routes

	app.get('/api/v1/message/global', authToken, message.globalMsg);
	app.post('/api/v1/message', authToken, message.add);
	app.post('/api/v1/message/private', authToken, message.addPrivateMessage);

	//Conversation routes
	app.get('/api/v1/conversations', authToken, conversation.list);
	app.get('/api/v1/conversations/query', authToken, conversation.filterData);

};

