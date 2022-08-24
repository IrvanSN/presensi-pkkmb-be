const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vaccine: {
    count: {
      type: Number,
    },
    proof: {
      type: String,
    },
  },
  transaction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
