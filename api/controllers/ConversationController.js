module.exports = {
	list: (req, res) => {
		let from = mongoose.Types.ObjectId(req.jwtUser.id);
		Conversation.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'recipients',
					foreignField: '_id',
					as: 'recipientObj',
				},
			},
		])
			.match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } })
			.project({
				'recipientObj.password': 0,
				'recipientObj.__v': 0,
				'recipientObj.date': 0,
			})
			.exec((err, conversations) => {
				if (err) {
					console.log(err);
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ message: 'Failure' }));
					res.sendStatus(500);
				} else {
					res.send(conversations);
				}
			});
	},

	filterData: (req, res) => {
		let user1 = mongoose.Types.ObjectId(req.jwtUser.id);
		let user2 = mongoose.Types.ObjectId(req.query.userId);
		Message.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'to',
					foreignField: '_id',
					as: 'toObj',
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'from',
					foreignField: '_id',
					as: 'fromObj',
				},
			},
		])
			.match({
				$or: [{ $and: [{ to: user1 }, { from: user2 }] }, { $and: [{ to: user2 }, { from: user1 }] }],
			})
			.project({
				'toObj.password': 0,
				'toObj.__v': 0,
				'toObj.date': 0,
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
};

// router.get('/conversations');

// // Get messages from conversation
// // based on to & from
// router.get('/conversations/query');
