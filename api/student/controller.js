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
  getStudentById: async (req, res) => {
    const { id } = req.params;

    await Student.findById(id)
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
    const { name, vaccineCount, vaccineProof } = req.body;

    Student.create({
      name,
      'vaccine.count': vaccineCount,
      'vaccine.proof': vaccineProof,
    })
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch((e) =>
        // if (e.code === 11000) {
        //   return res.status(500).json({
        //     error: true,
        //     code: 5001,
        //     message: ` sudah terdaftar di database!`,
        //   });
        // }

        res.status(500).json({
          error: true,
          code: 5000,
          message: e.message,
        })
      );
  },
  updateStudent: async (req, res) => {
    const { id } = req.params;
    const { name, vaccineCount, vaccineProof } = req.body;

    Student.findByIdAndUpdate(id, {
      name,
      'vaccine.count': vaccineCount,
      'vaccine.proof': vaccineProof,
    })
      .then(async (r) => {
        Student.findById(r._id).then((response) =>
          res.status(200).json({ error: false, code: 200, data: response })
        );
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: true, code: 5000, message: 'Id tidak ditemukan!' });
      });
  },
  deleteStudent: async (req, res) => {
    const { id } = req.params;

    Student.findByIdAndDelete(id)
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: true, code: 5000, message: 'Id tidak ditemukan!' });
      });
  },
};
