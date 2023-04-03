const mongoose = require("mongoose");
const crypto = require("crypto");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  mobile: {
    type: Number,
    unique: "Mobile Number is already registered",
    required: "Mobile Number is required",
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

// set hashed_password = encrypted password in schema
AdminSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// validating password
AdminSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

// authenticate password
// encrypt password
// create random string salt
AdminSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("Admin", AdminSchema);
