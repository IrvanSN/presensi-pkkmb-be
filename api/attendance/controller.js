const mongoose = require('mongoose');
const moment = require('moment');
const Attendance = require('./model');

const isObjectId = mongoose.Types.ObjectId.isValid;

module.exports = {
  countStatus: async (req, res) => {
    const { attendanceId } = req.params;

    await Attendance.findById(attendanceId)
      .populate('transaction')
      .then((r) => {
        const { transaction } = r;
        const hadir = transaction.filter(
          (item) => item.status === 'Hadir'
        ).length;
        const izin = transaction.filter(
          (item) => item.status === 'Izin'
        ).length;
        const sakit = transaction.filter(
          (item) => item.status === 'Sakit'
        ).length;
        const alpa = transaction.filter(
          (item) => item.status === 'Alpa'
        ).length;

        res
          .status(200)
          .json({
            error: false,
            code: 200,
            data: { hadir, izin, sakit, alpa },
          });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  getAllAttendance: async (req, res) => {
    await Attendance.find({})
      .select('_id title date createdAt updatedAt')
      .then((r) => {
        const data = r.map((item) => ({
          _id: item._id,
          title: item.title,
          date: moment(item.date).format(),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));
        res.status(200).json({ error: false, code: 200, data });
      })
      .catch((e) =>
        res.status(500).json({ error: true, code: 5000, message: e.message })
      );
  },
  getAttendanceById: async (req, res) => {
    const { id } = req.params;

    await Attendance.findById(id)
      .populate('transaction')
      .then((r) => {
        if (!r) {
          res.status(500).json({
            error: true,
            code: 5000,
            message: 'Data presensi tidak ditemukan!',
          });
        } else {
          res.status(200).json({ error: false, code: 200, data: r });
        }
      })
      .catch(() =>
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Data presensi tidak ditemukan!',
        })
      );
  },
  addAttendance: async (req, res) => {
    const { title, dateString } = req.body;
    const date = moment(dateString);

    await Attendance.create({
      title,
      date,
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
    const { title, dateString } = req.body;
    const date = moment(dateString);

    if (!isObjectId(id)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id presensi tidak valid!',
      });
    }

    return Attendance.findByIdAndUpdate(id, {
      title,
      date,
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
