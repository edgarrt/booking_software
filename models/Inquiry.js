const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

/**
    Creates initial inquiry schema reference
    Each client pages will create Model reference with this schema
*/
const inquirySchema = new mongoose.Schema({

  inquiryID: String,
  name: String,
  email: { type: String},
  phone_number: String,
  address: String,
  city: String,
  state:String,
  zip_code: String,
  size_of_piece: String,
  work_area: String,
  inspiration: String,
  date_requested: { type: Date },
  reference_files: Array

}, { timestamps: true });

module.exports = inquirySchema;
