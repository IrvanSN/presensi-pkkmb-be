const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const kafasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nim: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

kafasSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

kafasSchema.statics.login = async function (nim, password) {
  const user = await this.findOne({ nim });
  if (!user) {
    throw Error('NIM atau password salah!');
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error('NIM atau password salah!');
  }

  return user;
};

const Kafas = mongoose.model('Kafas', kafasSchema);
module.exports = Kafas;
