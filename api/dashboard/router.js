const express = require('express');
const { generateAttendanceStatusCount } = require('./controller');

const router = express.Router();

router.get('/count-attendance-status/:id', generateAttendanceStatusCount);

module.exports = router;
