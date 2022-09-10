const express = require('express');
const {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudent,
  getStudentById,
  getAllStudentFromAttendance,
  getAllStudentFromGroup,
  getStudentCountFromGroup,
} = require('./controller');
const { kafasAuth } = require('../../middleware/kafasAuth');

const router = express.Router();

router.get(
  '/:studentName/from/attendance/:attendanceId',
  getAllStudentFromAttendance
);
router.post('/all/from/group', getAllStudentFromGroup);
router.get('/count/from/group', getStudentCountFromGroup);
router.get('/all', kafasAuth, getAllStudent);
router.get('/:id', getStudentById);
router.post('/add', addStudent);
router.put('/:id/update', updateStudent);
router.delete('/:id/delete', deleteStudent);

module.exports = router;
