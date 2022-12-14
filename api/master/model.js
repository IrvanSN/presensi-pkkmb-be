const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const masterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

masterSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

masterSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw Error('Username atau password salah!');
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error('Username atau password salah!');
  }

  return {
    _id: user._id,
    name: user.name,
    username: user.username,
  };
};

const Master = mongoose.model('Master', masterSchema);
module.exports = Master;
