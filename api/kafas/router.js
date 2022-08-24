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

const router = express.Router();

router.get('/all', getAllKafas);
router.get('/username/:username', getKafasByUsername);
router.get('/id/:id', getKafasById);
router.post('/add', addKafas);
router.post('/signin', signIn);
router.put('/:id/update', updateKafasById);
router.delete('/:id/delete', deleteKafas);

module.exports = router;
