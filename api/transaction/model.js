const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    student: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      nim: {
        type: String,
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
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
    },
    // assignee: {
    //   name: {
    //     type: String,
    //   },
    //   nim: {
    //     type: String,
    //   },
    // },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
