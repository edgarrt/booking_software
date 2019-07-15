const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'uploads')
const mongoose = require('mongoose');
const inquirySchema = require('../../models/Inquiry');
const Inquiry = mongoose.model('demo_inquiry', inquirySchema);

/**
    Setup for Google Storage
*/
const {Storage} = require('@google-cloud/storage');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file
 */
dotenv.config({ path: '.env' });
// Instantiate a storage client
const storage = new Storage();
// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);


/**
      Params: Id length desired - EX: 14
      Returns: Create string of size 'length'
*/
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

/**
      Used in correctly renaming uploaded files

      Params: filename to check - req.filename as main source
      Returns: correct file extension
*/
function getMimeTypeExt(string){
  var compare = string.substring(0,6)
  if (compare.match('image/')){
    return string.substring(6,)
  }
}

exports.getHomepage = (req, res, next) => {
  res.render('clients/demo/dimension', {
    title: 'Landing Page'
  });
}

exports.getCatalogue = (req, res, next) => {
  res.render('clients/demo/catalogue', {
    title: 'Catalogue'
  });
}

exports.getIntro = (req, res, next) => {
  res.render('clients/demo/intro', {
    title: 'Intro'
  });
}

exports.getInquiry = (req, res, next) => {
  res.render('clients/demo/inquiry', {
    title: 'Inquiry'
  });
}



/**
    Inquiry images will have uploaded already
    TO DO:
        -> Need to move files if any, into new customer inquiry folder
         + Create Inquiry file with customer information
*/
exports.postInquiry = (req, res, next) => {
  /**
      Value Check
  */
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/inquiry');
  }

  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  /**
      Need to create new customer inquiry folder
  */
  var id = makeid(14)

  /**
      Makes new customer inquiry dir
      Need to consider sending files to cloud storage instead?
  */
  var bucket_endpoint = "/clients/demo/inquiries/" + id + "/"

  /**
      Creates new inquiry object
  */
  const inquiry = new Inquiry({
    inquiryID: id,
    email: req.body.email,
    name: req.body.name,
    phone_number: req.body.phone_number,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    size_of_piece: req.body.size_of_piece,
    work_area: req.body.work_area,
    inspiration: req.body.inspiration,
  });

  if (req.files){
    // customer attached files
    // Will rename files with proper mimetype
    // Then move file into new inquiry folder

    for(let [index, val] of req.files.entries()) {
        val.type = getMimeTypeExt(val.mimetype)
        val.destination = bucket_endpoint + index + '.' + val.type

        inquiry.reference_files.push(val.destination)

        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(val.destination);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', err => {
          next(err);
        });

        blobStream.on('finish', () => {
        });

        blobStream.end(val.buffer);

    }
  }

  // Need to construct file with customer inquiry data
  inquiry.save((err, inquiry) => {
    if (err) { return next(err); }
  });


  /**
      If reached:
            no errors
            form subitted
            show initial page
  */
  res.redirect('/')
}


/**
    Initial function declaration
        TO DO:
              - Define blog page
              - Render proper blog page
*/
exports.getBlog = (req, res, next) => {
    res.send('Coming Soon');
}

exports.getAbout = (req, res, next) => {
  res.render('clients/demo/about', {
    title: 'About'
  });
}
