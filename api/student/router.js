const express = require('express');
const {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudent,
  getStudentById,
} = require('./controller');

const router = express.Router();

router.get('/all', getAllStudent);
router.get('/:id', getStudentById);
router.post('/add', addStudent);
router.put('/:id/update', updateStudent);
router.delete('/:id/delete', deleteStudent);

module.exports = router;
