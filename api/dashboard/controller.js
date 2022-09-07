const mongoose = require('mongoose');
const Attendance = require('../attendance/model');

const isObjectId = mongoose.Types.ObjectId.isValid;

module.exports = {
  generateAttendanceStatusCount: async (req, res) => {
    const { id } = req.params;

    if (!isObjectId(id)) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id presensi tidak valid!',
      });
    }

    const attendanceData = await Attendance.findById(id).populate(
      'transaction'
    );

    if (!attendanceData) {
      return res.status(500).json({
        error: true,
        code: 4002,
        message: 'Id presensi tidak valid!',
      });
    }

    const hadir = attendanceData.transaction.filter(
      (item) => item.status === 'Hadir'
    ).length;
    const izin = attendanceData.transaction.filter(
      (item) => item.status === 'Izin'
    ).length;
    const sakit = attendanceData.transaction.filter(
      (item) => item.status === 'Sakit'
    ).length;
    const alpa = attendanceData.transaction.filter(
      (item) => item.status === 'Alpa'
    ).length;

    return res
      .status(200)
      .json({ error: false, code: 200, data: { hadir, izin, sakit, alpa } });
  },
};
