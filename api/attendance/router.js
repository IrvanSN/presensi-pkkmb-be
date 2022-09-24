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
const { masterAuth } = require('../../middleware/masterAuth');

const router = express.Router();

router.get('/count-status/:attendanceId', singleAuth, countStatus);
router.get('/:id/export/csv', masterAuth, exportAttendanceData);
router.get('/all', singleAuth, getAllAttendance);
router.post('/add', masterAuth, addAttendance);
// router.get('/:id', getAttendanceById);
// router.put('/:id/update', updateAttendance);
// router.delete('/:id/delete', deleteAttendance);

module.exports = router;
