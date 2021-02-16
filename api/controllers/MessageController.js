const express = require('express');
const mongoose = require('mongoose');

const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const GlobalMessage = require('../models/GlobalMessage');

// Get global messages

module.exports = {
	globalMsg: (req, res) => {
		GlobalMessage.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'from',
					foreignField: '_id',
					as: 'fromObj',
				},
			},
		])
			.project({
				'fromObj.password': 0,
				'fromObj.__v': 0,
				'fromObj.date': 0,
			})
			.exec((err, messages) => {
				if (err) {
					console.log(err);
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ message: 'Failure' }));
					res.sendStatus(500);
				} else {
					res.send(messages);
				}
			});
	},

	add: (req, res) => {
		let message = new GlobalMessage({
			from: req.jwtUser.id,
			body: req.body.body,
		});

		req.io.sockets.emit('messages', req.body.body);

		message.save((err) => {
			if (err) {
				console.log(err);
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ message: 'Failure' }));
				res.sendStatus(500);
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ message: 'Success' }));
			}
		});
	},
	addPrivateMessage: (req, res) => {
		let from = mongoose.Types.ObjectId(req.jwtUser.id);
		let to = mongoose.Types.ObjectId(req.body.to);

		Conversation.findOneAndUpdate(
			{
				recipients: {
					$all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
				},
			},
			{
				recipients: [req.jwtUser.id, req.body.to],
				lastMessage: req.body.body,
				date: Date.now(),
			},
			{ upsert: true, new: true, setDefaultsOnInsert: true },
			function (err, conversation) {
				if (err) {
					console.log(err);
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ message: 'Failure' }));
					res.sendStatus(500);
				} else {
					let message = new Message({
						conversation: conversation._id,
						to: req.body.to,
						from: req.jwtUser.id,
						body: req.body.body,
					});

					req.io.sockets.emit('messages', req.body.body);

					message.save((err) => {
						if (err) {
							console.log(err);
							res.setHeader('Content-Type', 'application/json');
							res.end(JSON.stringify({ message: 'Failure' }));
							res.sendStatus(500);
						} else {
							res.setHeader('Content-Type', 'application/json');
							res.end(
								JSON.stringify({
									message: 'Success',
									conversationId: conversation._id,
								})
							);
						}
					});
				}
			}
		);
	},
};

// Get conversations list
 
// Post private message
// router.post('/');

// module.exports = router;
