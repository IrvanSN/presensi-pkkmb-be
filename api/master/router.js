const express = require('express');
const { signIn, addMaster } = require('./controller');

const router = express.Router();

router.post('/add', addMaster);
router.post('/signin', signIn);

module.exports = router;
