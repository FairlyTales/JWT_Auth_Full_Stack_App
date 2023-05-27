import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Routes>
			<Route path="/" element={ <Layout /> }>
				<Route path="login" element={ <Login /> } />

				<Route path="/home" element={ <Home /> } />
			</Route>
		</Routes>
	);
}

export default App;
