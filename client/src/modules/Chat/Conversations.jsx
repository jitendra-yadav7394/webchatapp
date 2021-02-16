import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LanguageIcon from '@material-ui/icons/Language';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client';

import chatService from '../../services/chatService';
// import { authenticationService } from '../Services/authenticationService';

const useStyles = makeStyles((theme) => ({
	subheader: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
	},
	globe: {
		backgroundColor: theme.palette.primary.dark,
	},
	subheaderText: {
		color: theme.palette.primary.dark,
	},
	list: {
		maxHeight: '80vh',
		overflowY: 'auto',
	},
}));

const Conversations = (props) => {
	const classes = useStyles();
	const [conversations, setConversations] = useState([]);
	const [newConversation, setNewConversation] = useState(null);
	// const getConversations = chatService.useGetConversations();

	// Returns the recipient name that does not
	// belong to the current user.
	const handleRecipient = (recipients) => {
		for (let i = 0; i < recipients.length; i++) {
			if (
				recipients[i].username !== 'null'
				// authenticationService.currentUserValue.username
			) {
				return recipients[i];
			}
		}
		return null;
	};

	// useEffect(() => {
	// 	getConversations().then((res) => setConversations(res));
	// }, [newConversation]);

	// useEffect(() => {
	// 	let socket = socketIOClient(process.env.REACT_APP_API_URL);
	// 	socket.on('messages', (data) => setNewConversation(data));

	// 	return () => {
	// 		socket.removeListener('messages');
	// 	};
	// }, []);

	return (
		<List className={classes.list}>
			<TextField />
			<Divider />

			{conversations && (
				<React.Fragment>
					{conversations.map((c) => (
						<ListItem
							className={classes.listItem}
							key={c._id}
							button
							// onClick={() => {
							// 	props.setUser(handleRecipient(c.recipientObj));
							// 	props.setScope(handleRecipient(c.recipientObj).name);
							// }}
						>
							<ListItemAvatar>
								<Avatar>AD</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={handleRecipient(c.recipientObj).name}
								secondary={<React.Fragment>{c.lastMessage}</React.Fragment>}
							/>
						</ListItem>
					))}
				</React.Fragment>
			)}
		</List>
	);
};

export default Conversations;
