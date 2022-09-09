const mongoose = require('mongoose');
const moment = require('moment');
const Transaction = require('./model');
const Student = require('../student/model');
const Attendance = require('../attendance/model');
const Kafas = require('../kafas/model');

const isObjectId = mongoose.Types.ObjectId.isValid;

module.exports = {
  getAllTransactionFromAttendance: async (req, res) => {
    const { studentName, attendanceId } = req.params;
    const regex = new RegExp(studentName);

    if (!isObjectId(attendanceId)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id tidak valid!',
      });
    }

    await Transaction.find({ 'student.name': { $regex: regex, $options: 'i' } })
      .then((r) => {
        const matched = r.filter(
          (item) =>
            item.attendance._id.toString() === attendanceId &&
            item.status === 'Hadir'
        );

        res.status(200).json({ error: false, code: 200, data: matched });
      })
      .catch((e) =>
        res.status(500).json({
          error: true,
          code: 5000,
          message: e.message,
        })
      );
  },
  getTransactionById: async (req, res) => {
    const { id } = req.params;

    if (!isObjectId(id)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id camaba tidak valid!',
      });
    }

    await Transaction.findById(id)
      .then((r) => {
        if (!r) {
          res.status(500).json({
            error: true,
            code: 5000,
            message: 'Data transaksi tidak ditemukan!',
          });
        } else {
          res.status(200).json({ error: false, code: 200, data: r });
        }
      })
      .catch(() =>
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Data transaksi tidak ditemukan!',
        })
      );
  },
  transactionIn: async (req, res) => {
    const { studentId, attendanceId, kafasId, status } = req.body;
    const timeNow = moment();

    if (!isObjectId(studentId)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id camaba tidak valid!',
      });
    }

    if (!isObjectId(attendanceId)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id presensi tidak valid!',
      });
    }

    if (!isObjectId(kafasId)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id kafas tidak valid!',
      });
    }

    const studentData = await Student.findById(studentId).then(
      (response) => response
    );
    const attendanceData = await Attendance.findById(attendanceId)
      .populate('transaction')
      .then((response) => response);
    const kafasData = await Kafas.findById(kafasId).then(
      (response) => response
    );

    if (!(studentData && attendanceData && kafasData)) {
      return res.status(500).json({
        error: true,
        code: 4001,
        message: 'Data camaba, data presensi, dan data kafas tidak ditemukan!',
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
      'student.name': studentData.name,
      'attendance._id': attendanceData._id,
      'attendance.title': attendanceData.title,
      'attendance.date': attendanceData.date,
      'assignee.name': kafasData.name,
      'assignee.username': kafasData.username,
      in: timeNow,
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
              .catch((e) =>
                res
                  .status(500)
                  .json({ error: true, code: 5000, message: e.message })
              );
          })
          .catch((e) =>
            res
              .status(500)
              .json({ error: true, code: 5000, message: e.message })
          );
      }
    });
  },
  transactionOut: async (req, res) => {
    const { studentId, attendanceId } = req.body;

    if (!isObjectId(studentId)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id camaba tidak valid!',
      });
    }

    if (!isObjectId(attendanceId)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id presensi tidak valid!',
      });
    }

    const studentData = await Student.findById(studentId).then(
      (response) => response
    );
    const attendanceData = await Attendance.findById(attendanceId)
      .populate('transaction')
      .then((response) => response);
    const transactionData = attendanceData.transaction.find((data) =>
      data.student._id.equals(studentData._id)
    );

    if (!studentData || !attendanceData || !transactionData) {
      return res.status(500).json({
        error: true,
        code: 5000,
        message: 'Belum melakukan absen masuk!',
      });
    }

    Transaction.findByIdAndUpdate(transactionData._id, { out: moment() })
      .then(async (r) => {
        if (!r) {
          res.status(500).json({
            error: true,
            code: 5000,
            message: 'Belum melakukan absen masuk!',
          });
        }

        Transaction.findById(r._id).then((response) =>
          res.status(200).json({ error: false, code: 200, data: response })
        );
      })
      .catch(() => {
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Id transaksi tidak ditemukan!',
        });
      });
  },
  updateStatusTransaction: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    Transaction.findByIdAndUpdate(id, { status })
      .then(async (r) => {
        Transaction.findById(r._id).then((response) =>
          res.status(200).json({ error: false, code: 200, data: response })
        );
      })
      .catch(() => {
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Id transaksi tidak ditemukan!',
        });
      });
  },
  deleteTransaction: async (req, res) => {
    const { id } = req.params;

    Transaction.findByIdAndDelete(id)
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() => {
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Id transaksi tidak ditemukan!',
        });
      });
  },
};
