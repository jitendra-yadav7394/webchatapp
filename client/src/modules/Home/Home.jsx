import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import Container from '@material-ui/core/Container';

import history from '../../utils/history';
import Login from '../Login';
import Register from '../Register';
import { from } from 'rxjs';
// import { authenticationService } from '../Services/authenticationService';

const Home = () => {
	const { isLoggedIn, user } = useSelector(getUser);
	const [page, setPage] = useState('login');

	// useEffect(() => {
	//     if (authenticationService.currentUserValue) {
	//         history.push('/chat');
	//     }
	// }, []);

	const handleClick = (location) => {
		setPage(location);
	};

	let Content;

	if (page === 'login') {
		Content = <Login handleClick={handleClick} />;
	} else {
		Content = <Register handleClick={handleClick} />;
	}

	return (
		<Container component="main" maxWidth="xs">
			{Content}
		</Container>
	);
};

export default Home;
