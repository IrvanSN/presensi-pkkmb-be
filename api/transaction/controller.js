const mongoose = require('mongoose');
const moment = require('moment');
const Transaction = require('./model');
const Student = require('../student/model');
const Attendance = require('../attendance/model');

const isObjectId = mongoose.Types.ObjectId.isValid;

module.exports = {
  addTransaction: async (req, res) => {
    const { studentId, attendanceId, status } = req.body;

    if (!isObjectId(attendanceId)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Data presensi tidak ditemukan!',
      });
    }

    const studentData = Student.findOne({ nim: studentId });
    const attendanceData =
      Attendance.findById(attendanceId).populate('transaction');

    if (!(studentData || attendanceData)) {
      return res.status(500).json({
        error: true,
        code: 4001,
        message: 'Data camaba atau data presensi tidak ditemukan!',
      });
    }

    if (
      !(
        moment().isSameOrAfter(attendanceData.start) &&
        moment().isSameOrBefore(attendanceData.end)
      )
    ) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: `Absensi anda tidak valid! absensi dibuka pada ${moment(
          attendanceData.start
        ).format('DD MMMM HH:mm')} - ${moment(attendanceData.end).format(
          'DD MMMM HH:mm'
        )}.`,
      });
    }

    const isDuplicateTransaction = attendanceData.transaction.find((data) =>
      data.student._id.equals(studentData._id)
    );

    if (isDuplicateTransaction) {
      return res
        .status(200)
        .json({ error: false, code: 3001, data: isDuplicateTransaction });
    }

    return Transaction.create({
      status,
      'student._id': studentData._id,
      'student.nim': studentData.nim,
      'student.name': studentData.name,
      'attendance._id': attendanceData._id,
      'attendance.title': attendanceData.title,
      'attendance.start': attendanceData.start,
      'attendance.end': attendanceData.end,
    }).then(async (r) => {
      if (r) {
        await Attendance.findByIdAndUpdate(attendanceId, {
          $push: { transaction: r._id },
        })
          .then(async () => {
            await Student.findByIdAndUpdate(studentData._id, {
              $push: { transaction: r._id },
            })
              .then(() =>
                res.status(200).json({ error: false, code: 200, data: r })
              )
              .catch(() =>
                res
                  .status(500)
                  .json({ error: true, code: 500, message: 'Error' })
              );
          })
          .catch(() =>
            res.status(500).json({ error: true, code: 500, message: 'Error' })
          );
      }
    });
  },
};
