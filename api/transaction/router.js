const express = require('express');
const {
  updateStatusTransaction,
  deleteTransaction,
  getTransactionById,
  transactionIn,
  transactionOut,
  getStudentFromTransaction,
} = require('./controller');

const router = express.Router();

router.post('/from/student', getStudentFromTransaction);
router.get('/:id', getTransactionById);
router.post('/in', transactionIn);
router.put('/out', transactionOut);
router.put('/:id/update', updateStatusTransaction);
router.delete('/:id/delete', deleteTransaction);

module.exports = router;
