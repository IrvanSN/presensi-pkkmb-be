const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Kafas = require('./model');
const {JWT_KEY} = require("../../config");

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
  getKafasByUsername: async (req, res) => {
    const { username } = req.params;

    await Kafas.findOne({ username })
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
  getKafasById: async (req, res) => {
    const { id } = req.params;

    await Kafas.findById(id)
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
    const { username, password } = req.body;

    Kafas.login(username, password)
      .then((r) => {
        const token = jwt.sign(
          {
            data: {
              accountType: 'Kafas',
              _id: r._id,
              name: r.name,
              username: r.username,
            },
          },
          JWT_KEY,
          { expiresIn: '24h' }
        );

        res.status(200).json({ error: false, code: 200, data: { token } });
        // res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch((e) =>
        res.status(500).json({ error: true, code: 5002, message: e.message })
      );
  },
  addKafas: async (req, res) => {
    const { name, username, password } = req.body;

    Kafas.create({ name, username, password })
      .then((r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.status(500).json({
            error: true,
            code: 5001,
            message: `username: ${username} sudah terdaftar di database!`,
          });
        }

        return res.status(500).json({
          error: true,
          code: 5000,
          message: e.message,
        });
      });
  },
  updateKafasById: async (req, res) => {
    const { id } = req.params;
    const { name, username, password } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);

      return Kafas.findByIdAndUpdate(id, {
        name,
        username,
        password: encryptedPassword,
      })
        .then((r) => {
          Kafas.findById(r._id).then((response) =>
            res.status(200).json({ error: false, code: 200, data: response })
          );
        })
        .catch(() =>
          res.status(500).json({
            error: true,
            code: 5000,
            message: 'Username tidak ditemukan!',
          })
        );
    }

    return Kafas.findByIdAndUpdate(id, { name, username })
      .then((r) => {
        Kafas.findById(r._id).then((response) =>
          res.status(200).json({ error: false, code: 200, data: response })
        );
      })
      .catch(() =>
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Username tidak ditemukan!',
        })
      );
  },
  deleteKafas: async (req, res) => {
    const { id } = req.params;

    Kafas.findByIdAndDelete(id)
      .then((r) => {
        res.status(200).json({ error: false, code: 200, data: r });
      })
      .catch(() =>
        res.status(500).json({
          error: true,
          code: 5000,
          message: 'Username tidak ditemukan!',
        })
      );
  },
};
