const jwt = require('jsonwebtoken');
const Kafas = require('../kafas/model');
const Master = require('../master/model');
const { JWT_KEY } = require('../../config');

module.exports = {
  singleAuth: async (req, res) => {
    const { username, password } = req.body;

    await Master.login(username, password)
      .then((masterData) => {
        const token = jwt.sign(
          {
            data: {
              accountType: 'Master',
              _id: masterData._id,
              name: masterData.name,
              username: masterData.username,
            },
          },
          JWT_KEY,
          { expiresIn: '24h' }
        );

        res.status(200).json({
          error: false,
          code: 200,
          data: { token, accountType: 'Master', user: masterData },
        });
      })
      .catch(async (errMaster) => {
        if (errMaster) {
          await Kafas.login(username, password)
            .then((kafasData) => {
              const token = jwt.sign(
                {
                  data: {
                    accountType: 'Kafas',
                    _id: kafasData._id,
                    name: kafasData.name,
                    username: kafasData.username,
                  },
                },
                JWT_KEY,
                { expiresIn: '24h' }
              );
              res.status(200).json({
                error: false,
                code: 200,
                data: { token, accountType: 'Kafas', user: kafasData },
              });
            })
            .catch(() =>
              res.status(500).json({
                error: true,
                code: 5002,
                message: 'Username/password salah!',
              })
            );
        }
      });
  },
  verifyToken: async (req, res) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : null;

      const { data } = jwt.verify(token, JWT_KEY);

      if (data) {
        res.status(200).json({
          error: false,
          code: 200,
          data,
        });
      }
    } catch (e) {
      res.status(500).json({
        error: true,
        code: 6003,
        message: 'Token not valid!',
      });
    }
  },
};
