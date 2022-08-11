const express = require('express');
const { addStudent, updateStudent, deleteStudent } = require('./controller');

const router = express.Router();

router.post('/add', addStudent);
router.put('/:id/update', updateStudent);
router.delete('/:id/delete', deleteStudent);

module.exports = router;
