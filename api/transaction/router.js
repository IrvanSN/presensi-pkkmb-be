const express = require('express');
const {
  addTransaction,
  updateStatusTransaction,
  deleteTransaction,
} = require('./controller');

const router = express.Router();

router.post('/add', addTransaction);
router.put('/:id/update', updateStatusTransaction);
router.delete('/:id/delete', deleteTransaction);

module.exports = router;
