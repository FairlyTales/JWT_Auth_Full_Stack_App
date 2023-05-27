import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';

const Login = () => {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const userRef = useRef();
	const errRef = useRef();

	const [ login, setLogin ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setErrorMessage('');
	}, [ login, password ])

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const response = await api.post('/auth',
				JSON.stringify({ login, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			);

			const accessToken = response?.data?.accessToken;
			api.defaults.headers.common['Authorization'] = `Bearer ${ accessToken }`;

			setAuth({ user: login, pwd: password, accessToken });
			setLogin('');
			setPassword('');
			navigate('/home');
		} catch (error) {
			setErrorMessage(error.response?.data?.message);
			errRef.current.focus();
		}
	}

	const handleGoToHome = () => {
		navigate('/home');
	}

	return (
		<section>
			<p
				ref={ errRef }
				className={ errorMessage ? "errorMessage" : "offscreen" }
				aria-live="assertive"
			>
				{ errorMessage }
			</p>

			<h1>Sign In</h1>

			<form onSubmit={ handleSubmit }>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					ref={ userRef }
					autoComplete="off"
					onChange={ (e) => setLogin(e.target.value) }
					value={ login }
					required
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					onChange={ (e) => setPassword(e.target.value) }
					value={ password }
					required
				/>

				<button>Sign In</button>

			</form>

			<button onClick={ handleGoToHome }>Go to home page without logging</button>
		</section>
	)
}

export default Login
