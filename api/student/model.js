const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  nim: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  // vaccine: {
  //   first: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   second: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   third: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  transaction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
