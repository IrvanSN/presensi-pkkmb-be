const bcrypt = require('bcrypt');
const Kafas = require('./model');

module.exports = {
  getAllKafas: async (req, res) => {
    await Kafas.find({})
      .then((r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch((e) =>
        res.status(500).json({ error: true, code: 5000, message: e.message })
      );
  },
  getKafasByNIM: async (req, res) => {
    const { id } = req.params;

    await Kafas.findOne({ nim: id })
      .then((r) => {
        if (!r) {
          res.status(500).json({
            error: true,
            code: 5000,
            message: 'Data kafas tidak ditemukan!',
          });
        } else {
          res.status(200).json({ error: false, code: 200, data: r });
        }
      })
      .catch(() =>
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Data kafas tidak ditemukan!',
        })
      );
  },
  signIn: async (req, res) => {
    const { nim, password } = req.body;

    Kafas.login(nim, password)
      .then((r) => {
        // const token = jwt.sign(
        //     {
        //       data: {
        //         accountType: 'Master',
        //         _id: r._id,
        //         name: r.name,
        //       },
        //     },
        //     process.env.JWT_KEY,
        //     { expiresIn: '1h' }
        // );
        //
        // res.status(200).json({ error: false, code: 200, data: { token } });
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch((e) =>
        res.status(500).json({ error: true, code: 5002, message: e.message })
      );
  },
  addKafas: async (req, res) => {
    const { name, nim, password } = req.body;

    Kafas.create({ name, nim, password })
      .then((r) => {
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
  updateKafas: async (req, res) => {
    const { id } = req.params;
    const { name, nim, password } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);

      return Kafas.findOneAndUpdate(
        { nim: id },
        { name, nim, password: encryptedPassword }
      )
        .then((r) => {
          Kafas.findById(r._id).then((response) =>
            res.status(200).json({ error: false, code: 200, data: response })
          );
        })
        .catch(() =>
          res
            .status(500)
            .json({ error: true, code: 5000, message: 'NIM tidak ditemukan!' })
        );
    }

    return Kafas.findOneAndUpdate({ nim: id }, { name, nim })
      .then((r) => {
        Kafas.findById(r._id).then((r) =>
          res.status(200).json({ error: false, code: 200, data: r })
        );
      })
      .catch(() =>
        res
          .status(500)
          .json({ error: true, code: 5000, message: 'NIM tidak ditemukan!' })
      );
  },
  deleteKafas: async (req, res) => {
    const { id } = req.params;

    Kafas.findOneAndDelete(id)
      .then((r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() =>
        res
          .status(500)
          .json({ error: true, code: 5000, message: 'NIM tidak ditemukan!' })
      );
  },
};
