const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();
const usersDB = { users: require('../model/users.json') }

const handleLogin = async (req, res) => {
	const { login, password } = req.body;

	if (!login || !password) {
		return res.status(400).json({ 'message': 'Username and password are required.' });
	}

	const foundUser = usersDB.users.find(user => user.username === login);

	if (!foundUser) {
		return res.status(401).json({ 'message': 'This user does not exist' });
	}

	if (password === foundUser.password) {
		const accessToken = jwt.sign(
			{
				'username': foundUser.username
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '30s',
			}
		);

		const refreshToken = jwt.sign(
			{
				'username': foundUser.username
			},
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: '1d',
			}
		);

		// we are not using a real database, so we need to update the user in json file
		const otherUsers = usersDB.users.filter(user => user.username !== foundUser.username);
		const updatedUser = { ...foundUser, refreshToken };

		usersDB.users = [ ...otherUsers, updatedUser ];

		await fsPromises.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			// one day
			maxAge: 1000 * 60 * 60 * 24,
			sameSite: 'none',
			secure: true,
		});

		res.json({
			'accessToken': accessToken,
		});
	} else {
		res.status(401).json({ 'message': 'Incorrect password' });
	}
}

module.exports = { handleLogin };
