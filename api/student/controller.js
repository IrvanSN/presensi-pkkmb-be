const Student = require('./model');

module.exports = {
  getAllStudent: async (req, res) => {
    await Student.find({})
      .then((r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch((e) =>
        res.status(500).json({ error: true, code: 5000, message: e.message })
      );
  },
  getStudentByNIM: async (req, res) => {
    const { id } = req.params;

    await Student.findOne({ nim: id })
      .populate('transaction')
      .then((r) => {
        if (!r) {
          res.status(500).json({
            error: true,
            code: 5000,
            message: 'Data camaba tidak ditemukan!',
          });
        } else {
          res.status(200).json({ error: false, code: 200, data: r });
        }
      })
      .catch(() =>
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Data camaba tidak ditemukan!',
        })
      );
  },
  addStudent: async (req, res) => {
    const { nim, name } = req.body;

    Student.create({ nim, name })
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.status(500).json({
            error: true,
            code: 5001,
            message: `NIM: ${nim} sudah terdaftar di database!`,
          });
        }

        return res.status(500).json({
          error: true,
          code: 5000,
          message: e.message,
        });
      });
  },
  updateStudent: async (req, res) => {
    const { id } = req.params;
    const { nim, name } = req.body;

    Student.findOneAndUpdate({ nim: id }, { nim, name })
      .then(async (r) => {
        Student.findById(r._id).then((response) =>
          res.status(200).json({ error: false, code: 200, data: response })
        );
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: true, code: 5000, message: 'NIM tidak ditemukan!' });
      });
  },
  deleteStudent: async (req, res) => {
    const { id } = req.params;

    Student.findOneAndDelete(id)
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: true, code: 5000, message: 'NIM tidak ditemukan!' });
      });
  },
};
