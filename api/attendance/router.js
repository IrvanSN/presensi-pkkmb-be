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
// const { masterAuth } = require('../../middleware/masterAuth');

const router = express.Router();

router.get('/count-status/:attendanceId', countStatus);
router.get('/:id/export/csv', exportAttendanceData);
router.get('/all', getAllAttendance);
router.get('/:id', getAttendanceById);
router.post('/add', addAttendance);
router.put('/:id/update', updateAttendance);
router.delete('/:id/delete', deleteAttendance);

module.exports = router;
