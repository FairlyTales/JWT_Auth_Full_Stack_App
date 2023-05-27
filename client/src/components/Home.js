import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { api } from "../api/axios";

const Home = () => {
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const [ dataReceived, setDataReceived ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');

	const handleGetData = async () => {
		try {
			await api.get('/protected');

			setDataReceived(true);
		} catch (e) {
			setDataReceived(false);
			setErrorMessage(e?.response?.statusText);
		}
	}

	const logout = async () => {
		setAuth({});
		api.defaults.headers.common['Authorization'] = '';
		navigate('/login');
	}

	return (
		<section>
			<h1>Home</h1>
			<br />
			<p>You are logged in!</p>
			<br />

			<p className={ dataReceived ? "message" : "offscreen" }>
				Protected data received
			</p>

			<p className={ errorMessage ? "errorMessage" : "offscreen" }>
				{ errorMessage }
			</p>

			<div className="flexGrow">
				<button onClick={ handleGetData }>Request protected data</button>
			</div>

			<div className="flexGrow">
				<button onClick={ logout }>Sign Out</button>
			</div>
		</section>
	)
}

export default Home
