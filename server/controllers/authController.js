const usersDB = {
	users: require('../model/users.json'),
}

const handleLogin = async (req, res) => {
	console.log(req.body);
	const { login, password } = req.body;

	if (!login || !password) {
		return res.status(400).json({ 'message': 'Username and password are required.' });
	}

	const foundUser = usersDB.users.find(user => user.username === login);

	console.log(foundUser)


	if (!foundUser) {
		return res.status(401).json({ 'message': 'This user does not exist' });
	}

	if (password === foundUser.password) {
		res.json({ 'success': `User ${ login } is logged in!` });
	} else {
		res.status(401).json({ 'message': 'Incorrect password' });
	}
}

module.exports = { handleLogin };
