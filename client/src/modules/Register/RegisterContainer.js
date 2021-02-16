import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { signupAction } from '../../actions/UserActions';
import styles from './styles';

const RegisterContainer = (props) => {
	const classes = styles();

	const [name, setName] = useState(null);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [password2, setPassword2] = useState(null);

	const dispatch = useDispatch();

	const register = () => {
		dispatch(signupAction({ name, username, password2, password }));
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
							id="name"
							className={classes.textField}
							name="name"
							label="Name"
							fullWidth={true}
							variant="outlined"
							margin="normal"
							required={true}
							value={name}
							onChange={(e) => setName(e.target.value)}
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
						<TextField
							id="password2"
							className={classes.textField}
							name="password2"
							label="Confirm Password"
							fullWidth={true}
							variant="outlined"
							margin="normal"
							required={true}
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
							type="password"
						/>
						<Button
							fullWidth={true}
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={register}
						>
							Register
						</Button>
					</form>
				</Grid>
				<Grid item xs={9}>
					<Typography>
						<Link onClick={() => props.handleClick('login')} href="#">
							Already have an account?
						</Link>
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default RegisterContainer;
