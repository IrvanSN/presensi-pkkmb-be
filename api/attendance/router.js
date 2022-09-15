const express = require('express');
const {
  addAttendance,
  updateAttendance,
  deleteAttendance,
  getAllAttendance,
  getAttendanceById,
  countStatus,
  exportAttendanceData,
} = require('./controller');
const { singleAuth } = require('../../middleware/singleAuth');

const router = express.Router();

router.get('/count-status/:attendanceId', singleAuth, countStatus);
router.get('/:id/export/csv', singleAuth, exportAttendanceData);
router.get('/all', singleAuth, getAllAttendance);
// router.get('/:id', getAttendanceById);
// router.post('/add', addAttendance);
// router.put('/:id/update', updateAttendance);
// router.delete('/:id/delete', deleteAttendance);

module.exports = router;
