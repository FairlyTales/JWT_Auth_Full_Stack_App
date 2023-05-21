const usersDB = {
	users: require('../model/users.json'),
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.refreshToken) {
		return res.sendStatus(204);
	}

	const refreshToken = cookies.refreshToken;
	const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);

	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

		return res.sendStatus(204);
	}

	const otherUsers = usersDB.users.filter(user => user.refreshToken !== foundUser.refreshToken);
	const currentUser = { ...foundUser, refreshToken: '' };

	usersDB.users = [ ...otherUsers, currentUser ];

	await fsPromises.writeFile(
		path.join(__dirname, '..', 'model', 'users.json'),
		JSON.stringify(usersDB.users)
	);

	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: 'None',
	});

	res.status(204).json({ message: 'Logged out' });
}

module.exports = { handleLogout }
