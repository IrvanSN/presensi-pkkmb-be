const express = require('express');
const { generateAttendanceStatusCount } = require('./controller');
const { singleAuth } = require('../../middleware/singleAuth');

const router = express.Router();

router.get(
  '/count-attendance-status/:id',
  singleAuth,
  generateAttendanceStatusCount
);

module.exports = router;
