const express = require('express');
const router = express.Router();

const timestampController = require('../controllers/timestampController');

router.get('/*', timestampController.PARSE_TIMESTAMP);

module.exports = router;