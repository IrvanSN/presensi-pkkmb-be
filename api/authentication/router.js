const express = require('express');
const { singleAuth, verifyToken } = require('./controller');

const router = express.Router();

router.post('/', singleAuth);
router.post('/verify', verifyToken);

module.exports = router;
