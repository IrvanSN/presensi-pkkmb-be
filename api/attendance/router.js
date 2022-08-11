const express = require('express');
const {
  addAttendance,
  updateAttendance,
  deleteAttendance,
  getAllAttendance,
  getAttendanceById,
} = require('./controller');

const router = express.Router();

router.get('/all', getAllAttendance);
router.get('/:id', getAttendanceById);
router.post('/add', addAttendance);
router.put('/:id/update', updateAttendance);
router.delete('/:id/delete', deleteAttendance);

module.exports = router;
