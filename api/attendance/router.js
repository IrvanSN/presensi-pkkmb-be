const express = require('express');
const {
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require('./controller');

const router = express.Router();

router.post('/add', addAttendance);
router.put('/:id/update', updateAttendance);
router.delete('/:id/delete', deleteAttendance);

module.exports = router;
