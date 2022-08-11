const express = require('express');
const {
  addTransaction,
  updateStatusTransaction,
  deleteTransaction,
  getTransactionById,
} = require('./controller');

const router = express.Router();

router.get('/:id', getTransactionById);
router.post('/add', addTransaction);
router.put('/:id/update', updateStatusTransaction);
router.delete('/:id/delete', deleteTransaction);

module.exports = router;
