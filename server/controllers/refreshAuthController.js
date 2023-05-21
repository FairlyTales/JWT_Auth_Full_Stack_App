const jwt = require('jsonwebtoken');
require('dotenv').config();
const usersDB = { users: require('../model/users.json') }

const handleRefresh = (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.refreshToken) {
		return res.sendStatus(401);
	}

	const refreshToken = cookies.refreshToken;

	const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);

	if (!foundUser) {
		return res.sendStatus(403);
	}

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || decoded.username !== foundUser.username) {
				return res.sendStatus(403);
			}

			const accessToken = jwt.sign(
				{ username: foundUser.username },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30s' }
			);

			res.json({ accessToken });
		}
	)

}

module.exports = { handleRefresh };
