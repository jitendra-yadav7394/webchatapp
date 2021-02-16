import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Header from '../Layout/Header';
import ChatBox from './ChatBox';
import Conversations from './Conversations';
import Users from './Users';

const useStyles = makeStyles((theme) => ({
	paper: {
		minHeight: 'calc(100vh - 64px)',
		borderRadius: 0,
	},
	sidebar: {
		zIndex: 8,
	},
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
}));

const Chat = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Header />
			<Grid container>
				<Grid item md={4} className={classes.sidebar}>
					<Paper className={classes.paper} square elevation={5}>
						<Conversations />
					</Paper>
				</Grid>
				<Grid item md={8}>
					<ChatBox />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default Chat;
