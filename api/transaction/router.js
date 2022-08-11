const express = require('express');
const { addTransaction } = require('./controller');

const router = express.Router();

router.post('/add', addTransaction);

module.exports = router;
