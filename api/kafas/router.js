const express = require('express');
const {
  signIn,
  addKafas,
  deleteKafas,
  getAllKafas,
  getKafasByUsername,
  getKafasById,
  updateKafasById,
} = require('./controller');
const { masterAuth } = require('../../middleware/masterAuth');

const router = express.Router();

router.post('/add', masterAuth, addKafas);
// router.get('/all', getAllKafas);
// router.get('/username/:username', getKafasByUsername);
// router.get('/id/:id', getKafasById);
// router.post('/signin', signIn);
// router.put('/:id/update', updateKafasById);
// router.delete('/:id/delete', deleteKafas);

module.exports = router;
