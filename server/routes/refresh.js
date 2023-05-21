const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshAuthController');

router.route('/').get(refreshController.handleRefresh);

module.exports = router;
