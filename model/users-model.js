const User = require("./schemas/user");
require("dotenv").config();

const findUserById = async (id) => {
  return await User.findOne({ _id: id });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
};
