const express = require('express');
const router = express.Router();
const protectedDataController = require('../controllers/protectedDataController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
	.get(verifyJWT, protectedDataController.getProtectedData);

module.exports = router;
