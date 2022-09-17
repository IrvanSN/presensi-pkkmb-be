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
const { masterAuth } = require('../../middleware/masterAuth');
const { singleAuth } = require('../../middleware/singleAuth');

const router = express.Router();

router.get(
  '/:studentName/from/attendance/:attendanceId',
  singleAuth,
  getAllStudentFromAttendance
);
router.post('/all/from/group', masterAuth, getAllStudentFromGroup);
router.get('/count/from/group', masterAuth, getStudentCountFromGroup);
router.post('/add', masterAuth, addStudent);
router.put('/:id/update', masterAuth, updateStudent);
router.delete('/:id/delete', singleAuth, deleteStudent);
// router.get('/all', masterAuth, getAllStudent);
// router.get('/:id', getStudentById);

module.exports = router;
