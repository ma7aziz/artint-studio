// contactMessageSchema.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactMessageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

module.exports = ContactMessage;
