const mongoose = require("mongoose");
const userScema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    image: { type: String, default: null },
    phone: { type: String, default: null },
    birthdate: { type: Date, default: null },
    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userScema);
module.exports = UserModel;
