const express = require('express');
const {
  signIn,
  addKafas,
  updateKafas,
  deleteKafas,
  getAllKafas,
  getKafasByNIM,
} = require('./controller');

const router = express.Router();

router.get('/all', getAllKafas);
router.get('/:id', getKafasByNIM);
router.post('/add', addKafas);
router.post('/signin', signIn);
router.put('/:id/update', updateKafas);
router.delete('/:id/delete', deleteKafas);

module.exports = router;
