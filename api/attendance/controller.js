const moment = require('moment');
const Attendance = require('./model');

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
      .catch(() => {
        res.status(500).json({ error: true, code: 500, message: 'Error' });
      });
  },
  updateAttendance: async (req, res) => {
    const { id } = req.params;
    const { title, startTime, endTime, startDate, endDate } = req.body;

    const start = moment(`${startDate}T${startTime}`);
    const end = moment(`${endDate}T${endTime}`);

    await Attendance.findByIdAndUpdate(id, {
      title,
      start,
      end,
    })
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() => {
        res.status(500).json({ error: true, code: 500, message: 'Error' });
      });
  },
  deleteAttendance: async (req, res) => {
    const { id } = req.params;

    await Attendance.findByIdAndDelete(id)
      .then(async (r) => {
        if (r) {
          res.status(200).json({ error: false, code: 200, data: r });
        }
      })
      .catch(() => {
        res.status(500).json({ error: true, code: 500, message: 'Error' });
      });
  },
};
