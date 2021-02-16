import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { loginAction } from '../../actions/UserActions';
import styles from './styles';

const LoginContainer = (props) => {
	const classes = styles();

	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const dispatch = useDispatch();

	const login = (e) => {
		// e.preventDefault();
		dispatch(loginAction({ username, password }));
	};

	return (
		<div className={classes.paper}>
			<Grid container>
				<Grid item>
					<Typography component="h1" variant="h5" align="center">
						Sign in
					</Typography>
					<form className={classes.form}>
						<TextField
							id="username"
							className={classes.textField}
							name="username"
							label="Username"
							fullWidth={true}
							variant="outlined"
							margin="normal"
							required={true}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							id="password"
							className={classes.textField}
							name="password"
							label="Password"
							fullWidth={true}
							variant="outlined"
							margin="normal"
							required={true}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
						/>
						<Button
							fullWidth={true}
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={(e) => login(e)}
						>
							Login
						</Button>
					</form>
				</Grid>
				<Grid item xs={9}>
					<Typography>
						<Link onClick={() => props.handleClick('register')} href="#">
							Don't have an account?
						</Link>
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default LoginContainer;
