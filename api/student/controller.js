const Student = require('./model');

module.exports = {
  addStudent: async (req, res) => {
    const { nim, name } = req.body;

    Student.create(nim, name)
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() => {
        res.status(500).json({ error: true, code: 500, message: 'Error' });
      });
  },
  updateStudent: async (req, res) => {
    const { id } = req.params;
    const { nim, name } = req.body;

    Student.findByIdAndUpdate(id, { nim, name })
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() => {
        res.status(500).json({ error: true, code: 500, message: 'Error' });
      });
  },
  deleteStudent: async (req, res) => {
    const { id } = req.params;

    Student.findByIdAndDelete(id)
      .then(async (r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() => {
        res.status(500).json({ error: true, code: 500, message: 'Error' });
      });
  },
};
