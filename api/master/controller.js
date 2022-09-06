const Master = require('./model');

module.exports = {
  signIn: async (req, res) => {
    const { username, password } = req.body;

    Master.login(username, password)
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
        res.status(500).json({
          error: true,
          code: 5002,
          message: e.message,
        })
      );
  },
  addMaster: async (req, res) => {
    const { name, username, password } = req.body;

    Master.create({ name, username, password })
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
};
