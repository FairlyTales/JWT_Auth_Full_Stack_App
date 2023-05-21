const express = require('express');
const router = express.Router();
const protectedDataController = require('../controllers/protectedDataController');

router.route('/')
	.get(protectedDataController.getUsers);

module.exports = router;
