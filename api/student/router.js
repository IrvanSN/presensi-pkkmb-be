const express = require('express');
const {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudent,
  getStudentById,
} = require('./controller');
const { kafasAuth } = require('../../middleware/kafasAuth');

const router = express.Router();

router.get('/all', kafasAuth, getAllStudent);
router.get('/:id', getStudentById);
router.post('/add', addStudent);
router.put('/:id/update', updateStudent);
router.delete('/:id/delete', deleteStudent);

module.exports = router;
