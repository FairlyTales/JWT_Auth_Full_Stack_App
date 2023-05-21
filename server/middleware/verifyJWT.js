const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.sendStatus(401);
	}

	console.log(authHeader);

	const authToken = authHeader.split(' ')[1];
	console.log(authToken)

	jwt.verify(
		authToken,
		process.env.ACCESS_TOKEN_SECRET,
		(e, decoded) => {
			if (e) {
				return res.sendStatus(403);
			}

			req.user = decoded.username;

			next();
		}
	)
}

module.exports = verifyJWT;
