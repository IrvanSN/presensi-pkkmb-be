const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    transaction: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
