const express = require('express');
const {
  updateStatusTransaction,
  deleteTransaction,
  getTransactionById,
  transactionIn,
  transactionOut,
  getAllTransactionFromAttendance,
} = require('./controller');
const { singleAuth } = require('../../middleware/singleAuth');

const router = express.Router();

router.get(
  '/from/student/:studentName/attendance/:attendanceId',
  singleAuth,
  getAllTransactionFromAttendance
);
router.post('/in', singleAuth, transactionIn);
router.put('/out', singleAuth, transactionOut);
// router.get('/:id', getTransactionById);
// router.put('/:id/update', updateStatusTransaction);
// router.delete('/:id/delete', deleteTransaction);

module.exports = router;
