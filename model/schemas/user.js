const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Enam } = require("../../helpers/constants");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate(value) {
      const regul = /\S+@\S+\.\S+/gi;
      return regul.test(String(value).toLowerCase());
    },
  },
  subscription: {
    type: String,
    enum: [Enam.STARTER, Enam.PRO, Enam.BUSINESS],
    default: Enam.STARTER,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: 250 }, true);
    },
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
    default: nanoid(),
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
