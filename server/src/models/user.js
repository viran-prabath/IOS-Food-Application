const mongoose = require("mongoose");
  
  const userSchema = new mongoose.Schema({
    userId: { type: Schema.ObjectId, auto: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isActive: { type: Boolean, default: true, require: true },
    createdDateTime: { type: Date, default: Date.now() }
  });
  const User = mongoose.model("user", userSchema);
  module.exports = User;