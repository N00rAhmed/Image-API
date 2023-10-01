// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model('Image', imageSchema);
