const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  resetToken: String,
  resetTokenExp: Date,
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("User", userSchema);
