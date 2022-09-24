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
const { singleAuth } = require('../../middleware/singleAuth');

const router = express.Router();

router.get(
  '/:studentName/from/attendance/:attendanceId',
  singleAuth,
  getAllStudentFromAttendance
);
router.post('/all/from/group', singleAuth, getAllStudentFromGroup);
router.get('/count/from/group', singleAuth, getStudentCountFromGroup);
router.post('/add', singleAuth, addStudent);
router.put('/:id/update', singleAuth, updateStudent);
router.delete('/:id/delete', singleAuth, deleteStudent);
// router.get('/all', masterAuth, getAllStudent);
// router.get('/:id', getStudentById);

module.exports = router;
