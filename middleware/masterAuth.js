const jwt = require('jsonwebtoken');
const Master = require('../api/master/model');
const { JWT_KEY } = require('../config');

const masterAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : null;

    const { data } = jwt.verify(token, JWT_KEY);
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

        return next();
      })
      .catch(() =>
        res.status(500).json({
          error: true,
          code: 6001,
          message: 'Data tidak ditemukan!',
        })
      );
  } catch (err) {
    return res.status(500).json({
      error: true,
      code: 6002,
      message: 'Not authorized to access this resource!',
    });
  }
};

module.exports = { masterAuth };
