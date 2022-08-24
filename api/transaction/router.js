const express = require('express');
const {
  updateStatusTransaction,
  deleteTransaction,
  getTransactionById,
  transactionIn,
  transactionOut,
} = require('./controller');

const router = express.Router();

router.get('/:id', getTransactionById);
router.post('/in', transactionIn);
router.put('/out', transactionOut);
router.put('/:id/update', updateStatusTransaction);
router.delete('/:id/delete', deleteTransaction);

module.exports = router;
