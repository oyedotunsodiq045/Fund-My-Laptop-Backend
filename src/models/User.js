const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false, // what this will do is when we get a user through our API it's not going to show the password // TJ take note
  },
  number: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  investment_count: { // we're not using php, python syntax, JS is camelCase not snake_case
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    required: true,
  },
  request_count: { // we're not using php, python syntax, JS is camelCase not snake_case
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
// UsmanSBK DONT TOUCH THIS CODE
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
