const jwt = require('jsonwebtoken');
const Kafas = require('../api/kafas/model');
const Master = require('../api/master/model');

const singleAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : null;

    const { data } = jwt.verify(token, process.env.JWT_KEY);

    if (data.accountType === 'Kafas') {
      await Kafas.findById(data._id)
        .then((r) => {
          if (!r) {
            return res.status(500).json({
              error: true,
              code: 6001,
              message: 'Data tidak ditemukan atau token tidak valid!',
            });
          }

          req.kafas = r;
          req.token = token;

          next();
        })
        .catch(() =>
          res.status(500).json({
            error: true,
            code: 6001,
            message: 'Data tidak ditemukan!',
          })
        );
    } else if (data.accountType === 'Master') {
      await Master.findById(data._id)
        .then((r) => {
          if (!r) {
            return res.status(500).json({
              error: true,
              code: 6001,
              message: 'Data tidak ditemukan atau token tidak valid!',
            });
          }

          req.kafas = r;
          req.token = token;

          next();
        })
        .catch(() =>
          res.status(500).json({
            error: true,
            code: 6001,
            message: 'Data tidak ditemukan!',
          })
        );
    } else {
      return res.status(500).json({
        error: true,
        code: 6002,
        message: 'Not authorized to access this resource!',
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: true,
      code: 6002,
      message: 'Not authorized to access this resource!',
    });
  }
};

module.exports = { singleAuth };
