const express = require('express');
const {
  updateStatusTransaction,
  deleteTransaction,
  getTransactionById,
  transactionIn,
  transactionOut,
  getAllTransactionFromAttendance,
} = require('./controller');

const router = express.Router();

router.get(
  '/from/student/:studentName/attendance/:attendanceId',
  getAllTransactionFromAttendance
);
router.get('/:id', getTransactionById);
router.post('/in', transactionIn);
router.put('/out', transactionOut);
router.put('/:id/update', updateStatusTransaction);
router.delete('/:id/delete', deleteTransaction);

module.exports = router;
