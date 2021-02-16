const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const verify = require('../../utilities/verify-token');

module.exports = function (req, res, next) {
	try {
		jwtUser = jwt.verify(verify(req), keys.secretOrKey);
		req.jwtUser = jwtUser;
		next();
	} catch (err) {
		console.log(err);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ message: 'Unauthorized' }));
		res.sendStatus(401);
	}
};
