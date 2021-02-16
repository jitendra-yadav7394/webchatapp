const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');

module.exports = {
	list: (req, res) => {
		try {
			let id = req.jwtUser.id;
			console.log(jwtUser.id, 'user id');

			User.aggregate()
				.match({ _id: { $not: { $eq: id } } })
				.project({
					password: 0,
					__v: 0,
					date: 0,
				})
				.exec((err, users) => {
					if (err) {
						console.log(err);
						res.setHeader('Content-Type', 'application/json');
						res.end(JSON.stringify({ message: 'Failure' }));
						res.sendStatus(500);
					} else {
						res.send(users);
					}
				});
		} catch (err) {
			console.log(err);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ message: 'Unauthorized' }));
			res.sendStatus(401);
		}
	},

	register: async (req, res) => {
		const input = req.body;
		// Form validation
		const { errors, isValid } = validateRegisterInput(input);
		// Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		User.findOne({ username: input.username })
			.then((user) => {
				if (user) {
					return res.status(400).json({ message: 'Username already exists' });
				} else {
					const newUser = new User({ ...input });
					console.log(newUser);
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;
							console.log(newUser, 'hashed');
							newUser.save().then((user) => {
								console.log(user, 'saved user');
								const payload = {
									id: user.id,
									name: user.name,
								};
								//  Sign token
								jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
									if (err) {
										console.log(err, 'err');
									} else {
										console.log(token, 'token created');
										req.io.sockets.emit('users', user.username);
										console.log('after shocket');
										res.json({
											success: true,
											user: { token: 'Bearer ' + token, name: user.name },
										});
									}
								});
							});
						});
					});
				}
			})
			.catch((err) => console.log(err));
	},

	login: (req, res) => {
		const input = req.body;
		// Form validation
		const { errors, isValid } = validateLoginInput(input);
		// Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const { username, password } = input;
		// Find user by username
		User.findOne({ username }).then((user) => {
			console.log(user, 'user');
			// Check if user exists
			if (!user) {
				return res.status(404).json({ usernamenotfound: 'Username not found' });
			}

			// Check password
			bcrypt.compare(password, user.password).then((isMatch) => {
				// User Matched
				// Create JWT token
				if (isMatch) {
					console.log('passwword matched');
					const payload = {
						id: user.id,
						name: user.name,
					};

					// Sign token
					jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
						if (err) {
							console.log(err, 'err');
						} else {
							console.log(token, 'token created');
							req.io.sockets.emit('users', user.username);
							console.log('after shocket');
							res.json({
								success: true,
								user: {
									token: 'Bearer ' + token,
									name: user.name,
								},
							});
						}
					});
				} else {
					return res.status(400).json({ passwordincorrect: 'Password incorrect' });
				}
			});
		});
	},
};
