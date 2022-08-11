const Master = require('./model');

module.exports = {
  signIn: async (req, res) => {
    const { nim, password } = req.body;

    Master.login(nim, password)
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
  // addMaster: async (req, res) => {
  //   const { name, nim, password } = req.body;
  //
  //   Master.create({ name, nim, password }).then((r) => {
  //     res.status(200).json({ error: false, code: 200, data: r });
  //   });
  // },
};
