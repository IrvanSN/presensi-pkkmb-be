const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    student: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
    },
    attendance: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      title: {
        type: String,
      },
    },
    in: {
      type: Date,
    },
    out: {
      type: Date,
      default: '',
    },
    assignee: {
      name: {
        type: String,
      },
      username: {
        type: String,
      },
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
