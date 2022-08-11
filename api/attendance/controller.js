const moment = require('moment');
const mongoose = require('mongoose');
const Attendance = require('./model');

const isObjectId = mongoose.Types.ObjectId.isValid;

module.exports = {
  addAttendance: async (req, res) => {
    const { title, startTime, endTime, startDate, endDate } = req.body;

    const start = moment(`${startDate}T${startTime}`);
    const end = moment(`${endDate}T${endTime}`);

    await Attendance.create({
      title,
      start,
      end,
    })
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch((e) => {
        res.status(500).json({ error: true, code: 500, message: e.message });
      });
  },
  updateAttendance: async (req, res) => {
    const { id } = req.params;
    const { title, startTime, endTime, startDate, endDate } = req.body;

    if (!isObjectId(id)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id presensi tidak valid!',
      });
    }

    const start = moment(`${startDate}T${startTime}`);
    const end = moment(`${endDate}T${endTime}`);

    return Attendance.findByIdAndUpdate(id, {
      title,
      start,
      end,
    })
      .then(async (r) => {
        Attendance.findById(r._id).then((response) =>
          res.status(200).json({ error: false, code: 200, data: response })
        );
      })
      .catch(() => {
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Id presensi tidak tidak ditemukan!',
        });
      });
  },
  deleteAttendance: async (req, res) => {
    const { id } = req.params;

    if (!isObjectId(id)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id presensi tidak valid!',
      });
    }

    return Attendance.findByIdAndDelete(id)
      .then(async (r) => {
        if (r) {
          res.status(200).json({ error: false, code: 200, data: r });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Id presensi tidak tidak ditemukan!',
        });
      });
  },
};
